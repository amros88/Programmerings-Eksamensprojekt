//GLOBAL ENEMY MECHANICS
class enemy {
  constructor(size,speed,x,y,maxhealth){
    this.size=size
    this.speed=speed
    this.x=x
    this.y=y
    
    this.health=maxhealth
    this.maxhealth=maxhealth
    
    this.intsize=size*0.95 //INTERNAL HEALTH UI
    
    this.active=true //DEAD OR ALIVE?
  }
  
  draw(){
    //OUTER ENEMY OUTLINE
    strokeWeight(3)
    stroke("black")
    fill("white")
    circle(this.x, this.y, this.size)

    //INNER HEALTH UI
    strokeWeight(0)
    fill("red")
    circle(this.x, this.y, this.intsize)
  }
  
  update(){    
    //BASIC AI MODEL
    if (this.x < player.x) 
      this.x += this.speed
    if (this.x > player.x) 
      this.x -= this.speed
    if (this.y < player.y) 
      this.y += this.speed
    if (this.y > player.y) 
      this.y -= this.speed
    
    //BORDER
    this.x = constrain(this.x, this.size/2, width - this.size/2);
    this.y = constrain(this.y, this.size/2, height - this.size/2);
  }
  
  healthindicator() {
    let ratio =  this.health / this.maxhealth
    
    let maxsize = this.size * 0.95
    this.intsize = maxsize * ratio
  }
}


//ENEMY SUBCLASSES
//NORMAL
class normalenemy extends enemy{
  constructor(x,y){
    super(40,4,x,y,5)
  }
  
  draw(){
    fill("red")
    super.draw()
  }
}


class tankenemy extends enemy{
  constructor(x,y){
    super(50,2.5,x,y,8)
  }
   
  draw(){
    fill("rgb(80,0,0)8")
    super.draw()
  }
}


class speedenemy extends enemy{
  constructor(x,y){
    super(30,6,x,y,3)
  }
  
  draw(){
    fill("rgb(255,111,111))")
    super.draw()
  }
}