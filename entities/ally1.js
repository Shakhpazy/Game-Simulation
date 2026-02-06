class Ally1 extends Entity {

    constructor(x, y, gameEngine) {
        super(x, y+100, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine
        this.row = Math.trunc(y / 100);

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;
        this.cost = 15;
        this.attackTimer = 0;
        this.attackCooldown = 0.7; //1.0 second
        this.damage = 34;

        // State
        this.state = "idle";

        //ally entity
        this.isAlly = true

        this.idle = new Animator(ASSET_MANAGER.getAsset('./Sprites/gokuIdle.png'), 0, 0, 39, 100, 1, 0.2, true);
        this.slash1 = new Animator(ASSET_MANAGER.getAsset('./Sprites/gokuAttack1.png'), 0, 0, 60, 100, 2, 0.15, false);
        this.slash2 = new Animator(ASSET_MANAGER.getAsset('./Sprites/gokuAttack2.png'), 0, 0, 60, 100, 2, 0.15, false);
        this.animator = this.idle;
        this.attackNumber = 2;
        
    }

    update() {

        this.attackTimer += this.gameEngine.clockTick;
        
        this.findTarget()

        if (this.state === "attacking") {
            if (!this.isAttacking && this.attackTimer >= this.attackCooldown) {
                this.attack();
                this.isAttacking = true;
                if(this.attackNumber === 1){
                    this.animator = this.slash1;
                    this.attackNumber = 2;
                } else {
                    this.animator = this.slash2;
                    this.attackNumber = 1;
                }
                
                this.animator.reset() // restart animation
            }

            // when animation finishes → go back to idle
            if (this.animator.isDone()) {
                this.isAttacking = false;
                this.animator = this.idle;
            }
        } 
        else {
            this.animator = this.idle;
            this.isAttacking = false;
        }

        if (this.health <= 0) {
            this.state = "dying";
            this.gameEngine.grid.grid[this.row][Math.trunc(this.x / 100)] = null;
            console.log("this.row", this.row, Math.trunc(this.x / 100));
            this.remove();
        }
    }

    draw(ctx) {
        //Had to hard code the coordinates of Ichigo
        this.animator.drawFrame(this.gameEngine.clockTick, ctx, this.x, this.y);

        // Draw health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 7, this.width, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 7, this.width * healthPercent, 5);

        super.draw(ctx);
    }

    findTarget() {
        const enemies = this.gameEngine.entities.filter(e => e instanceof Zombie);
        const hasTarget = enemies.some(e => e.row === this.row);
        this.state = hasTarget ? "attacking" : "idle";
    }

    attack() {
        this.attackTimer = 0;
        const proj = new Projectile(this.x + 30, this.y, this.damage, 200, this.isAlly, this.gameEngine, new Animator(ASSET_MANAGER.getAsset('./Sprites/gokuBlast.png'), 0, 0, 67, 47, 1, 0.08, true));
        this.gameEngine.addEntity(proj)
        //make it shoot a penut
    }

}