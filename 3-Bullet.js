class Bullet {
  constructor(x, y, angle) {
    this.x = x
    this.y = y
    this.angle = angle
    this.speed = 10
    this.size = 8
    this.dmg = 1
    
    this.active = true
  }

  update() {
    this.x += cos(this.angle) * this.speed
    this.y += sin(this.angle) * this.speed

    // Deactivate if off screen
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.active = false
    }
  }

  draw() {
    fill("blue")
    noStroke()
    circle(this.x, this.y, this.size)
  }
}
