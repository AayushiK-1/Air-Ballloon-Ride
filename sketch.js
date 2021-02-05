var balloon,database;
var height;

function preload(){
  BckImg=loadImage("Balloon-01.png");
  balloonImg=loadImage("Hot Air Ballon-02.png",);
  
}
function setup() {
  database=firebase.database();
  createCanvas(500,500);
  balloon=createSprite(250,250,50,50);
  balloon.addImage(balloonImg);
  balloon.scale=0.3;

  var balloonPosition=database.ref('balloon/height');
    balloonPosition.on("value",readHeight,showError);
}

function draw() {
  background(BckImg);  
  
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addImage(BalloonImg);
    balloon.scale=balloon.scale-0.01;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
  }

  

  balloon.display();
}

function updateHeight(x,y){
  database.ref("balloon/height").set({
  'x' : height.x + x ,
  'y' : height.y + y
})
}

function readHeight(data){
 height=data.val();
 console.log(height.x);
 balloon.x=height.x;
 balloon.y=height.y;
}

function showError(){
console.log("Error");
}