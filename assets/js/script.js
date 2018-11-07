levelCount = 0;
gameStart = false;
strict = "off"


//Visual changes on clicking the Strict button
function toggleStrict() {
    if (strict == "off") {
        $("#strictButton").css("background", "#0DAB76");
        $("#strictButton").html("<p> On </p>");
        strict = "on";
    }
    else if (strict == "on") {
        $("#strictButton").css("background", "#235789");
        $("#strictButton").html("<p> Off </p>");
        strict = "off";
    }
}

// Clearing input in order to start
function startGame() {
    gameStart = true;
    levelCount = 1;
    gameSequence = [];
    playerInput = [];
    $(".box-display-level").html("<p>" + levelCount + "</p>");
    $(".btn-start>i").removeClass("fa-play").addClass("fa-redo-alt");
    $(".box-title-start").html(" Reset ");
    genNum();
}

//Generate random number and animate the element with the same item number. Add generated number to gameSequence 
function genNum() {
    playerInput = [];
    randomNum = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(randomNum);
    console.log("sequence", gameSequence);
    if (levelCount == 1) {
        setTimeout(playSequence, 1000);
    }
    else {
        playSequence();
    }
}

//Iterating through gameSequence applying fading effect to every array item following the order 
function playSequence() {
    for (i = 0; i < gameSequence.length; i++) {
        animateItem(i);
    }
}

// Solves the issue regarding animations that didn't iterate 
function animateItem(j) {
    setTimeout(function() {
        document.getElementById('sound' + gameSequence[j]).play();
        $('#item' + gameSequence[j]).addClass('activated');
        setTimeout(function() { $('#item' + gameSequence[j]).removeClass('activated'); }, 300);
    }, tempo() * (j + 1));
}

//Increase the tempo when certain levels are reached
function tempo() {
    if (levelCount <= 3) {
        return 900;
    }
    else if (levelCount <= 8) {
        return 700;
    }
    else {
        return 600;
    }
}
//Users clicks on a square. Check if the game has started; User input goes into playerInput array; call matchSequence function;
function pickSquare(el) {
    if (gameStart == true) {
        document.getElementById('sound' + el).play();
        $('#item' + el).addClass('activated');
        setTimeout(function() { $('#item' + el).removeClass('activated'); }, 500);
        playerInput.push(parseInt(el));
        console.log("myinput", playerInput);
        matchSequence()
    }
    else {
        //Return alert("To begin playing press START button ")
        return alertMessage();
    }
}

//Iterate through player's input and check if it matches the game generated sequence
function matchSequence() {
    var i;
    for (i = 0; i < playerInput.length; i++) {
        if (playerInput[i] != gameSequence[i] && strict =="on" ) {
            document.getElementById('wrong').play();
                setTimeout(function() { alert("Game Over"); }, 600);
                gameStart = false;
                $(".btn-start>i").removeClass("fa-redo-alt").addClass("fa-play");
                $(".box-title-start").html(" Start");
                $(".box-display-level").html("<p> " + levelCount + "</p>");
                return
        }else if (playerInput[i] != gameSequence[i] && strict =="off" ) {
            document.getElementById('wrong').play();
            setTimeout(function() { alert("Listen to the sequence and try Again"); }, 600);
            playerInput=[];
            i=0;
            playSequence();
        }
    }
    if (playerInput.length == gameSequence.length) {
        levelCount++;
        if (levelCount == 21) {
            return alertWin();
        }
        setTimeout(function() { $(".box-display-level").html("<p>" + levelCount + "</p>"); }, 500);
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


//ALERT MESSAGE
function alertMessage() {
    var alert = document.getElementById("startAlert");
    var span = document.getElementById("close-alert");
    alert.style.display = "block";
    span.onclick = function() {
        alert.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == alert) {
            alert.style.display = "none";
        }
    }
}

//WIN ALERT
function alertWin() {
    var alert = document.getElementById("winAlert");
    var span = document.getElementById("close-win-alert");
    alert.style.display = "block";
    span.onclick = function() {
        alert.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == alert) {
            alert.style.display = "none";
        }
    }
}
