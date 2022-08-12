//Declaring Global Variable
var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

var gameState = "play";

function preload(){

  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");

}

function setup(){

  createCanvas(600,600);
  //spookySound.loop();

  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //1)Create Ghost
  ghost = createSprite(300,400);
  ghost.addImage(ghostImg);
  ghost.scale = 0.4;
  //ghost.debug = true;
  ghost.setCollider("circle",-20,10,140)

}

function draw(){

  background(0); //black

  if (gameState === "play") {

   //2)movement of ghost
   if(keyDown("UP_ARROW")) {
    ghost.velocityY = -10;
   }
   ghost.velocityY += 0.5;

   if(keyDown("LEFT_ARROW")) {
    ghost.x = ghost.x - 3;
   }

   if(keyDown("RIGHT_ARROW")) {
    ghost.x = ghost.x + 3;
   } 

   //Infinite scrolling effect
    if(tower.y > 400){
      tower.y = 300
    }

    spawnDoors();

    
    //3)climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    

    //4)invisibleBlockGroup touches ghost
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y >630) {
      gameState = "end";

      ghost.destroy();
    }
   
    
    drawSprites();
  }
  
  if (gameState === "end"){
    //5)GameOver text
    textAlign(CENTER);
    textSize(40);
    fill("yellow");
    text("Game Over",300,200);
  }

}

function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {

    var door = createSprite(200,-50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);

    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    //6)Move door,climber,invisibleBlock
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;

    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //7)assign lifetime to the variable
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
    

    
    //8)add each sprite to the group
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}