const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

let player = {
  x: 100,
  y: canvasHeight - 100,
  width: 50,
  height: 50,
  velocityY: 0,
  jumping: false,
};

const platforms = [
  { x: 0, y: canvasHeight - 50, width: canvasWidth, height: 50 },
  { x: 200, y: canvasHeight - 200, width: 100, height: 20 },
  { x: 500, y: canvasHeight - 350, width: 150, height: 20 },
];

const gravity = 0.5;

const jumpSpeed = -10;

let keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  platforms.forEach(platform => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

function checkCollisions() {
  platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      
      if (player.velocityY > 0) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.jumping = false;
      }
    }
  });

 
  if (player.y + player.height > canvasHeight) {
    player.y = canvasHeight - player.height;
    player.velocityY = 0;
    player.jumping = false;
  }
}

function updatePlayer() {
    player.velocityY += gravity;
  player.y += player.velocityY;

  
  if (keys['Space'] && !player.jumping) {
    player.velocityY = jumpSpeed;
    player.jumping = true;
  }
}


function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}


function gameLoop() {
  clearCanvas();
  updatePlayer();
  checkCollisions();
  drawPlatforms();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}


gameLoop();
