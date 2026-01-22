class Tungtungsahur extends Entity {

    constructor(x, y, row, col, gameEngine) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine
        // Place onto the grid
        if (grid.placeEntity(this, row, col)) {
            console.log("Tungtungsahur placed in grid");
        } else {
            console.log("Tungtungsahur not placed in grid");
            return //needs to be updated, prevent object creations, and should not be added to gameEngine entities
        }

        this.row = row
        this.col = col

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;
        this.cost = 100;
        this.attackTimer = 0;
        this.attackCooldown = 3.5; //1.0 second
        this.damage = 34;

        // State
        this.state = "idle";

        //ally entity
        this.isally = true
    }

    update() {
        this.attackTimer += this.gameEngine.clockTick;
        
        this.findTarget()

        if (this.state == "attacking" && this.attackTimer >= this.attackCooldown) {
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
        ctx.beginPath();
        ctx.arc(this.x + 40, this.y + 40, this.width/2, 0, 2 * Math.PI);
        ctx.fill();
        
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
        let seen = false
        for (const enemy of enemies) {
            if (enemy.row === this.row) {   // or: if (enemy.row === this.row)
                seen = true
                break;
            }
        }

        this.state = seen ? "attacking" : "idle";
    }

    attack() {
        this.attackTimer = 0;
        const proj = new Projectile(this.x + 20, this.y+30, this.damage, 200, this.isally, this.gameEngine)
        this.gameEngine.addEntity(proj)
        //make it shoot a penut
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) this.remove()
    }
}