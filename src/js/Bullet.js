class Bullet {
    constructor(position, size, direction, player) {
        this.pos = position;
        this.size = size;
        this.dir = direction;
        this.player = player;
        this.movingVector = this.dir.copy().mult(5);
    }

    update() {
        this.pos.add(this.movingVector);
    }

    draw() {
        push();
        noStroke();
        fill(255, 0, 0);
        ellipseMode(CENTER);
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}