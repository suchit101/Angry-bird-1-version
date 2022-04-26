class Pig extends BaseClass {
  //construction of pig using matter.js
  constructor(xInput, yInput) {
    super(xInput, yInput, 50, 50);

    this.image = loadImage("images/enemy.png");
    this.visibility = 255;

    // 0 = black, 255 = white
    // 0 = transparent, 255 = opaque 


  }
  //display based on speed of each object of this class
  display() {
    if (this.body.speed < 5) {
      //console.log("speed of pig when less than 5: "+this.body.speed);
      super.display();
    } else {
      //console.log("speed of pig when greater than 5: "+this.body.speed);
      World.remove(userWorld, this.body);

      push();

      this.visibility = this.visibility - 15;
      tint(255, this.visibility);
      image(this.image, this.body.position.x, this.body.position.y, 50, 50);

      pop();
    }
  }

  //function definition to generate score based on visibility of each object of this class(pig1 and pig2)
  calculateScore(){
    if(this.visibility < 0 && this.visibility > -1005){
      score++;
    }
  }

}
