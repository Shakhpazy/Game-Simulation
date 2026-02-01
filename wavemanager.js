class WaveManager {

    constructor(gameEngine) {
        this.gameEngine = gameEngine

        this.debug = true;
        this.currentround = 1; // Changed from 0
        this.minZombiesPerRound = 3;
        this.zombiesPerRound = Math.ceil(this.currentround * this.minZombiesPerRound);
        this.activeRows = [2];
        this.activeZombies = new Set();
        this.roundStarted = false;

        this.openedrows1 = false;
        this.openedrows2 = false;

        //to start the round
        this.spawnZombies();
    }

    /**
     * this can later be abstracted to its own class 
     * (factory design patter [single class to generate zombies] 
     * or we can leave it idk)
     */
    spawnZombies() {
        for (let i = 0; i < this.zombiesPerRound; i++) {
            setTimeout(() => {
                const spawnRow = this.activeRows[Math.floor(Math.random() * this.activeRows.length)]
                const zombie = new Zombie(spawnRow, this.gameEngine);
                zombie.initialize((z) => this.activeZombies.delete(z));
                this.activeZombies.add(zombie);
                this.gameEngine.addEntity(zombie);
            }, i * 3000);
        }
        this.roundStarted = true;
    }

    update() {
        if (this.activeZombies.size === 0 && this.roundStarted) {
            this.currentround += 1;
            this.zombiesPerRound = Math.ceil(this.currentround * this.minZombiesPerRound);
            this.roundStarted = false;
            this.spawnZombies();
        }
        if (this.currentround === 2 && !this.openedrows1) {
            this.activeRows.push(1,3);
            this.gameEngine.grid.activeRows = this.activeRows
            this.openedrows1 = true;
        }
        if (this.currentround === 4 && !this.openedrows2) {
            this.activeRows.push(0,4);
            this.gameEngine.grid.activeRows = this.activeRows
            this.openedrows2 = true;

        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        
        const padding = 10;
        const bottomRightX = ctx.canvas.width - padding;
        const bottomRightY = ctx.canvas.height - padding;
        
        ctx.fillText(`Round: ${this.currentround}`, bottomRightX, bottomRightY - 60);
        ctx.fillText(`Zombies: ${this.activeZombies.size}/${this.zombiesPerRound}`, bottomRightX, bottomRightY - 40);
        ctx.fillText(`Zombies Per Round: ${this.zombiesPerRound}`, bottomRightX, bottomRightY - 20);
    }

}