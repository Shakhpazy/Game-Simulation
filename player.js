class Player {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.points = 3;
        if(gameManager.debugMode) {
            this.points = 30000;
        }
        this.passiveRate = 0.5; // points per second
        this.killPoints = 2; // points per kill
        this.passiveTime = 0;
        this.maxhealth = 200;
        this.health = this.maxhealth;
        this.highscore = 0;
        this.currentScore = 0;
    }

    reset() {
        this.points = gameManager.debugMode ? 30000 : 3;
        this.currentScore = 0;
        this.health = this.maxhealth;
        this.passiveTime = 0;
    }

    getPoints() {
        return this.points;
    }

    update() {
        if(this.health <= 0) {
            this.gameEngine.gameManager.playing = false;
        }
    }

    updatePoints(timer, killedEnemy,deduction) {
        this.passiveTime += timer;
        if (this.passiveTime >= 1) {
            this.points += this.passiveRate;
            this.passiveTime = 0;
            this.currentScore += 1;
        }
        
        //Change points earned for stronger enemies
        if (killedEnemy) {
            this.points += this.killPoints;
            this.currentScore += 10;
        }
        if(deduction > 0) {
            this.points -= deduction;
        }
    }

    addPoints(amount) {
        this.points += amount;
        this.currentScore += amount;
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";


        ctx.fillText(`High Score: ${this.highscore}`, 1580, 100);


        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        
        const padding = 10;

        // --- DRAW HEALTH BAR (Bottom Center) ---
        const barWidth = 1000;
        const barHeight = 35;
        const x = (1600 / 2) - (barWidth / 2); // Center of screen
        const y = 880 - padding - barHeight;

        // 1. Bar Background (Empty State)
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)"; // Semi-transparent black
        ctx.fillRect(x, y, barWidth, barHeight);

        // 2. Bar Fill
        const healthPercent = Math.max(0, this.health / this.maxhealth);
        
        // Color logic: Green -> Yellow -> Red
        if (healthPercent > 0.5) {
            ctx.fillStyle = "#2ecc71"; // Green
        } else if (healthPercent > 0.25) {
            ctx.fillStyle = "#f1c40f"; // Yellow
        } else {
            ctx.fillStyle = "#e74c3c"; // Red
        }

        ctx.fillRect(x, y, barWidth * healthPercent, barHeight);

        // 3. Bar Border
        ctx.strokeStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, barWidth, barHeight);

        // 4. Health Text (Optional: 150/200)
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            Math.ceil(this.health) + " / " + this.maxhealth, 
            x + barWidth / 2, 
            y + barHeight / 2
        );
    }

}