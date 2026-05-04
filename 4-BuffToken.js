class BuffToken {
  constructor(x,y) {
    this.x = x
    this.y = y
    this.size = 20
    this.collected=0
    this.tokenTimer
  }
  
  draw() {
      stroke("black")
      strokeWeight(1)
      fill("yellow")
      circle(this.x,this.y,this.size)
  }
  
  update() {
  let d = dist(player.x, player.y, this.x, this.y);
  if (d < (player.size / 2 + this.size / 2)) {
    buff();
  }

  if (this.tokenTimer && this.tokenTimer.isFinished()) {
    this.collected = 0;
  }
}

  collect() {
    this.collected=1
    this.tokenTimer= new Timer(5000)
    
  }
}