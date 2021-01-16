
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodG, obstacleG
var survivalTime
var ground
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  jungle=loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(500,500);
  
  ground=createSprite(250,470,800,10);
  ground.velocityX=1;
  
  monkey=createSprite(100,ground.y-30,0,0);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1;

  backGround=createSprite(300,300,10,10)
  backGround.addImage(jungle)
  backGround.velocityX=-1;
  
  score=0
  obstacleG=new Group()
  FoodG=new Group();
}


function draw() {
  background("blue")
  
  if (ground.x=600){
    ground.x=ground.width/2;
  }
  
   if (backGround.x<0){
    backGround.x=backGround.width/2;
  }
  if (monkey.isTouching(ground)){
    monkey.velocityY=0;
  }
  
  if(monkey.isTouching(obstacleG)){
    score=score-1
    monkey.scale=0.1
    
  }
  
  if(monkey.isTouching(FoodG)){
    score=score+2
   
  
  }
  
  if(keyDown("space")){
    monkey.velocityY=-12
  }
  
   switch(score){
     case 10 : monkey.scale=0.12
               break;
     case 20 : monkey.scale=0.14
               break;
     case 30 : monkey.scale=0.16
               break;
     case 40 : monkey.scale=0.18
               break;
     case 50 : monkey.scale=0.20
  }
  
  monkey.velocityY=monkey.velocityY+0.8
  monkey.collide(ground);
  
  spawnBanana();
  spawnObstacles(); 
  monkey.depth=backGround.depth
  monkey.depth+=3
  ground.visible=false;
drawSprites();
  textSize(20)
  fill("red")
  text("Score:"+score,300,50)
   textSize(20);
  fill("red")
  survivalTime=Math.ceil(frameCount/frameRate())
  text("SURVIVAL TIME :"+survivalTime,100,50)
}

function spawnBanana(){
  if(frameCount%80===0){
  banana=createSprite(500,200,0,0);  
  banana.addImage(bananaImage)
  banana.scale=0.08  
  banana.velocityX=-3; 
  banana.y=Math.round(random(120,200))  
  banana.lifetime=200;  
 FoodG.add(banana)   
}

}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(250,450,600,0);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-1;
    obstacle.lifetime=500;
    obstacle.depth=backGround.depth
    obstacle.depth+=4
    obstacle.scale=0.2
    obstacleG.add(obstacle)
  }
}


