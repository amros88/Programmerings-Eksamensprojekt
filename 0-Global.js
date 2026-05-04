let e = [];
let bullets = [];
let player, buffToken;
let roomManager;

function setup() {
  createCanvas(800, 800);

  //BUFFTOKEN
  buffToken = new BuffToken(random(0, width), random(0, height));

  roomManager = new RoomManager(5, 5, 8); // 5x5 grid, 8 rooms
  e = roomManager.currentRoom().enemies; // load starting room enemies

  //PLAYER
  player = new Player();
}

function draw() {
  background(255);

  //BORDER
  fill("white");
  stroke("brown");
  strokeWeight(5);
  rect(400, 400, width, height);

  // DRAW DOORS
  drawDoors();

  // CHECK DOOR TRANSITIONS
  checkDoors();

  //COLLISION CHECK
  checkCollisions();

  //BUFFTOKEN
  buffToken.update();

  if (buffToken.collected === 0) {
    buffToken.draw();
  }

  //BULLETS
  for (let b of bullets) {
    b.update();
    b.draw();
  }
  bullets = bullets.filter((b) => b.active);

  //ENEMY
  for (let en of e) {
    en.update();
    en.draw();
  }

  //PLAYER
  player.update();
  player.draw();

  drawMinimap();
  
  //ENEMY CLEAR
  let room = roomManager.currentRoom()
  if (room.visited && room.enemies.length === 0) {
  room.cleared = true
}

}


//BUFFS
function buff() {
  player.buff();
  buffToken.collect();
}

//SHOOT
function keyPressed() {
  if (keyCode === 32) {
    bullets.push(new Bullet(player.x, player.y, player.angle));
  }
}

//BULLET COLLISION
function checkCollisions() {
  for (let b of bullets) {
    for (let en of e) {
      if (!b.active || !en.active) continue;

      let d = dist(b.x, b.y, en.x, en.y);
      if (d < b.size / 2 + en.size / 2) {
        b.active = false; // destroy bullet
        en.health -= 1; // deal damage
        en.healthindicator();
        if (en.health <= 0) {
          en.active = false; // destroy enemy
        }
      }
    }
  }

  // Clean up inactive bullets and enemies
  bullets = bullets.filter((b) => b.active);
  e = e.filter((en) => en.active);
  roomManager.currentRoom().enemies = e  // ← keep room in sync

}

function drawDoors() {
  fill("rgb(54,54,54)");
  noStroke();
  rectMode(CENTER);
  if (roomManager.hasRoom(1, 0)) rect(800, 400, 20, 100); // right
  if (roomManager.hasRoom(-1, 0)) rect(0, 400, 20, 100); // left
  if (roomManager.hasRoom(0, -1)) rect(400, 0, 100, 20); // up
  if (roomManager.hasRoom(0, 1)) rect(400, 800, 100, 20); // down
}

function checkDoors() {
  const doorHalf = 50; // half of the 100px door height/width

  // Right door
  if (
    roomManager.hasRoom(1, 0) &&
    (player.x > width - player.size / 2) && (abs(player.y - 400) < doorHalf)
  ) {
    roomManager.changeRoom(1, 0);
    player.x = player.size / 2 + 5;
  }

  // Left door
  if (
    roomManager.hasRoom(-1, 0) &&
    (player.x < player.size / 2) && (abs(player.y - 400) < doorHalf)
  ) {
    roomManager.changeRoom(-1, 0);
    player.x = width - player.size / 2 - 5;
  }

  // Top door
  if (
    roomManager.hasRoom(0, -1) &&
    (player.y < player.size / 2) && (abs(player.x - 400) < doorHalf)
  ) {
    roomManager.changeRoom(0, -1);
    player.y = height - player.size / 2 - 5;
  }

  // Bottom door
  if (
    roomManager.hasRoom(0, 1) &&
    (player.y > height - player.size / 2) && (abs(player.x - 400) < doorHalf)
  ) {
    roomManager.changeRoom(0, 1);
    player.y = player.size / 2 + 5;
  }
}

function drawMinimap() {
  let tileSize = 12;
  let padding = 10;

  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      if (roomManager.grid[x][y] !== null) {
        // Highlight current room in red, visited in green, unvisited in dark
        if (x === roomManager.currentX && y === roomManager.currentY)
          fill("red");
        else if (roomManager.grid[x][y].cleared) fill("green");
        else if (roomManager.grid[x][y].visited) fill("darkorange");
        else fill(50);

        noStroke();
        rect(
          padding + x * tileSize,
          padding + y * tileSize,
          tileSize - 2,
          tileSize - 2
        );
      }
    }
  }
}
