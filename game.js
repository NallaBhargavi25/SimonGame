var gamePattern=[];
var userClickedPatten=[];

var buttonColors=["red","blue","green","yellow"];

var level=0;

var firstKeyPress=true;
$(document).keydown(()=>{
    if(firstKeyPress===true)
    {
    firstKeyPress=false;
    $("h1").html("Level 0");
    setTimeout(newSequence,1000);
    }
});

function newSequence(){
    userClickedPatten=[];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var color1="#"+randomChosenColor;
    $(color1).fadeOut(100).fadeIn(100);
    
    var sound=randomChosenColor+".mp3";
    var audio1=new Audio(sound);
    audio1.play();
}

$(".btn").click(handler);

function handler(){
    
    var userChoosenColor=this.id;
    animatePress(userChoosenColor);
    userClickedPatten.push(userChoosenColor);
    checkAnswer(userClickedPatten.length-1);
    var sound=userChoosenColor+".mp3";
    var audio=new Audio(sound);
    audio.play();
}

function animatePress(currentColor){
    currentColor="#"+currentColor;
    $(currentColor).addClass("pressed");
    setTimeout(()=>{
        $(currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPatten[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPatten.length==gamePattern.length){
            level++;
            levelString="Level "+level;
            $("h1").html(levelString);
            
            setTimeout(newSequence,1000);
        }
    }
    else{
        var audio=new Audio('wrong.mp3');
        audio.play();
        $("body").addClass("game-over");

        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);

        $("h1").html("Game Over, Press Any Key to Restart");

        gamePattern=[];
        level=0;
        firstKeyPress=true;

    }
}
