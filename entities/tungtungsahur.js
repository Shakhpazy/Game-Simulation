class Tungtungsahur extends Entity {

    constructor(x, y, row, col) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        
        // Place onto the grid
        if (grid.placeEntity(this, row, col)) {
            console.log("Tungtungsahur placed in grid");
        } else {
            console.log("Tungtungsahur not placed in grid");
        }

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;
        this.cost = 100;
        this.attackTimer = 0;
        this.attackCooldown = 1.0; //1.0 second
        this.damage = 34;

        // State
        this.state = "attacking";
        this.target = null; // the entity we are attacking
    }

    update() {
        this.attackTimer += gameEngine.clockTick;
        
        if (this.state == "idle") {
            this.findTarget()
        }

        if (this.target && this.attackTimer >= this.attackCooldown) {
            this.attack();
        }

        if (this.health <= 0) {
            this.state = "dying";
            this.remove()
        }
    }

    draw(ctx) {
        // Draw sprite or placeholder rectangle
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 7, this.width, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 7, this.width * healthPercent, 5);
    }

    findTarget() {
        //TODO depending on if we want cross row firing (discuss with team)
    }

    attack() {
        this.attackTimer = 0;
        this.state = "attacking"
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) this.remove()
    }
}fdfd