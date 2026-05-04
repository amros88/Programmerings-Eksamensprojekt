class Player {
  constructor(size,speed,x,y){
    this.size=40
    this.speed=7.5
    this.x=400
    this.y=400
    this.speedbuff=0
    this.angle=0 //RADIANS - START FACING RIGHT
    
  }
  
  draw(){
    stroke("black");
    fill("black")
    circle(this.x,this.y,this.size)
  }
  
  update(){
    //MOVEMENT
    if (keyIsDown(65)) this.x -= this.speed  // left
    if (keyIsDown(83)) this.y += this.speed  // down
    if (keyIsDown(68)) this.x += this.speed  // right
    if (keyIsDown(87)) this.y -= this.speed // up

    
    //DIRECTIONS
    if (keyIsDown(37)) this.angle = PI        // left
    if (keyIsDown(40)) this.angle = HALF_PI   // down
    if (keyIsDown(39)) this.angle = 0         // right
    if (keyIsDown(38)) this.angle = -HALF_PI  // up
    
    if (keyIsDown(38) && keyIsDown(39)) this.angle = -HALF_PI / 2        // up-right
    if (keyIsDown(38) && keyIsDown(37)) this.angle = PI + HALF_PI / 2    // up-left
    if (keyIsDown(40) && keyIsDown(39)) this.angle = HALF_PI / 2         // down-right
    if (keyIsDown(40) && keyIsDown(37)) this.angle = PI - HALF_PI / 2    // down-left
    
    const doorHalf = 50  // half of the 100px door size

    // Left wall — only block if player isn't in the door gap
    if (!roomManager.hasRoom(-1, 0) || abs(this.y - 400) > doorHalf)
    this.x = max(this.x, this.size / 2)

    // Right wall
    if (!roomManager.hasRoom( 1, 0) || abs(this.y - 400) > doorHalf)
    this.x = min(this.x, width - this.size / 2)

    // Top wall
    if (!roomManager.hasRoom( 0, -1) || abs(this.x - 400) > doorHalf)
    this.y = max(this.y, this.size / 2)

    // Bottom wall
    if (!roomManager.hasRoom( 0,  1) || abs(this.x - 400) > doorHalf)
    this.y = min(this.y, height - this.size / 2)


    
    if (this.buffTimer && this.buffTimer.isFinished()) {
      this.speed = 7.5
      this.buffTimer = null
      this.speedbuff=0
    }
  }
  
  buff(){
    if (this.speedbuff===0){
      this.speed+=10
      this.speedbuff=1
      this.buffTimer = new Timer(5000)
    }
      
  }
}