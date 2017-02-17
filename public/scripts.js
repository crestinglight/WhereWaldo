window.addEventListener('load', function(){

	//This function gets the X and Y coordinates of where the user clicked, relative to the image.
	function getXY(e){
		var xPosition = e.offsetX;
		var yPosition = e.offsetY;
		//This if statement checks to see if "didYouFindWaldo" returns true. If so, we move on to stop the timer.
		if (didYouFindWaldo(xPosition, yPosition) === true){
			debugger;
			timerData = endTimer();
			var endingTime = Date.now();
			var milliseconds = endingTime - startTimer;
			var millis = String(milliseconds);
			sendScoreToServer(timerData, millis);
		}
	}

	//Takes the x and y coordinates passed from the getXY function and determines if they are within the bounds of Waldo. If not, nothing happens. If so, we return true so that we can move on to ending the timer.
	function didYouFindWaldo(x, y){
		var response = false;
		//Making a new request.
		var xyRequest = new XMLHttpRequest();
		//This line passes our x and y coordinates into a query string that Sinatra can use and determine what to do with.
		xyRequest.open('GET', 'http://localhost:4567/puzzle01validate?xPos=' + x + '&yPos=' + y);
		//This function executes when the server responds that it received the request.
		//Example: If a user clicks "like" on a facebook post, when the server responds that it received the request, only then will it update the like counter.
		xyRequest.onload = function(e){
			if (e.target.responseText === "true"){
				debugger;
				response = true;
				return response;
			}
		};
		//This line actually sends our request.
		xyRequest.send();
	}

	//Ending the timer means we take the new date and subtract the old one. This will give us the number of milliseconds that have passed since the page loaded. We then call on a function to make those milliseconds readable.
	function endTimer(){
		var endingTime = Date.now();
		var totalTime = endingTime - startTimer;
		var timeString = convertToReadableTime(totalTime);
		fillModal(timeString);
		return timeString;
	}

	//This function takes in milliseconds and breaks them down to a more readable format of days, hours, minutes, seconds, and hundredths of a second. It then pushes those variables into an array of [hundredths, seconds, minutes, hours, days].
	function convertToReadableTime(millis){
		var timeArray = [];

		//This function does the complex process to find the hundredths of a sec for the timer.
		var hundredths = findHundredths(millis);

		var x = Math.floor(millis / 1000);
		var seconds = Math.floor(x % 60);
		x /= 60;
		var minutes = Math.floor(x % 60);
		x /= 60;
		var hours = Math.floor(x % 24);
		x /= 24;
		var days = Math.floor(x);
		
		timeArray.push(hundredths, seconds, minutes, hours, days);
		//After getting the correct conversions and making an array, this function call passes the array into a formatting function for readability.
		var timeString = timeFormat(timeArray, 2);
		return timeString;
	}

	//Finds the hundreths of a sec that the player got to on his timer.
	function findHundredths(millis){
		var secondsDecimal = millis / 1000;
		var x = String(secondsDecimal);
		var splitHundredths = x.split(".");
		var bajillionHundredths = splitHundredths[1];
		var newHundredths = bajillionHundredths.charAt(0) + bajillionHundredths.charAt(1);
		return newHundredths;
	}

	//Formats the numbers within the array to be double digits.
	//Example: [1, 12, 5, 72] = ["01", "12", "05", "72"]
	function timeFormat(array, targetLength){
		var formattedArray = [];
		for(var i = 0; i < array.length; i++){
			var output = array[i] + '';
			while (output.length < targetLength) {
			    output = '0' + output;
			}
			formattedArray.push(output);
		}
		var finalTimeString = stringItTogether(formattedArray);
		return finalTimeString;
	}

	//The timeFormat function properly formats all of our number into readable format.
	//Examples: 00:00:03:17.32
	//			02:16:37:02.12
	//			days:hours:minutes:seconds.hundredths
	function stringItTogether(arrayOfTimes){
		var stringy = arrayOfTimes[4] + ":" + arrayOfTimes[3] + ":" + arrayOfTimes[2] + ":" + arrayOfTimes[1] + "." + arrayOfTimes[0]
		return stringy;
	}

	//Fills the modal with the correct information, i.e. the amount of time the player spent looking for Waldo.
	function fillModal(timerString){
		var modalTimerText = document.getElementById("modalTimer");
		modalTimerText.innerHTML = timerString;
		displayModal();
	}

	//Turns the "display" on so that the modal is visible.
	function displayModal(){
		var modal = document.getElementById("modal");
		var modalContent = document.getElementById("modalContent");
		var modalHighScores = document.getElementById("modalHighScores");
		modal.style.display = "block";
		modalContent.style.display = "block";
	}

	function sendScoreToServer(timeData, millis){
		
		//Making a new request.
		var scoreRequest = new XMLHttpRequest();
		//This line passes our painting data into a query string that Sinatra can use and determine what to do with.
		scoreRequest.open('GET', 'http://localhost:4567/puzzle01score?scoreTime=' + timeData + '&millis=' + millis);
		//This function executes when the server responds that it received the request.
		//Example: If a user clicks "like" on a facebook post, when the server responds that it received the request, only then will it update the like counter.
		scoreRequest.onload = function(e){
		    var topTenArray = e.target.responseText;
		    var parsedArray = JSON.parse(topTenArray);

		    formatHighScores(parsedArray);
		};
		//This line actually sends our request.
		scoreRequest.send();
	}

	function highScoreReveal(e){
		e.preventDefault();
		var highScoreDisplay = document.getElementById("modalHighScore");
		var timerDisplay = document.getElementById("modalContent");
		var hsTitle = document.getElementById("modalHighScoresTitle");
		var actualHS = document.getElementById("actualHighScores");
		if (highScoreDisplay.style.display === "none"){
			actualHS.innerHTML = highScoreString;
			hsTitle.innerHTML = "HIGH SCORES";
			timerDisplay.style.display = "none";
			highScoreDisplay.style.display = "block";
		}
		else {
			e.preventDefault();
			return false;
		}
		
	}

	function formatHighScores(hsArray){
		var highScoreID = document.getElementById("actualHighScores");
		var hsString = "";

		for (var i = 0; i < hsArray.length; i++){
			hsString = hsString + hsArray[i][0] + "<br>";
		}
		highScoreString = hsString;
		return highScoreString;
	}

	var startTimer = Date.now();
	var timerData = "";
	var highScoreString = "";
	var picClick = document.getElementById("WaldoLevel1");
	var highScoreButtonClick = document.getElementById("modalHighScoreButton");
	picClick.addEventListener('click', getXY);
	highScoreButtonClick.addEventListener('click', highScoreReveal);

});























