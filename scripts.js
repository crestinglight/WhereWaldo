window.addEventListener('load', function(){
	var startTimer = Date.now();

	function getXY(e){
		if((e.clientX > 668) && (e.clientX < 712) && (e.clientY > 139) && (e.clientY < 193)){
			endTimer();
		}

		else {
		}
	}

	function endTimer(){
		var endingTime = Date.now();
		var totalTime = endingTime - startTimer;
		convertToReadableTime(totalTime);
	}

	function convertToReadableTime(millis){
		var tenths = millis / 1000;
		var x = millis / 1000;
		var seconds = x % 60;
		x /= 60;
		var minutes = x % 60;
		x /= 60;
		var hours = x % 24;
		x /= 24;
		var days = x;
		alert(minutes + "." + seconds + "." + tenths);
	}

	var picClick = document.getElementById("WaldoLevel1");
	picClick.addEventListener('click', getXY);

});























