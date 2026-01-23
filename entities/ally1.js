class Ally1 extends Entity {

    constructor(x, y, gameEngine) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine
        this.row = Math.trunc(y / 100);

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;
        this.cost = 100;
        this.attackTimer = 0;
        this.attackCooldown = 1; //1.0 second
        this.damage = 34;

        // State
        this.state = "idle";

        //ally entity
        this.isAlly = true
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
        const hasTarget = enemies.some(e => e.row === this.row);
        this.state = hasTarget ? "attacking" : "idle";
    }

    attack() {
        this.attackTimer = 0;
        const proj = new Projectile(this.x + 20, this.y+30, this.damage, 200, this.isAlly, this.gameEngine)
        this.gameEngine.addEntity(proj)
        //make it shoot a penut
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) this.remove()
    }
}