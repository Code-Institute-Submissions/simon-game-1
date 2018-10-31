levelCount = 0;
gameStart = false;

// Clearing input in order to start
function startGame() {
    gameStart = true;
    levelCount = 1;
    gameSequence = [];
    playerInput = [];
    $(".level-display").html("<p>" + levelCount + "</p>");
    $(".btn-start>i").removeClass("fa-play").addClass("fa-redo-alt");
    genNum();
}

//Generate random number and animate the element with the same item number. Add generated number to gameSequence 
function genNum() {
    playerInput = [];
    randomNum = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(randomNum);
    playSequence();
}

// Solves the issue regarding animations that didn't iterate 
function animateItem(j) {
    setTimeout(function() {
        document.getElementById('sound' + gameSequence[j]).play();
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
        document.getElementById('sound' + el).play();
        $('#item' + el).addClass('activated');
        setTimeout(function() { $('#item' + el).removeClass('activated'); }, 500);
        playerInput.push(parseInt(el));
        matchSequence()
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
            document.getElementById('wrong').play();
            setTimeout(function() { alert("Game Over"); }, 600);
            gameStart = false;
            $(".btn-start>i").removeClass("fa-redo-alt").addClass("fa-play");
            $(".level-display").html("<p> " + levelCount + "</p>");
            return
        }
    }
    if (playerInput.length == gameSequence.length) {
        levelCount++;
        setTimeout(function() { $(".level-display").html("<p>" + levelCount + "</p>"); }, 500);
        setTimeout(genNum, 2000);
    }
}

//HOW TO PLAY MODAL

function openModule() {
    var modal = document.getElementById("howToPlayModule");
    var span = document.getElementById("close");
    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}
