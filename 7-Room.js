class Room {
  constructor(gridX, gridY) {
    this.gridX = gridX
    this.gridY = gridY
    this.visited = false
    this.enemies = []
    this.populate()
  }

  populate() {
    // Don't spawn enemies in the starting room
    if (this.gridX === 2 && this.gridY === 2) return

    let count = floor(random(2, 5))
    for (let i = 0; i < count; i++) {
      let roll = random()
      if (roll < 0.5)
        this.enemies.push(new normalenemy(random(500,750), random(50,750)))
      else if (roll < 0.8)
        this.enemies.push(new tankenemy(random(500,750), random(50,750)))
      else
        this.enemies.push(new speedenemy(random(500,750), random(50,750)))
    }
  }
}
