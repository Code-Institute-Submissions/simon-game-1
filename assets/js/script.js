levelCount = 0;
gameStart = false;
strict = "off"

//Visual changes on clicking the Strict button
$("#strictButton").click(function() {
    if (strict == "off") {
        $(".strictButton").removeClass("blue-button").addClass("green-button");
        $(this).html("<p> On </p>");
        strict = "on";
    }
    else if (strict == "on") {
        $(".strictButton").removeClass("green-button").addClass("blue-button");
        $(this).html("<p> Off </p>");
        strict = "off";
    }
});

// Clearing input in order to start
$("#start").click(function() {
    gameStart = true;
    levelCount = 1;
    gameSequence = [];
    playerInput = [];
    $(".box-display-level>p").html(levelCount);
    $(".btn-start>i").removeClass("fa-play").addClass("fa-redo-alt");
    $(".box-title-start").html(" Reset ");
    genNum();
});

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
$(".square").click(function (el) {
    el= this.dataset.id
    if (gameStart == true) {
        document.getElementById('sound' + el).play();
        $('#item' + el).addClass('activated');
        setTimeout(function() { $('#item' + el).removeClass('activated'); }, 500);
        playerInput.push(parseInt(el));
        console.log("myinput", playerInput);
        matchSequence()
    }
})

//Iterate through player's input and check if it matches the game generated sequence
function matchSequence() {
    var i;
    for (i = 0; i < playerInput.length; i++) {
        if (playerInput[i] != gameSequence[i] && strict == "on") {
            document.getElementById('wrong').play();
            setTimeout(alertMessage("gameOverAlert"), 600);
            gameStart = false;
            $(".btn-start>i").removeClass("fa-redo-alt").addClass("fa-play");
            $(".box-title-start").html(" Start");
            $(".box-display-level>p").html(levelCount);
            return
        }
        else if (playerInput[i] != gameSequence[i] && strict == "off") {
            document.getElementById('wrong').play();
            alertMessage("tryAgainAlert");
            playerInput = [];
            i = 0;
        }
    }
    if (playerInput.length == gameSequence.length) {
        levelCount++;
        if (levelCount == 21) {
            return alertMessage("winAlert");
        }
        setTimeout(function() { $(".box-display-level>p").html(levelCount); }, 500);
        setTimeout(genNum, 2000);
    }
}

//HOW TO PLAY MODAL

$(document).ready(function() {
    $(".fa-question-circle").click(function() {
        $("#howToPlayModule").css("display", "block");
    })
    $(".close").click(function() {
        $(this).parents(".modal").css("display", "none");
    });
    $(window).click(function(event) {
        $(".modal").each(function() {
            if (event.target == this) {
                $(this).css("display", "none");
            }
        })
    })
});

//ALERT MESSAGE
function alertMessage(alertType) {
    $("#alert i").removeClass("fas fa-trophy");
    switch (alertType) {
        case "tryAgainAlert":
            $("#alert .modal-header>h3").html("Ooops...");
            $("#alert .modal-body>h3").html("Listen carefully and try again ");
            break;
        case "gameOverAlert":
            $("#alert .modal-header>h3").html("Sorry");
            $("#alert .modal-body>h3").html("Game Over");
            break;
        case "winAlert":
            $("#alert .modal-header>h3").html("Congratulations!!!");
            $("#alert .modal-body>h3").html("You Win!");
            $("#alert i").addClass("fas fa-trophy");
            break;
    }
    if (alertType == "tryAgainAlert") {
        $("#alert").css("display", "block");
        setTimeout(playSequence, 3000);
    }
    else {
        $("#alert").css("display", "block");
    }
}
