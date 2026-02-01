class Entity {

    constructor(x, y, width, height) {
        Object.assign(this, {x,y,width,height})
        this.removeFromWorld = false;
        //just making hitboxes 5px smaller for testing
        this.hitbox = new BoundingBox(this.x, this.y, this.width, this.height)
        this.debugHitbox = true
    }

    updateBB() {
        this.hitbox = new BoundingBox(this.x, this.y, this.width, this.height)
    }

    update() {
    }

    draw(ctx) {
        if (this.hitbox && this.debugHitbox) {
            ctx.strokeStyle = "yellow";
            ctx.lineWidth = 2;
            ctx.strokeRect(this.hitbox.left, this.hitbox.top, this.hitbox.width, this.hitbox.height);
        }
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