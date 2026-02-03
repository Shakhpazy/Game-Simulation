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

}