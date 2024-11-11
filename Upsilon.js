const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Dimensions du jeu
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Personnage
let player = {
  x: 100,
  y: canvasHeight - 100,
  width: 50,
  height: 50,
  velocityY: 0,
  velocityX: 0,
  jumping: false,
};

// Niveaux
const levels = [
  // Niveau 1
  {
    platforms: [
      { x: 0, y: canvasHeight - 50, width: canvasWidth, height: 50 },
      { x: 200, y: canvasHeight - 200, width: 100, height: 20 },
      { x: 500, y: canvasHeight - 350, width: 150, height: 20 },
    ]
  },
  // Niveau 2
  {
    platforms: [
      { x: 0, y: canvasHeight - 50, width: canvasWidth, height: 50 },
      { x: 100, y: canvasHeight - 250, width: 50, height: 20 },
      { x: 300, y: canvasHeight - 400, width: 100, height: 20 },
      { x: 600, y: canvasHeight - 150, width: 75, height: 20 },
    ]
  }
  // ... Ajoutez d'autres niveaux ici
];

// Niveau actuel
let currentLevel = 0;

// Gravité
const gravity = 0.5;

// Vitesse de saut
const jumpSpeed = -10;

// Vitesse de déplacement horizontal
const playerSpeed = 5;

// Gestion des événements du clavier
let keys = {};
document.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});
document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

// Fonction pour dessiner le joueur
function drawPlayer() {
  ctx.fillStyle = 'red';
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Fonction pour dessiner les plateformes
function drawPlatforms() {
  levels[currentLevel].platforms.forEach(platform => {
    ctx.fillStyle = 'brown';
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
  });
}

// Fonction pour vérifier les collisions
function checkCollisions() {
  // Vérifier les collisions avec les plateformes
  levels[currentLevel].platforms.forEach(platform => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y < platform.y + platform.height &&
      player.y + player.height > platform.y
    ) {
      // Si le joueur est sur une plateforme, réinitialiser la vitesse verticale
      if (player.velocityY > 0) {
        player.y = platform.y - player.height;
        player.velocityY = 0;
        player.jumping = false;
      }
    }
  });

  // Vérifier les collisions avec le sol
  if (player.y + player.height > canvasHeight) {
    player.y = canvasHeight - player.height;
    player.velocityY = 0;
    player.jumping = false;
  }
}

// Fonction pour mettre à jour la position du joueur
function updatePlayer() {
  // Appliquer la gravité
  player.velocityY += gravity;
  player.y += player.velocityY;

  // Mouvement horizontal
  if (keys['ArrowRight']) {
    player.velocityX = playerSpeed;
  } else if (keys['ArrowLeft']) {
    player.velocityX = -playerSpeed;
  } else {
    player.velocityX = 0; // Arrêter le joueur s'il n'y a pas de touche de direction enfoncée
  }
  player.x += player.velocityX;

  // Saut
  if (keys['Space'] && !player.jumping) {
    player.velocityY = jumpSpeed;
    player.jumping = true;
  }
}

// Fonction pour effacer le canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

// Boucle de jeu
function gameLoop() {
  clearCanvas();
  updatePlayer();
  checkCollisions();
  drawPlatforms();
  drawPlayer();
  requestAnimationFrame(gameLoop);
}

// Démarrer la boucle de jeu
gameLoop();
