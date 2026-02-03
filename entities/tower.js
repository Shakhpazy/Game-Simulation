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
            // change this image like a broken tower or something this needs to be done only 1 time tho
        }
    }

    draw(ctx) {
        // Draw tower body (keeps the existing visual)
        ctx.fillStyle = "green";
        ctx.fillRect(this.x - 7, this.y, this.width, this.height);

        // Big health bar at the bottom of the screen
        const healthPercent = Math.max(0, Math.min(1, this.health / this.maxHealth));
        const margin = 20;
        const barWidth = ctx.canvas.width - margin * 2;
        const barHeight = 24;
        const barX = margin;
        const barY = ctx.canvas.height - margin - barHeight;

        // Border/background
        ctx.fillStyle = "black";
        ctx.fillRect(barX - 2, barY - 2, barWidth + 4, barHeight + 4);

        // Empty (red) and filled (green) portions
        ctx.fillStyle = "red";
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = "green";
        ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);

        // Health text
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round(this.health)}/${this.maxHealth}`, barX + barWidth / 2, barY + barHeight / 2 + 6);

        super.draw(ctx);
    }

}