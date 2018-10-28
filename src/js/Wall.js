class Wall {
    constructor(position, size) {
        this.pos = position;
        this.size = size;
    }

    draw() {
        push();
        noStroke();
        fill(255, 200, 200);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.size, this.size);
        pop();
    }
}