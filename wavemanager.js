class WaveManager {

    constructor(gameEngine) {
        this.gameEngine = gameEngine

        this.debug = true;
        this.currentround = 1;
        this.minZombiesPerRound = 3;
        this.zombiesPerRound = Math.ceil(this.currentround * this.minZombiesPerRound)
        this.spawnRow = 2 // this needs to change later to make zombies spawn from 0-4 rows
        this.activeZombies = new Set();
    }

    /**
     * this can later be abstracted to its own class 
     * (factory design patter [single class to generate zombies] 
     * or we can leave it idk)
     */
    spawnZombies() {
        for (let i = 0; i < this.zombiesPerRound; i++) {
            setTimeout(() => {
                const zombie = new Zombie(this.spawnRow, this.gameEngine);
                zombie.initialize((z) => this.activeZombies.delete(z));
                this.activeZombies.add(zombie);
                this.gameEngine.addEntity(zombie);
                console.log(`Spawned zombie ${i + 1}. Count: ${this.activeZombies.size}`);
            }, i * 3000); // Spawn each zombie 1 second apart
        }
    }

    update() {
        if (this.activeZombies.size === 0) {
            this.spawnZombies()
        }
    }

    draw(ctx) {
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";
        
        const padding = 10;
        const bottomRightX = ctx.canvas.width - padding;
        const bottomRightY = ctx.canvas.height - padding;
        
        ctx.fillText(`Round: ${this.currentround}`, bottomRightX, bottomRightY - 20);
        ctx.fillText(`Zombies: ${this.activeZombies.size}`, bottomRightX, bottomRightY);
    }

}