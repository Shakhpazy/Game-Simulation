class WaveManager {

    constructor(gameEngine, gamemode, difficulty) {
        this.gameEngine = gameEngine

        this.debug = true;
        this.currentround = 1; // Changed from 0
        this.gamemode = gamemode;
        this.difficulty = difficulty;
        this.minZombiesPerRound = this.difficulty === "default" ? 4 : 6; // Adjust based on difficulty
        this.zombiesPerRound = Math.ceil(this.currentround * this.minZombiesPerRound);
        this.activeRows = [2];
        this.activeZombies = new Set();
        this.roundStarted = false;
        this.zombiesRemaining = this.zombiesPerRound;
        this.inRoundTransition = false;
        this.roundTransitionTime = 0;
        this.baseHealth = this.difficulty === "default" ? 110 : 170; // Adjust based on difficulty
        // track spawn timers so we can cancel them when the game ends
        this.spawnTimers = [];
        this.stopped = false;

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
        // reset spawn timers and stopped flag for a fresh round
        this.spawnTimers = [];
        this.stopped = false;
        for (let i = 0; i < this.zombiesPerRound; i++) {
            const t = setTimeout(() => {
                if (this.stopped) return; // don't spawn after we've been stopped
                const spawnRow = this.activeRows[Math.floor(Math.random() * this.activeRows.length)]
                const zombie = new Zombie(spawnRow, this.gameEngine, this.baseHealth + (this.currentround) * 30);
                zombie.initialize((z) => {
                    this.activeZombies.delete(z);
                    if (this.zombiesRemaining > 0) {
                        this.zombiesRemaining--;
                    }
                });
                this.activeZombies.add(zombie);
                this.gameEngine.addEntity(zombie);
            }, i * 3000);
            this.spawnTimers.push(t);
        }
        this.roundStarted = true;
    }

    clearSpawns() {
        this.stopped = true;
        if (this.spawnTimers && this.spawnTimers.length) {
            this.spawnTimers.forEach(t => clearTimeout(t));
            this.spawnTimers = [];
        }
    }

    update() {
        // Handle round transition banner timing (no gameplay pause)
        if (this.inRoundTransition) {
            this.roundTransitionTime += this.gameEngine.clockTick;
            if (this.roundTransitionTime >= 2) { // show text for 2 seconds
                this.inRoundTransition = false;
                this.roundTransitionTime = 0;
            }
        }

        // When all scheduled zombies for this round have been removed,
        // advance to the next round and trigger the banner.
        if (this.zombiesRemaining === 0 && this.roundStarted && !this.inRoundTransition) {
            // grant smaller bonus for surviving the *previous* round
            this.gameEngine.player.addPoints(2 + 2 * this.currentround);
            this.currentround += 1;
            
            this.zombiesPerRound = Math.ceil(this.currentround * this.minZombiesPerRound);
            this.zombiesRemaining = this.zombiesPerRound;
            this.roundStarted = false;

            // Immediately start next wave, but briefly show the round text
            this.inRoundTransition = true;
            this.roundTransitionTime = 0;
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
        if(this.currentround === 10 && this.gamemode !== "infinite") {
            this.gameEngine.player.health = 0;
            this.gameEngine.gamemanager.hasWon = true;
        }
    }

    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "right";


        ctx.fillText(`Current Points: ${Math.floor(this.gameEngine.player.getPoints())}`, 1580, 20);
        ctx.fillText(`Round: ${this.currentround}`, 1580, 40);
        ctx.fillText(`Zombies Left: ${this.zombiesRemaining}`, 1580, 60);
        ctx.fillText(`Zombies Per Round: ${this.zombiesPerRound}`, 1580, 80);
    }

}