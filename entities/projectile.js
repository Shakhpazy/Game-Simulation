const SIZE = 20;
class Projectile extends Entity {

    constructor(x, y, damage, speed) {
        super(x,y, SIZE, SIZE);
        this.damage = damage
        this.speed = speed
    }

    update() {
        this.x += this.speed * gameEngine.clockTick
        //check for hits intersecting, bounding boxes, and out of screen, wactch lecture vid for this
        super.updateBB()
    }


    draw(ctx) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();

        super.draw(ctx)
    }

}