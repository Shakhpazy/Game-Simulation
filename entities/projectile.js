const SIZE = 30;
class Projectile extends Entity {

    constructor(x, y, damage, speed, isally, gameEngine, animator) {
        super(x,y, SIZE, SIZE);
        this.gameEngine = gameEngine
        this.damage = damage
        this.speed = speed
        this.isally = isally
        this.animator = animator;
    }

    update() {
        this.x += this.speed * gameEngine.clockTick
        //check for hits intersecting, bounding boxes, and out of screen, wactch lecture vid for this
        super.updateBB()

        //check collision projectile to the enemy
        this.gameEngine.entities.forEach(entity => {
            if (entity instanceof Zombie && entity.isally !== this.isally && this.hitbox.collide(entity.hitbox)) {
                // Collision detected with an enemy entity
                entity.health -= this.damage;
                this.remove(); // Remove the projectile after hitting
            }
        })
    }


    draw(ctx) {
        this.animator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y);
        super.draw(ctx)

    }

}