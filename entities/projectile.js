const SIZE = 20;
class Projectile extends Entity {

    constructor(x, y, damage, speed, isally, gameEngine) {
        super(x,y, SIZE, SIZE);
        this.gameEngine = gameEngine
        this.damage = damage
        this.speed = speed
        this.isally = isally
    }

    update() {
        this.x += this.speed * gameEngine.clockTick
        //check for hits intersecting, bounding boxes, and out of screen, wactch lecture vid for this
        super.updateBB()

        //check collision projectile to the enemy
        this.gameEngine.entities.forEach(entity => {
            if (entity.isally !== this.isally && this.hitbox.collide(entity.hitbox)) {
                // Collision detected with an enemy entity
                entity.takeDamage(this.damage)
                this.remove(); // Remove the projectile after hitting
            }
        })
    }


    draw(ctx) {
        ctx.fillStyle = "orange";
        ctx.beginPath();
        ctx.arc(this.x + this.width/2, this.y + this.height/2, this.width/2, 0, Math.PI * 2);
        ctx.fill();

        super.draw(ctx)

    }

}