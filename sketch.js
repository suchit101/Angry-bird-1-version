//class24 - 33: ANGRY BIRDS GAME
//Developer:
//Topics: PhysicsEngine, Inheritence, JSON, API, functions, Arrays, Push()pop()

//Declare variables for game objects and behaviour indicators(FLAGS)
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//declaring variable to use for simulation
var userEngine, userWorld;

var bird;
var catapult;
var pig1, pig2;
var platform, ground;
var log1, log2, log3, log4;
var box1, box2, box3, box4, box5;

var releaseSound, pigSound, birdSound;

var score;
var gameState, timesPlayed;
var backgroundImg, imagePath;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
  //function call to set background image based on time 
  setBackgroundImg()

  //adding sounds
  releaseSound = loadSound("./sounds/sounds_bird_flying.mp3", loaded);
  pigSound = loadSound("sounds/pig_snort.mp3");
  birdSound = loadSound("sounds/bird_select.mp3");
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
  createCanvas(1200, 400);

  //creating simulation and storing it in associated variables
  userEngine = Engine.create();
  userWorld = userEngine.world;

  //default gamestate value will be associated with bird position i.e. attached to slingshot
  gameState = "onSlingShot";

  //object name = new Classname(constructor call)
  //creation of ground objects using matter.js  
  ground = new Ground(600, height - 10, 1200, 20);
  platform = new Ground(150, 305, 300, 170);

  //creation of Bird object using matter.js
  bird = new Bird(200, 30);


  //creation of catapult with constraint. Body of bird will be attached to the constraint.
  catapult = new SlingShot(bird.body, { x: 200, y: 50 });


  //creation of 1st layer using matter.js//creation of Bird object using matter.js


  //creation of 1st layer using matter.js
  box1 = new Box(700, 320, 70, 70);
  box2 = new Box(920, 320, 70, 70);
  pig1 = new Pig(810, 350);
  log1 = new Log(810, 260, 300, PI / 2);

  //creation of 2nd layer using matter.js
  box3 = new Box(700, 240, 70, 70);
  box4 = new Box(920, 240, 70, 70);
  pig2 = new Pig(810, 220);
  log2 = new Log(810, 180, 300, PI / 2);

  //pigSound.play();
  //creation of 3rd layer using matter.js
  box5 = new Box(810, 160, 70, 70);
  log3 = new Log(760, 120, 150, PI / 7);
  log4 = new Log(870, 120, 150, -PI / 7);

  // birdSound.play();

  timesPlayed = 0;
  score = 0;






}

//All changes, conditions, manipulations, actions to be executed and 
//checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.
function draw() {
  if (backgroundImg) {
    background(backgroundImg);
  }
  else {
    background(0);
  }
  //activating simulation
  Engine.update(userEngine);

  //display of ground using matter.js
  ground.display();

  // displaying the platform
  platform.display();

  bird.display();

  //display of catapult with constraint. Body of bird will be attached to the constraint.
  catapult.display();

  //display  of 1st layer using matter.js
  box1.display();
  box2.display();
  pig1.display();
  log1.display();

  //display of 2nd layer using matter.js
  box3.display();
  box4.display();
  pig2.display();
  log2.display();

  //display of 3rd layer using matter.js
  box5.display();
  log3.display();
  log4.display();

  //function call to generate score based on visibility of each object of this class(pig1 and pig2)
  pig1.calculateScore();
  pig2.calculateScore();

  // display score
  noStroke();// no outline
  textSize(35);// default size of text is 12
  fill("white");
  text("SCORE: " + score, width - 300, 50);

  // display game over message

  // display winning message
  if (pig1.visibility <= 0 && pig2.visibility <= 0) {
    pigSound.play();
    gameState = "gameOver";
    textSize(100);
    fill("white");
    text("YOU WON !!", 440, 200);

  }

}

//function triggered when a  mouse button is clicked and dragged
function mouseDragged() {
  if (catapult.constraint.bodyA != null && mouseX < width / 3 && gameState == "onSlingShot") {
    //function for bird to move with repsect to mouse

    console.log("GAMESTATE inside mouseDragged function: " + gameState);
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}

//function triggered when a clicked mouse is released
function mouseReleased() {
  // check condition to check if the value of timesPlayed is 3
  if (timesPlayed < 3) {
    //function call to detach(release) a body (this.constraint.bodyA) from constraint
    catapult.detach();
    //gamestate value will changed because bird is free of slingshot
    gameState = "detached";
    console.log("GAMESTATE inside mouseReleased function: " + gameState);
    releaseSound.play();
  }

}

//function triggered when any key on keyboard is pressed
function keyPressed() {
  if (keyCode == 83 && timesPlayed < 3 && gameState == "detached") {
    // function call to attach a body to constraint
    catapult.attach(bird.body);
    timesPlayed += 1;
    console.log("timesPlayed: " + timesPlayed);
    birdSound.play();
    gameState = "onSlingShot";
  }
}

//function triggered when a mouse is clicked and dragged
function mouseDragged() {
  if (catapult.constraint.bodyA != null && mouseX < width / 3 && gameState == "onSlingShot") {
    //function for bird to move with repsect to mouse
    Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
  }
}
//function triggered when a clicked mouse is released 
function mouseReleased() {
  if (timesPlayed < 4) {
    //function call to detach(release) a body (this.sling.bodyA) from constraint
    catapult.detach();
    //gamestate value will changed because bird is free of slingshot 
    gameState = "detached";
    pigSound.play(); 
  }
}

//function definition to set background image based on time 
async function setBackgroundImg() {
  var response = await fetch("http://worldclockapi.com/api/json/est/now");
  console.log("response: " + response);
  var responseJSON = await response.json();
  console.log("responseJSON: " + responseJSON);
  var currentDateTime = responseJSON.currentDateTime;
  var hour = currentDateTime.slice(11, 13);
  if (hour >= 06 && hour < 18) {
    imagePath = "images/day.png";
  }
  else {
    imagePath = "images/night1.jpeg";
  }
  backgroundImg = loadImage(imagePath);
  console.log(backgroundImg);
}



