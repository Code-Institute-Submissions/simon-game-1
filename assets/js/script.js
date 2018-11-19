(function() {

    var gameSequence = [];
    var playerInput = [];
    var levelCount = 0;
    var gameStart = false;
    var strict = "off";
    var playing = false;
    var pidx = 0;
    var last = 0;

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
        var randomNum;
        playerInput = [];
        randomNum = Math.floor(Math.random() * 4 + 1);
        gameSequence.push(randomNum);
        console.log("sequence", gameSequence);
        startPlaySequence();
    }

    function playSequence(timestamp) {
        if (timestamp - last > tempo()) {
            $('#sound' + gameSequence[pidx]).get(0).cloneNode().play();
            $('#item' + gameSequence[pidx]).addClass('activated');
            let pudx = pidx
            setTimeout(function() { $('#item' + gameSequence[pudx]).removeClass('activated'); }, 250);
            last = timestamp;
            pidx++
        }
        if (gameSequence.length > pidx) {
            requestAnimationFrame(playSequence)
        }
        else {
            pidx = 0;
            last = 0;
            playing = false;
        }
    }

    // ITERATING THROUGH GAMESEQUENCE APPLYING FADING EFFECT AND PLAYING TONE FOR EACH ARRAY ITEM GENERATED SO FAR
    function startPlaySequence() {
        pidx = 0;
        last = 0;
        playing = true;
        setTimeout(function() {
            requestAnimationFrame(playSequence);
        }, 1000);
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
    $(".square").click(function() {
        if (playing == false && gameStart == true) {
            var element = this;
            var el = element.dataset.id;
            $('#sound' + el).get(0).cloneNode().play();
            $(element).addClass('activated');
            setTimeout(function() {
                $(element).removeClass('activated');
                matchSequence();
            }, 250);
            playerInput.push(parseInt(el));
        }
    });
    
    // ITERATE THROUGH PLAYER'S INPUT AND CHECK IF IT MATCHES THE GAME GENERATED SEQUENCE
    function matchSequence() {
        var i;
        for (i = 0; i < playerInput.length; i++) {
            if (playerInput[i] != gameSequence[i] && strict == "on") {
                $("#wrong").get(0).play();
                setTimeout(alertMessage("gameOverAlert"), 600);
                gameStart = false;
                $(".btn-start>i").removeClass("fa-redo-alt").addClass("fa-play");
                $(".box-title-start").html(" Start");
                $(".box-display-level>p").html(levelCount);
                return;
            }
            else if (playerInput[i] != gameSequence[i] && strict == "off") {
                $("#wrong").get(0).play();
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
            genNum();
        }
    }

    // EVENT HANDLERS FOR MODAL AND FOR CLOSING ALERTS
    $(document).ready(function() {
        $(".fa-question-circle").click(function() {
            showMessage("Help", $("#help-content").clone().css("display", "block"));
        });
        $(".close").click(function() {
            $(this).parents(".modal").css("display", "none");
        });
    });


    //MODAL ALERT MESSAGES
    function alertMessage(alertType) {
        switch (alertType) {
            case "tryAgainAlert":
                showMessage("Ooops...", "Listen carefully and try again ", startPlaySequence);
                break;
            case "gameOverAlert":
                showMessage("Sorry...", "Game Over ");
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
                setTimeout(onCloseHandler, 1000);
            }
        }
        $(".close").on("click", onClickHandler);
        $(".modal").css("display", "block");
    }
})();
