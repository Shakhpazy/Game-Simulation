class Tower extends Entity {

    constructor(x, y, row, gameEngine) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine
        this.row = row;
        this.col = 0;

        // Combat stats
        this.maxHealth = 1;
        this.health = 1;
        this.damage = 100;

        // State
        this.state = "idle";
        this.isAlive = true;

        //ally entity
        this.isAlly = true

        //this.idle = new Animator(ASSET_MANAGER.getAsset('./Sprites/cart.png'), 0, 0, 52, 100, 4, 0.2, true);
        //this.slash = new Animator(ASSET_MANAGER.getAsset('./Sprites/cart.png'), 0, 0, 59, 100, 1, 0.17, false);
        //this.animator = this.idle;
    }

    update() {
        super.updateBB();
        if (this.x  >= 1500) {
            super.remove();
        }

        if (this.state == "attacking") {
            this.x += (200 * this.gameEngine.clockTick);
        }


        this.gameEngine.entities.forEach(entity => {
            if ((entity instanceof Zombie) 
                && entity.isAlly !== this.isAlly && this.hitbox.collide(entity.hitbox)) {
                this.state = "attacking";
                if (this.isAlive) {
                    this.gameEngine.grid.grid[this.row][0] = null;
                    this.isAlive = false;
                }
                entity.health -= entity.health;
            }
        })
    }

    draw(ctx) {
        //Had to hard code the coordinates of Ichigo
        //this.animator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - 10);

        // Placeholder sprite: small centered rectangle
        const size = 40;
        const px = this.x + (this.width - size) / 2;
        const py = this.y + size; // adjust if needed for your coordinate origin
        ctx.fillStyle = "#666";
        ctx.fillRect(px, py, size, size);

        super.draw(ctx);
    }

}