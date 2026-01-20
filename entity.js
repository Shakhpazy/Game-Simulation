class Entity {

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.removeFromWorld = false;
    }

    update() {
    }

    draw(ctx) {
    }

    getBoundingBox() {
        return {
            x1: this.x,
            y1: this.y,
            x2: this.x + this.width,
            y2: this.y + this.height
        };
    }

    remove() {
        this.removeFromWorld = true;
    }
} 