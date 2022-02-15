//globals
var windowSize;
var pipes = [];
var playerX = 240;
var playerY = 300;
var score = 1;
var startSpeed = 2;
var difficultyCurve = 0.2
var playerSize = 30
var lose = false;

var velocity = 0
var gravity = 0.7
var jumpHeight = 1.2
var terminalVelocity = 20

function setup() {
  
  if (windowHeight > windowWidth)
  {
    windowSize = windowWidth
  }else
  {
    windowSize = windowHeight
  }
  createCanvas(600, 600);
  
  //init
  
  pipes.push(new Pipe(700, random(100,500), random(200,250),100));
  pipes.push(new Pipe(1000, random(100,500), random(200,250),100));
  pipes.push(new Pipe(1300, random(100,500), random(200,250),100));
  console.log(pipes[1].x)
  textSize(20)
  textAlign(CENTER,CENTER)
}

function check(r1x,r1y,r1w,r1h,r2x,r2y,r2w,r2h)
{
  if (r1x + r1w >= r2x &&     // r1 right edge past r2 left
  r1x <= r2x + r2w &&       // r1 left edge past r2 right
  r1y + r1h >= r2y &&       // r1 top edge past r2 bottom
  r1y <= r2y + r2h) {       // r1 bottom edge past r2 top
    return true;
}
return false;
}

function draw() {
  if (!lose)
  {
    background(100);


    for (var i = 0; i < 3; i++)
    {
      pipes[i].Update();

      if (check(playerX-playerSize/2,playerY-playerSize/2,playerSize,playerSize,pipes[i].x - pipes[i].width/2, 0, pipes[i].width, pipes[i].y-pipes[i].gap/2) || check(playerX-playerSize/2,playerY-playerSize/2,playerSize,playerSize,pipes[i].x - pipes[i].width/2, pipes[i].y+pipes[i].gap/2,pipes[i].width, height-pipes[i].y+pipes[i].gap/2))
      {
        lose = true;
        console.log("Lose");

      }
    }
    fill(0)
    text("SCORE: " + score, 70,20)

    fill('crimson')
    square(playerX-playerSize/2,playerY-playerSize/2,playerSize)

    playerY += velocity;
    if (playerY < 600){

      if (velocity < terminalVelocity)
      {
        velocity+=gravity;
      }
    }else
    {
      velocity = -1;
    }
  }else
  {
    push();
    background(10,10,10,10)
    textSize(50)
    textFont("VERDANA")
    fill(255,10,10,50)
    text("You Lose",300,300)
    textSize(30)
    text("Score: " + score, 300,400)
    pop();
  }
  
  
}

function keyPressed() 
{
  console.log("Jump")
  if (playerY > 0)
  velocity = jumpHeight * -10
}

class Pipe
{
  constructor(x,y,gap,width)
  {
    this.x = x;
    this.y = y;
    this.gap = gap;
    this.width = width;
  }
  
  Update()
  {
    
    push();
    fill('green')
    rect(this.x - this.width/2, 0, this.width, this.y-this.gap/2)
    rect(this.x - this.width/2, this.y+this.gap/2, this.width, height-this.y+this.gap/2)
    
    if (this.x < -300)
    {
      this.x = 700;
      this.y = random(100,500);
      score++;
    }
    this.x-=score*difficultyCurve+startSpeed;
    
    pop();
  }
}


