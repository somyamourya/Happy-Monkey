// create all var 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkeyrunning,monkeycrying;
var banana ,bananaImage, obstacle, obstacleImage;
var foodsGroup, obstaclesGroup;
var ground,groundImage,score,jumpsound;
var END;
var PLAY;
var gameState=PLAY;

function preload(){
  
      // load all animations and Images
      monkeyrunning = loadAnimation("sprite_0.png",
      "sprite_1.png","sprite_2.png","sprite_3.png",
      "sprite_4.png","sprite_5.png","sprite_6.png",
      "sprite_7.png","sprite_8.png");                                 
      monkeycrying = loadAnimation("crying.png");
      bananaImage = loadImage("banana.png");
      obstaceImage = loadImage("obstacle.png");
      groundImage = loadImage("ground.jpg");
      jumpsound = loadSound("jump.ogg");

  

}



function setup() {
  
      // adjest canvas size
      createCanvas(430,400);

      // create all sprites
  

  
      ground = createSprite(200,380,10,10);
      ground.addImage("back",groundImage);
      ground.velocityX=-6;
      ground.x = ground.width /2;  
  
      monkey = createSprite(70,310,10,10);
      monkey.addAnimation("running",monkeyrunning);
      monkey.addAnimation("collided" , monkeycrying)
      monkey.scale=0.120;
       
      obstaclesGroup = new Group();
      foodsGroup = new Group();
  
  
      survivalTime = 0;
      score = 0;
  
      
      monkey.setCollider("rectangle",0,0,350,350);
      monkey.debug =true; 
}


function draw() {
  
      background("skyblue");
  
      if(gameState === PLAY){
  
      spawnObstacles();
      spawnFood();
  
      if (ground.x < 0){
          ground.x = ground.width/2;
        
      }
  

  
      if(keyDown("space")&& monkey.y >=180) {
        monkey.velocityY = -12;
        jumpsound.play();
      }
      // gravity and collide
      monkey.velocityY = monkey.velocityY + 0.8
      monkey.collide(ground);
        
      if(monkey.isTouching(foodsGroup)){
          score = score+1;
          foodsGroup.destroyEach();

      }
      survivalTime = survivalTime + Math.round
      (getFrameRate()/60.8);
      
      if(obstaclesGroup.isTouching(monkey)){
          obstaclesGroup.setVelocityXEach(0);
          foodsGroup.setVelocityXEach(0);
          obstaclesGroup.setLifetimeEach(-1);
          foodsGroup.setLifetimeEach(-1);
          gameState=END;
      }
}
      else if (gameState === END) {
          ground.velocityX = 0;
          monkey.velocityY = 0;

     
      //set lifetime of the game objects so that they   are never destroyed
      foodsGroup.setLifetimeEach(-1);
      obstaclesGroup.setLifetimeEach(-1);
      monkey.changeAnimation("collided",monkeycrying);    
      foodsGroup.setVelocityXEach(0);
      obstaclesGroup.setVelocityXEach(0);    
          fill("black");
          text("GAME OVER",40,170); 
          textSize(30);
          fill("black");
          text("Press R To Reset",40,220); 
     if(keyDown("R")){
        reset();
    }

   }

      drawSprites();
  

      textSize(25);
      fill("black");
      text("Score: "+ score, 20,60);    

  

      textSize(25);
      text("Survival Time: "+ survivalTime,20,30);
      textSize(60);

}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 50 === 0) {
    banana = createSprite(500,250,40,10);
    banana.y = random(200,300);    

    banana.velocityX=-6;
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    foodsGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(700,300,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.200;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      foodsGroup.destroyEach();
      monkey.changeAnimation("running",monkeyrunning);
      score=0;
      ground.velocityX=-6;
      survivalTime=0; 
}


