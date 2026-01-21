class Zombie extends Entity {

    constructor(x, y, row) {
        super(x, y, 80, 80); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.row = row

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;
        this.attackTimer = 0;
        this.attackCooldown = 1.0; //1.0 second
        this.damage = 20;
        this.speed = 10;

        // State
        this.state = "walking";
        this.target = null; // the entity zombie is attacking
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
        this.attackTimer += gameEngine.clockTick;

        if (this.state == "walking") {
            this.x -= this.speed * gameEngine.clockTick
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
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 7, this.width, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 7, this.width * healthPercent, 5);
    }

    findTarget() {
    }

    attack() {
        this.attackTimer = 0;
        this.state = "attacking"
    }

    takeDamage(amount) {
        this.health -= amount
        if (this.health <= 0) this.remove()
    }



}