cellSize = 40;
walls = [];
bullets = [];
soundEffects = {};

function preload(){
    soundEffects.exp = loadSound('src/sounds/explosion.mp3');
    soundEffects.moving = loadSound('src/sounds/moving.mp3');
    soundEffects.shoot = loadSound('src/sounds/shoot.mp3');
}

function setup() {
    createCanvas(400, 400);
    player = new Player(createVector(cellSize / 2, cellSize / 2), cellSize / 2);
    walls.push(new Wall(createVector(60, 60), cellSize / 4));

    for(let i = 8; i < 40; i++) {
        for(let j = 8; j < 40; j++) {
            if(random(1) > 0.8) {
                walls.push(new Wall(createVector(i * cellSize / 4 | 0, j * cellSize / 4 | 0), cellSize / 4));
            }
        }
    }
}

function draw() {
    background(0);
    for(let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();

        let crushed = false;
        for(let j = 0; j < walls.length; j++) {
            if(isModelsCrushed(bullets[i], walls[j])) {
                walls.splice(j, 1);
                crushed = true;
            }
        }

        if(crushed || outOfArea(bullets[i])) {
            bullets.splice(i, 1);
            soundEffects.exp.play();
        }
    }

    
    
    let moved = !!player.update(...walls, ...bullets);
    player.draw();

    // if(moved) {
    //     if(!soundEffects.moving.isPlaying()) {
    //         soundEffects.moving.play();
    //     }
    // } else {
    //     soundEffects.moving.stop();
    // }

    walls.forEach(wall => wall.draw());
}

function keyPressed(){
    if(keyCode === 32) {
        if(!bullets.some(b => b.player === player)) {
            bullets.push(player.fire());
            soundEffects.shoot.play();
        }
    }
}
