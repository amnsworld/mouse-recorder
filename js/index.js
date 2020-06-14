// 1. When a user presses the record button, start recording actions
// 2. When recording, push an object with the important data to the array
//			- Clear the array before starting a new recording
// 3. Stop a recording by pressing the same button
//			- Print all of the position to the console using forEach: 123px 345px
// 4. Replay the recording by iterating through the Array and move a custom cursor to the position that was recorded
//			- Ensure there is not current a recording going on (various ways to prevent that case)



// DOM elements
const $startAndStop = document.getElementById('startAndStop')
const $replayRecording = document.getElementById('replayRecording')
const $cursor = document.getElementById('cursor')

// Variables/data
let isRecording = false;
let mouseMoves = [
	// Examples:
	// {x: 123, y:212, t:0},
	// {x: 220, y:317, t:100},
	// {x: 126, y:218, t:145},
]

// Each movement of the mouse
window.addEventListener('mousemove', (event) => {
	if (isRecording) {
		//console.log(event.clientX, event.clientY, event.timeStamp)
		// Record the data to the Array
		mouseMoves.push({x:event.clientX,y: event.clientY,ts: event.timeStamp});
	  // this is one of many ways to prevent recording, consider you may also use removeEventListener() as well

	}
})

// Start/stop the recording
$startAndStop.addEventListener('click', (event) => {
	if(!isRecording){
		mouseMoves = [];
		isRecording= !isRecording;
		//console.log('Recording start');
		$startAndStop.innerText = "Stop Recording";
		$startAndStop.classList.add("stoprecording");
		$replayRecording.style.display = "none";
	}
	else
	{
		isRecording= !isRecording;
		// console.log('Recording stop');
		// mouseMoves.forEach((moves) =>{
		// 	console.log(`${moves}`);
		// })
		$startAndStop.innerText = "Start Recording";
		$startAndStop.classList.remove("stoprecording");
		if(mouseMoves.length > 0){
			$replayRecording.style.display = "inline-block";
		}
	}

})

// Replay recording
$replayRecording.addEventListener('click', (event) => {
	
	// Set the x and y for each mouse move recorded (123, 456 are examples)
	//reffered https://stackoverflow.com/questions/37977602/settimeout-not-working-inside-foreach 
	if(mouseMoves.length > 0){
		mouseMoves.forEach(function(obj,index){
			setTimeout(()=>{
				$cursor.style.top = `${obj.y}px`;
				$cursor.style.left = `${obj.x}px`;
			},50 * (index + 1));
		});
		//test(mouseMoves[0]);
	}
	else{
		mouseMoves=[];
		$cursor.style.top = `-10px`;
				$cursor.style.left = `-10px`;
	}
	
	

})

// function test(val){
// 	setTimeout(()=>{
// 		$cursor.style.top = `${val.y}px`;
// 		$cursor.style.left = `${val.x}px`;
// 	}, 1);
// }