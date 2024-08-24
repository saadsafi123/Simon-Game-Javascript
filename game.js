//declaring arrays to hold current colours
let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let highScore = 0;

$(document).ready(function() {
    // Starting or restarting the game when the start button is clicked
    $("#start-btn").click(function() {
        if (!started) {
            $("#level-title").text("Level " + (level+1));
            $("#start-btn").text("Restart Game"); 
            setTimeout(function() {
            nextSequence();
            started = true;
           
            }, 500);
        } else {

            startOver();
            $("#start-btn").text("Start Game"); 
        }
    });

    //Starting Game when User Click any key
    $(document).keydown(function() {
        if (!started) {
            $("#level-title").text("Level " + (level+1));
            $("#start-btn").text("Restart Game"); // Change button text when game starts

            setTimeout(function() {
            nextSequence();
            started = true;
            }, 500);
        }
    });
});

//User Clicked Buttons
$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    let length = userClickedPattern.length - 1;
    if (started) {
        checkAnswer(length);
    }
});

//Function to check Answers
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").html('<span class="games-over">Game Over!!</span><span class="restart">Press Any Key to Restart</span>');
        $("#start-btn").text("Play Again"); // Change button text when game ends
        updateHighScore();
        startOver();
    }
}

//Function to Generate Random Colour button and Next Sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

//Play sound on clicks
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Initializing all the variables to Start Again
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    $("#start-btn").text("Play Again");
}


//Highscore Holder
function updateHighScore() {
    if (level > highScore) {
        highScore = level;
        $("#high-score").text("High Score: " + highScore);
    }
}
