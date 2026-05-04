class RoomManager {
  constructor() {
    this.currentX = 2
    this.currentY = 2  // starting room (center)

    // 0 = no room, 1 = room exists
    this.map = [
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1],
      [1, 0, 1, 0, 1],
      [1, 1, 1, 1, 1]
    ]

    // Create Room objects where map has a 1
    this.grid = []
    for (let x = 0; x < 5; x++) {
      this.grid[x] = []
      for (let y = 0; y < 5; y++) {
        this.grid[x][y] = this.map[y][x] === 1 ? new Room(x, y) : null
      }
    }
    
    // At the end of RoomManager constructor
    this.currentRoom().visited = true

  }

  currentRoom() {
    return this.grid[this.currentX][this.currentY]
  }

  hasRoom(dx, dy) {
    let nx = this.currentX + dx
    let ny = this.currentY + dy
    return nx >= 0 && nx < 5 &&
           ny >= 0 && ny < 5 &&
           this.grid[nx][ny] !== null
  }

  changeRoom(dx, dy) {
    this.currentX += dx
    this.currentY += dy
    e = this.currentRoom().enemies
    this.currentRoom().visited = true
  }
}
