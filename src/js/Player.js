class Player {
    constructor(position, boxSize) {
        this.pos = position;
        this.size = boxSize;
        this.bulletSize = 10;
        this.lastDirection = createVector(0, 0);
    }

    get direction() {
        if (keyCode === 37) {
            return createVector(-1, 0);
        }

        if (keyCode === 39) {
            return createVector(1, 0);
        }

        if (keyCode === 38) {
            return createVector(0, -1);
        }

        if (keyCode === 40) {
            return createVector(0, 1);
        }

        return createVector(0, 0);
    }

    update(...targets) {
        if (this.direction.x || this.direction.y) {
            this.lastDirection = this.direction;
        }

        if (keyIsPressed && this.direction.mag()) {
            let temp = this.pos.copy().add(this.direction.mult(3));
            
            let niceMove = targets.every(t => !isCrushed((t.size + this.size) / 2, t.pos, temp));

            if(niceMove) {
                this.pos = temp.copy();
                this.pos.x = min(max(this.pos.x, this.size / 2), width - this.size / 2);
                this.pos.y = min(max(this.pos.y, this.size / 2), height - this.size / 2);
                
                return !this.pos.dist(temp);
            }
        }
    }

    draw() {
        push();
        rectMode(CENTER);
        // strokeWeight(5);
        noStroke();
        fill(255);
        rect(this.pos.x, this.pos.y, this.size, this.size);
        
        // xxx
        fill(255, 0, 0);
        translate(this.pos.x, this.pos.y);
        rotate(this.lastDirection.heading() - 90);
        angleMode(DEGREES);
        let p1 = p5.Vector.fromAngle(radians(-30), this.size / 3);
        let p2 = p5.Vector.fromAngle(radians(90), this.size / 3);
        let p3 = p5.Vector.fromAngle(radians(210), this.size / 3);
        triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
        pop();
    }

    fire(){
        let bullet = new Bullet(
            this.pos.copy().add(this.lastDirection.copy().mult(this.size / 2)),
            this.bulletSize,
            this.lastDirection.copy(),
            this
        );

        return bullet;
    }
}