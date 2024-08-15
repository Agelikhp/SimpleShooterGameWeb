// game.js

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 375, y: 550, width: 50, height: 50, speed: 75 };
let bullets = [];
let enemies = [];
let score = 0;

// Function to draw the player
function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Function to draw bullets
function drawBullets() {
    ctx.fillStyle = 'red';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
    });
}

// Function to draw enemies
function drawEnemies() {
    ctx.fillStyle = 'green';
    enemies.forEach(enemy => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
    });
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBullets();
    drawEnemies();
    updateBullets();
    updateEnemies();
    detectCollisions();
    requestAnimationFrame(gameLoop);
    drawScore();
}

function drawScore () {
    ctx.font = '16px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText ('Score: ' + score, 10, 20);
}

// Handle shooting
document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y, width: 5, height: 10 });
    }
});

// Update bullet positions
function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= 5; // Move bullet up
        if (bullet.y < 0) {
            bullets.splice(index, 1); // Remove bullet if off screen
        }
    });
}

// Update enemy positions and spawn logic
function updateEnemies() {
    if (Math.random() < 0.02) { // 2% chance to spawn an enemy each frame
        enemies.push({ x: Math.random() * (canvas.width - 40), y: 0, width: 40, height: 40 });
    }

    enemies.forEach((enemy, index) => {
        enemy.y += 2; // Move enemy down
        if (enemy.y > canvas.height) {
            enemies.splice(index, 1); // Remove enemy if off screen
        }
    });
}

// Detect collisions between bullets and enemies
function detectCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                // Collision detected
                bullets.splice(bIndex, 1); // Remove bullet
                enemies.splice(eIndex, 1); // Remove enemy
                score += 10; // Increment score
                console.log("Score: " + score); // Log score
            }
        });
    });
}

// Handle player movement
document.addEventListener('keydown', (event) => {
    if (event.code === 'ArrowLeft' && player.x > 0) {
        player.x -= player.speed; // Move left
    }
    if (event.code === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.speed; // Move right
    }
});

// Start the game loop
gameLoop();