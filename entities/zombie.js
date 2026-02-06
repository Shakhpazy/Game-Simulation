class Zombie extends Entity {

    constructor(row, gameEngine) {
        const x = 800; // Starting x position (right side)
        const y = row * 100 + 112; // Calculate y from row 112 B/C 100 to acccount for starting postion of grid high
        super(x, y, 80, 80);
        this.gameEngine = gameEngine

        this.row = row

        // Combat stats
        this.maxHealth = 120;
        this.health = 120;
        this.attackTimer = 0;
        this.attackCooldown = 1; //1.0 second
        this.damage = 20;
        this.speed = 50;

        // State
        this.state = "walking";
        this.isAlly = false

        // for call back function
        this._onDeathCallback = null;

        //draw entity
        this.walking = new Animator(ASSET_MANAGER.getAsset('./Sprites/ZombieWalking.png'), 0, 0, 50, 56, 7, 0.15, true);
        this.eatingHealthy = new Animator(ASSET_MANAGER.getAsset('./Sprites/ZombieEatHealthy.png'), 0, -2, 45, 56, 7, 0.2, true);
        this.animator = this.walking;
    }

    initialize(onDeathCallback) {
        this._onDeathCallback = onDeathCallback;
    }

    getRow() {
        return this.row
    }

    /**
     * do some math based on pixle postion
     */
    getCol() {
        
    }

    update() {
        if (this.health <= 0) {
            this._onDeathCallback?.(this);
            this.remove();
            this.gameEngine.player.updatePoints(0, true, 0);
        }

        this.attackTimer += this.gameEngine.clockTick;

        if (this.state === "walking") {
            this.x -= this.speed * this.gameEngine.clockTick;
        }

        if (this.health <= 0) return;

        super.updateBB()

        let attacking = false;
        this.gameEngine.entities.forEach(entity => {
            if ((entity instanceof Ally1 || entity instanceof Ally2 || entity instanceof Ally3) 
                && entity.isAlly !== this.isAlly && this.hitbox.collide(entity.hitbox)) {
                // Collision detected with an enemy entity
                attacking = true;
                if (this.attackTimer >= this.attackCooldown) {
                    this.attack(entity);
                }
            }
            if ((entity instanceof Tower) && entity.isAlly !== this.isAlly && this.hitbox.collide(entity.hitbox)) {
                // Collision detected with an enemy entity
                attacking = true;
                if (this.attackTimer >= this.attackCooldown) {
                    this.attack(entity);
                }
            }
        })
        this.state = attacking ? "attacking" : "walking";
        
        if(this.state === "attacking") {
            this.speed = 0;
            this.animator = this.eatingHealthy;
        }
        else{
            this.speed = 50;
            this.animator = this.walking
        }

        // Zombie reached the left edge (tower side)
        if (this.x < -5) {
            this.health = 0; // Trigger removal in the next update
        }
    }

    draw(ctx) {
        // Draw sprite
        ctx.save();
        ctx.translate(this.x + this.animator.width, this.y);
        this.animator.drawFrame(this.gameEngine.clockTick, ctx, -60, 0);
        ctx.restore()
        
            

        // Draw health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 7, this.width, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 7, this.width * healthPercent, 5);

        super.draw(ctx);
    }

    findTarget() {
    }

    attack(entity) {
        entity.health -= this.damage;
        this.attackTimer = 0;
    }




}