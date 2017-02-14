window.addEventListener('load', function(){

	function getXY(e){
		if((e.clientX > 668) && (e.clientX < 712) && (e.clientY > 139) && (e.clientY < 193)){
			console.log("Yep you got it! You're at " + e.clientX + ", " + e.clientY);
		}

		else {
			console.log("Nope, you're at " + e.clientX + ", " + e.clientY);
		}
	}

	function startTimer(){
		alert("I'm loaded!");
	}

	var picClick = document.getElementById("WaldoLevel1");
	picClick.addEventListener('click', getXY);

});