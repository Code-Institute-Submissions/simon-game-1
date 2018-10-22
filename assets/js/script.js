gameStart = false;

function startGame() {
    gameStart = true;
    gameSequence = [];
    playerInput = [];
    randomNum = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(randomNum);
    $('#'+ randomNum).addClass('animated fadeOut');
    setTimeout(function(){ $('#'+ randomNum).removeClass('fadeOut').addClass('fadeIn'); }, 500);
    
}

function pickSquare(id){
    if (gameStart == true){
        playerInput.push(id);
        console.log(playerInput);
    }else{
        return alert("To begin playing press START button ");
    }
}