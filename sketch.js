var water,waterImage;
var fish,fishImage1,fishImage2;
var fish2,fish2Image;
var octopus,octopusImage;
var eel,eelImage;
var gameOver, gameoverImage;
var octopusG,eelG,fish2G;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  waterImage = loadImage("background.png.gif");
  fishImage1 = loadAnimation("fish.png.gif");
  fishImage2 = loadAnimation("deadfish.png.gif")
  fish2Image = loadImage("fish2.png.gif");
  eelImage = loadImage("eel.png.gif");
  octopusImage = loadImage("octopus.png.gif");
  gameoverImage = loadImage("gameOver.png.gif");
}

function setup() {
  createCanvas(1200,300);
  
  //moving background
  water = createSprite(600,150,1000,300);
  water.addImage(waterImage);
  water.velocityX = -5;
  water.x = water.width/2;
  
  //creating the fish 
  fish  = createSprite(70,150);
  fish.addAnimation("fishSwimming",fishImage1);  
  fish.scale=0.07;

  //adding gameOver 
  gameOver = createSprite(650,150);
  gameOver.addImage(gameoverImage);
  gameOver.scale = 0.8;
  gameOver.visible = false;  
  
  //creating groups
  fish2G = new Group();
  eelG = new Group();
  octopusG = new Group();

}

function draw() {
 // background(0);
  
  //gamestate play 
  if(gameState===PLAY){
    if(water.x < 0 ){
    water.x = width/2;
    }
    //making the fish move with the mouse
    fish.y = World.mouseY;
    
    edges= createEdgeSprites();
    fish .collide(edges);
    
    var select_seaAnimal = Math.round(random(1,3));
    if (World.frameCount % 150 == 0) {
      if (select_seaAnimal == 1) {
       spawnFish2();
      } else if (select_seaAnimal == 2) {
       spawnEel();
      } else {
       spawnOctopus();
     }
   }
    
    if(fish2G.isTouching(fish)){
     gameState = END;
     fish2G.velocityY = 0;
    }
    
    if(eelG.isTouching(fish)){
      gameState = END;
      eelG.velocityY = 0;
    }
    
    if(octopusG.isTouching(fish)){
      gameState = END;
      octopusG.velocityY = 0;
    }
  }else if (gameState === END) {
    gameOver.visible = true;
    text("Press Space To Restart The Game!",500,200);
    
    water.velocityX = 0;
    eelG.setVelocityXEach(0);
    eelG.setLifetimeEach(-1);
  
    octopusG.setVelocityXEach(0);
    octopusG.setLifetimeEach(-1);
  
    fish2G.setVelocityXEach(0);
    fish2G.setLifetimeEach(-1);
    
    if(keyDown("Space")){ 
       reset();
    }
   }
  
  drawSprites();
}

function spawnEel(){
  eel =createSprite(1100,Math.round(random(50, 250)));
  eel.scale =0.06;
  eel.velocityX = -6;
  eel.addImage(eelImage);
  eel.setLifetime=170;
  eelG.add(eel);
}

function spawnOctopus(){
  octopus =createSprite(1100,Math.round(random(50, 250)));
  octopus.scale =0.08;
  octopus.velocityX = -6;
  octopus.addImage(octopusImage);
  octopus.setLifetime=170;
  octopusG.add(octopus);
}

function spawnFish2(){
  fish2 =createSprite(1100,Math.round(random(50, 250)));
  fish2.scale =0.06;
  fish2.velocityX = -6;
  fish2.addImage(fish2Image);
  fish2.setLifetime=170;
  fish2G.add(fish2);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;

  fish.changeAnimation("deadFish",fishImage2);

  eelG.destroyEach();
  octopusG.destroyEach();
  fish2G.destroyEach();
}