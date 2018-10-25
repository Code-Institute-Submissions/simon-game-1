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
    setTimeout(playSequence, 700)
}

// Solves the issue regarding animations that didn't iterate 
function animateItem(j) {
    setTimeout(function() {
        $('#item' + gameSequence[j]).addClass('activated');
        setTimeout(function() { $('#item' + gameSequence[j]).removeClass('activated'); }, 500);
    }, 1000 * (j + 1));
}

//Iterating through gameSequence applying fading effect to every array item following the order 
function playSequence() {
    for (i = 0; i < gameSequence.length; i++) {
        animateItem(i)
    }
}

//Users clicks on a square. Check if the game has started; User input goes into playerInput array; call matchSequence function;
function pickSquare(el) {
    if (gameStart == true) {
        $('#item' + el).addClass('activated');
        setTimeout(function() { $('#item' + el).removeClass('activated'); }, 500);
        playerInput.push(parseInt(el));
        matchSequence();
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
