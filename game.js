var userClickedPattern= [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence(level) {
    level += 1;
    $("h1").text("Level "+ level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound("sounds/"+randomChosenColour+".mp3");
}

$(".btn").click(function handler(button){
    var userChosenColour = button.currentTarget.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length)
})

$(document).keypress(function(){
    var level = 0;
    $("h1").text("Level "+ level);
    nextSequence(level);
});

function playSound(name) {
    var sound = new Audio(name);
    sound.play();
}

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    }, 1000);
}

function checkAnswer(currentLevel) {
    var index = currentLevel - 1;
    if (userClickedPattern[index] != gamePattern[index]) {
        $("h1").text("Game Over, Press any key to Restart");
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $(document).keypress(startOver());
    } else if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function(){
                nextSequence(currentLevel);
            }, 1000);
    }
}

function startOver() {
    gamePattern = [];
    userClickedPattern = [];
}
