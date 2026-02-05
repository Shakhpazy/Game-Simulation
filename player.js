class Player {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.points = 3;
        this.passiveRate = 0.5; // points per second
        this.killPoints = 2; // points per kill
        this.passiveTime = 0;
    }


    getPoints() {
        return this.points;
    }

    updatePoints(timer, killedEnemy,deduction) {
        this.passiveTime += timer;
        if (this.passiveTime >= 1) {
            this.points += this.passiveRate;
            this.passiveTime = 0;
        }
        if (killedEnemy) {
            this.points += this.killPoints;
        }
        if(deduction > 0) {
            this.points -= deduction;
        }
    }

    draw(ctx) {

        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        
        const padding = 10;
        const bottomLeftX = 150;
        const bottomLeftY = ctx.canvas.height - padding;

        ctx.fillText("Points: " + this.points, bottomLeftX, bottomLeftY);
    }

}