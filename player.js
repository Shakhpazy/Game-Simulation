class Player {

    constructor(gameEngine, tower) {
        this.gameEngine = gameEngine;
        this.money = 50;
        this.health = tower.health;
    }

    update() {
        if (this.health <= 0) {
            console.log("Game Over");
            this.gameEngine.stop();
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(`Money: $${this.money}`, 890, 535);
        ctx.fillText(`Health: ${this.health}`, 890, 560);
    }
}