class Tower extends Entity {

    constructor(x, y, gameEngine) {
        super(x+10, y+10, 80, 480); //80 x 80 pixles is the size of the tungtungsahur (entites should all have same size)
        this.gameEngine = gameEngine
        this.row = Math.trunc(y / 100);

        // Combat stats
        this.maxHealth = 100;
        this.health = 100;

        //ally entity
        this.isAlly = true
    }

    update() {
        if (this.health <= 0) {
            this.gameEngine.grid.grid[this.row][Math.trunc(this.x / 100)] = null;
            this.remove();
            // change this image like a broken tower or something this needs to be done only 1 time tho
        }
    }

    draw(ctx) {
        // Draw tower as a green circle
        ctx.fillStyle = "green";
        ctx.fillRect(this.x-7, this.y, this.width, this.height);
        ctx.fill();
        
        // Draw health bar
        const healthPercent = this.health / this.maxHealth;
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 7, this.width, 5);
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 7, this.width * healthPercent, 5);

        super.draw(ctx);
    }

}