
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level=0;

$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer();
});
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level-"+level);
    nextSequence();
    started=true;
  }
})
function checkAnswer(){
  var clicked=true;
  for(var i=0;i<userClickedPattern.length;i++){
  if(userClickedPattern[i]!==gamePattern[i]){
    clicked=false;
    break;
  }
  };
  if (clicked && userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = []; // Clear userClickedPattern for the next round
     }else if(!clicked){
     wrongPress();}
}

function wrongPress(){
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  startOver();
}

function startOver(){

      gamePattern=[];
      userClickedPattern = [];
      level=0;
      started=false;
}

function nextSequence(){
  level++;
  $("#level-title").text("Level-"+level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio=new Audio("sounds/"+randomChosenColour+".mp3");
  audio.play();
}
function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColor){

  $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
      $("#" + currentColor).removeClass("pressed");
    },100);
  }
