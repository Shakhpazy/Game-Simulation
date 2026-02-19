class gameManager {
    static debugMode = false;
    constructor(gameEngine) {
        this.playing = false;
        this.gameEngine = gameEngine;
        this.gamemode = "infinite"; 
        this.difficulty = "default"; 
        
    }

    startGame() {
        this.gameEngine.needreset = false;

        this.gameEngine.player.reset();

        this.gameEngine.towerManager = new TowerManager(this.gameEngine);
        this.gameEngine.grid = new Grid(this.gameEngine);
        this.gameEngine.waveManager = new WaveManager(this.gameEngine, this.gamemode, this.difficulty);
        this.gameEngine.allybuttons = new allyButtons(this.gameEngine);

        this.gameEngine.addEntity(this.gameEngine.waveManager);
    }

    // --- REUSABLE BUTTON HELPER ---
    drawButton(ctx, x, y, width, height, label, colorConfig, onClick) {
        const mouse = this.gameEngine?.mouse;
        const click = this.gameEngine?.click;
        const radius = 12;

        // Hit test logic
        const isHovering = mouse && mouse.x >= x && mouse.x <= x + width && mouse.y >= y && mouse.y <= y + height;
        const isClicked = click && click.x >= x && click.x <= x + width && click.y >= y && click.y <= y + height;

        if (isHovering && this.gameEngine?.canvas) {
            this.gameEngine.canvas.style.cursor = 'pointer';
        }

        ctx.save();
        // Styles
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetY = 4;
        ctx.fillStyle = isHovering ? colorConfig.hover : colorConfig.idle;
        
        // Draw Shape
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius); // Modern browser shorthand
        ctx.fill();

        // Border
        ctx.shadowColor = 'transparent';
        ctx.strokeStyle = isHovering ? colorConfig.borderHover : colorConfig.border;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '22px Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, x + width / 2, y + height / 2);
        ctx.restore();

        if (isClicked) {
            onClick();
            this.gameEngine.click = null; 
        }
    }

    draw(ctx) {
        if (!this.playing) {
            // Reset cursor to default at the start of the frame
            if (this.gameEngine?.canvas) this.gameEngine.canvas.style.cursor = 'default';

            // START BUTTON (Green)
            this.drawButton(ctx, 20, 20, 220, 64, "Start Game", 
                { idle: '#2ecc71', hover: '#29c36a', border: '#27ae60', borderHover: '#1e8449' }, 
                () => {
                    this.playing = true;
                    this.startGame();
                }
            );

            // GAMEMODE BUTTON (Blue)
            const modeLabel = "Mode: " + this.gamemode.charAt(0).toUpperCase() + this.gamemode.slice(1);
            this.drawButton(ctx, 260, 20, 220, 64, modeLabel, 
                { idle: '#2980b9', hover: '#3498db', border: '#1c5980', borderHover: '#2980b9' }, 
                () => {
                    this.gamemode = (this.gamemode == "infinite") ? "rounds" : "infinite";
                }
            );

            // DIFFICULTY BUTTON (Dynamic Orange/Red)
            const isHard = this.difficulty === "hard";
            const diffLabel = "Diff: " + this.difficulty.charAt(0).toUpperCase() + this.difficulty.slice(1);
            const diffColors = isHard ? 
                { idle: '#c0392b', hover: '#e74c3c', border: '#962d22', borderHover: '#c0392b' } : 
                { idle: '#f39c12', hover: '#ffaf40', border: '#e67e22', borderHover: '#f39c12' };

            this.drawButton(ctx, 500, 20, 220, 64, diffLabel, diffColors, () => {
                this.difficulty = (this.difficulty == "default") ? "hard" : "default";
            });


            // DEBUG MODE (Purple)
            this.drawButton(ctx, 1300, 20, 220, 64, "DEBUG MODE: " + (gameManager.debugMode ? "ON" : "OFF"), 
                { idle: '#df75ff', hover: '#871dc5', border: '#c427a2', borderHover: '#460b61' }, 
                () => {
                    gameManager.debugMode = !gameManager.debugMode;
                    console.log("Debug Mode:", gameManager.debugMode);
                }
            );
        } else {
            // END GAME (Red)
            this.drawButton(ctx, 1100, 20, 220, 64, "END GAME: " , 
                { idle: '#ff0000', hover: '#7e0000', border: '#ff0000', borderHover: '#ff4d4d' }, 
                () => {
                    this.playing = false;
                    this.gameEngine.player.health = 0;
                }
            );
        }
    }

    update() {
        const player = this.gameEngine.player;

        if (this.playing && player.health <= 0) {
            player.highscore = Math.max(player.highscore, player.currentScore);
        }

        //Update logic here if needed
        if (this.gameEngine.player && this.gameEngine.player.health <= 0) {
            this.gameEngine.player.health = this.gameEngine.player.maxhealth;
            this.playing = false;
            this.gameEngine.needreset = true;
            console.log("is game playing: ", this.playing);
        }
    
    }
}