
//declaring arrays to hold current colours
let buttonColours =["red", "blue", "green", "yellow"];
var gamePattern = [];
let userClickedPattern = [];

var started=false;
var level=0;

//Starting
$(document).keydown(function()
{
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

//User Clicked Buttons
$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    var length=userClickedPattern.length-1;
    if(started){
        checkAnswer(length);
    }
   
})

//Function to check Answers
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){

                nextSequence();
            },1000)
        }
    }
    else{

        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)

        $("#level-title").text("Game Over!! Press Any Key to Restart");

        startOver();
    }
}

//Function to Generate Random Colour button
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour=buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    var audio = new Audio("sounds/" +randomChosenColour+ ".mp3" );
    playSound(randomChosenColour);

}


function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3" );
    audio.play();
}


function animatePress(currentColour){

        $("#"+ currentColour).addClass("pressed");
    
        setTimeout(function(){
            $("#"+ currentColour).removeClass("pressed");
        }, 100);
}

//Initializing all the variables for Restart
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}