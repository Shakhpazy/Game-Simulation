class Zombie extends Entity {

    constructor(row, gameEngine) {
        const x = 800; // Starting x position (right side)
        const y = row * 100 + 12; // Calculate y from row
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
        this.attackTimer += this.gameEngine.clockTick;

        if (this.state === "walking") {
            this.x -= this.speed * this.gameEngine.clockTick;
        }

        if (this.health <= 0) return;

        super.updateBB()

        let attacking = false;
        this.gameEngine.entities.forEach(entity => {
            if ((entity instanceof Ally1) && entity.isAlly !== this.isAlly && this.hitbox.collide(entity.hitbox)) {
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
        if (this.health <= 0) {
            this._onDeathCallback?.(this);
            this.remove();
        }
    }



}