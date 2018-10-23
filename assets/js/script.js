gameStart = false;

// Clearing input in order to start
function startGame() {
    gameStart = true;
    gameSequence = [];
    playerInput = [];
    genNum();
}

//Generate random number and animate the element with the same item number. Add generated number to gameSequence 
function genNum() {
    playerInput = [];
    randomNum = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(randomNum);
    console.log(gameSequence);
//Iterating through gameSequence applying fading effece to every array item following the order it was generated with    
    for (i = 0; i < gameSequence.length; i++) {
            $('#item' + gameSequence[i]).addClass('animated fadeOut')
            setInterval(function(){ $('#item' + gameSequence[i]).removeClass('fadeOut').addClass('fadeIn').removeClass('fadeIn'); }, 600);
            console.log("gameSequence", gameSequence);
            console.log(typeof(gameSequence[i]));
    }
    

    // //Iterating through gameSequence applying fading effece to every array item following the order it was generated with    
    //     for (i = 0; i < gameSequence.length; i++) {
    //         setTimeout(function() {
    //             $('#item' + gameSequence[i]).addClass('animated fadeOut');
    //             setTimeout(function() { $('#item' + gameSequence[i]).removeClass('fadeOut').addClass('fadeIn'); }, 500);
    //         }, 1000 * (i+1));
    //     }
}

//Users clicks on a square. Check if the game has started; User input goes into playerInput array; call matchSequence function;
function pickSquare(id) {
    if (gameStart == true) {
        playerInput.push(parseInt(id));
        matchSequence();
        console.log("playerInput", playerInput);
    }
    else {
        return alert("To begin playing press START button ");
    }
}

//Iterate through player's input and check if it matches the game generated sequence
function matchSequence() {
    var i;
    for (i = 0; i < playerInput.length; i++) {
        if (playerInput[i] != gameSequence[i]) {
            alert("Game Over")
            gameStart = false;
            return
        }
    }
    if (playerInput.length == gameSequence.length) {
        genNum();
    }
}
