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
        this.state = "spawn";
        this.isAlive = true;

        //ally entity
        this.isAlly = true

        // Animation coordinates
        this.charX = this.x;
        this.charY = this.y;
        this.endX = this.x - 45;
        this.endY = this.y - 60;
        this.attackX = this.x += 10;
        this.attackY = this.y += 15;
        this.idleX = this.x - 10;
        this.idleY = this.y - 15;


        // detection
        this.detected = false;
        this.detection = new Entity(this.x, this.y, 200, 80);

        this.idle = new Animator(ASSET_MANAGER.getAsset('./Sprites/gojoIdle.png'), 0, 0, 82.5, 74, 3, 0.2, true);
        this.attack = new Animator(ASSET_MANAGER.getAsset('./Sprites/gojoAttack.png'), 0, 0, 40, 56, 2, 0.2, true);
        this.start = new Animator(ASSET_MANAGER.getAsset('./Sprites/gojoStart.png'), 0, 0, 110, 146, 3, 0.1, false);
        this.end = new Animator(ASSET_MANAGER.getAsset('./Sprites/gojoEnd.png'), 0, 0, 120, 146, 3, 0.1, false);
        this.blast = new Animator(ASSET_MANAGER.getAsset('./Sprites/gojoBlast.png'), 0, 0, 67, 78, 3, 0.2, true);
        this.empty = new Animator(ASSET_MANAGER.getAsset('./Sprites/empty.png'), 0, 0, 66, 54, 1, 0.5, true);
        this.projAnimator = this.empty;
        this.charAnimator = this.empty;
    }

    update() {

        if (this.state === "spawn" && this.charAnimator.isDone()) {

            this.state = "idle";
            this.charAnimator = this.idle;
            this.charX = this.x;
            this.charY = this.y;

        }

        this.updateBB();
        if (this.x >= 1500) {
            this.projAnimator = this.empty;
            this.state = "done";
        }



        if (this.state == "attacking") {
            this.projAnimator = this.blast;
            this.x += (200 * this.gameEngine.clockTick);
            this.charAnimator = this.attack;
            this.charX = this.attackX;
            this.charY = this.attackY;
        }

        if (this.state == "idle") {
            this.charAnimator = this.idle;
            this.charX = this.idleX;
            this.charY = this.idleY;
        }

        if (this.state == "done") {
            this.charAnimator = this.end;
            this.charX = this.endX;
            this.charY = this.endY;
            if (this.charAnimator.isDone()) {
                this.remove()
            }
        }

        // When the tower detects an enemy close by without any ally in the row, it will spawn gojo and wait for the other collision detector
        if (this.state == "spawn") {
            for (let i = 0; i < 2; i++) {
                if (this.gameEngine.grid.grid[this.row][i] === null && this.detected == true) {
                    this.charAnimator = this.start;
                    this.charX = this.endX;
                    this.charY = this.endY;
                }
            }
        }

        this.gameEngine.entities.forEach(entity => {
            if (this.state === "spawn") {

            }
            if ((entity instanceof Zombie) && entity.isAlly !== this.isAlly) {
                if (this.state === "spawn" && this.detection.hitbox.collide(entity.hitbox)) { 
                    this.detected = true;
                }
                else if (this.hitbox.collide(entity.hitbox)) {
                    this.state = "attacking";
                    if (this.isAlive) {
                        this.gameEngine.grid.grid[this.row][0] = null;
                        this.isAlive = false;
                    }
                    entity.health -= entity.health;
                }
            }
        })


    }

    draw(ctx) {
        //Had to hard code the coordinates of Ichigo
        this.charAnimator.drawFrame(this.gameEngine.clockTick, ctx, this.charX - 15, this.charY - 10);
        this.projAnimator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y - 30);

        // Placeholder sprite: small centered rectangle
        /*const size = 40;
        const px = this.x + (this.width - size) / 2;
        const py = this.y + size; // adjust if needed for your coordinate origin
        ctx.fillStyle = "#666";
        ctx.fillRect(px, py, size, size);
        */

        super.draw(ctx);
    }


}