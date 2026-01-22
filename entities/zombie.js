class Zombie extends Entity {

    constructor(x, y, row, gameEngine) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine

        this.row = row

        // Combat stats
        this.maxHealth = 200;
        this.health = 200;
        this.attackTimer = 0;
        this.attackCooldown = 1; //1.0 second
        this.damage = 20;
        this.speed = 50;

        // State
        this.state = "walking";

        this.isally = false
    }

    getrow() {
        return this.row
    }

    /**
     * do some math based on pixle postion
     */
    getcol() {
        
    }

    update() {
        this.attackTimer += this.gameEngine.clockTick;

        if (this.state === "walking") {
            this.x -= this.speed * this.gameEngine.clockTick;
        }

        if (this.health <= 0) {
            this.state = "dying";
            this.remove();
        }

        super.updateBB()

        let attacking = false;
        this.gameEngine.entities.forEach(entity => {
            if (!(entity instanceof Projectile) && entity.isally !== this.isally && this.hitbox.collide(entity.hitbox)) {
                // Collision detected with an enemy entity
                attacking = true;
                if (this.attackTimer >= this.attackCooldown) {
                    this.attack(entity);
                }
            }
        })
        this.state = attacking ? "attacking" : "walking";
    }

    draw(ctx) {
        // Draw sprite or placeholder rectangle
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
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
        entity.takeDamage(this.damage)
        this.attackTimer = 0;
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) this.remove()
    }



}