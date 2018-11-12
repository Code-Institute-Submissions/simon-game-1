levelCount = 0;
gameStart = false;
strict = "off"

// VISUAL CHANGES ON CLICKING THE STRICT BUTTON
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

// CLEARING INPUT IN ORDER TO START OR RESTART
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

// RANDOM NUMBER GENERATION
function genNum() {
    playerInput = [];
    randomNum = Math.floor(Math.random() * 4 + 1);
    gameSequence.push(randomNum);
    console.log("sequence", gameSequence);
    if (levelCount == 1) {
        setTimeout(playSequence, 800);
    }
    else {
        playSequence();
    }
}

// ITERATING THROUGH GAMESEQUENCE APPLYING FADING EFFECT AND PLAYING TONE FOR EACH ARRAY ITEM GENERATED SO FAR
function playSequence() {
    for (i = 0; i < gameSequence.length; i++) {
        (function(i) {
            setTimeout(function() {
                document.getElementById('sound' + gameSequence[i]).play();
                $('#item' + gameSequence[i]).addClass('activated');
                setTimeout(function() { $('#item' + gameSequence[i]).removeClass('activated'); }, 300);
            }, tempo() * (i + 1));
        })(i)
    }
}
// INCREASE THE TEMPO AT CERTAIN LEVELS 
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
// USER'S INTERACTION WITH THE GAMEFIELD 
$(".square").click(function(el) {
    el = this.dataset.id
    if (gameStart == true) {
        document.getElementById('sound' + el).play();
        $('#item' + el).addClass('activated');
        setTimeout(function() { $('#item' + el).removeClass('activated'); }, 500);
        playerInput.push(parseInt(el));
        console.log("myinput", playerInput);
        matchSequence()
    }
})

// ITERATE THROUGH PLAYER'S INPUT AND CHECK IF IT MATCHES THE GAME GENERATED SEQUENCE
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

// EVENT HANDLERS FOR MODAL AND FOR CLOSING ALERTS

$(document).ready(function() {
    $(".fa-question-circle").click(function() {
        showMessage("Help", $("#help-content").clone().css("display", "block"));
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


//MODAL ALERT MESSAGES
function alertMessage(alertType) {
    switch (alertType) {
        case "tryAgainAlert":
            showMessage("Ooops...", "Listen carefully and try again ", playSequence);
            break;
        case "gameOverAlert":
            showMessage("Sorry...", "Game Over ")
            break;
        case "winAlert":
            showMessage("Well done!", $("#win-alert").clone().css("display", "block"));
            break;
    }
}

// PRINTING THE MODAL/ALERTS
function showMessage(title, body, onCloseHandler) {

    $(".modal-header>h3").html(title);
    $(".modal-body").html(body);

// IN CASE OF THE "TRYAGAIN" ALERT THE SEQUENCE WILL PLAY AS SOON AS THE ALERT IS CLOSED
    function onClickHandler() {
        $(".close").off('click', onClickHandler);
        if (onCloseHandler != undefined) {
            onCloseHandler();
        }
    }
    $(".close").on("click", onClickHandler);
    $(".modal").css("display", "block");
}
