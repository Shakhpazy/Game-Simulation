class Projectile extends Entity {

    constructor(x, y, damage, speed) {
        super(x,y, 20, 20);
        this.damage = damage
        this.speed = speed
    }

    update() {
        this.x += this.speed * gameEngine.clockTick

        //check for hits intersecting, bounding boxes, and out of screen, wactch lecture vid for this
    }

    draw(ctx) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();
    }

}