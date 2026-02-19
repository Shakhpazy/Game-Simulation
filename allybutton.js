class AllyButton {

    constructor(gameEngine, label, price, x, y, onClick, bgImageSrc, round) {
        this.gameEngine = gameEngine;
        this.label = label;
        this.price = price;
        this.onClick = onClick;
        this.width = 100;
        this.height = 100;
        this.round = round;
        this.x = x; 
        this.y = y;
        this.selected = false;
        this.bgImage = bgImageSrc;
        
    }


    update() {
        if (this.gameEngine.click && this.gameEngine.currentRound >= this.round) {
            const mouseX = this.gameEngine.click.x;
            const mouseY = this.gameEngine.click.y;

            if (mouseX >= this.x && mouseX <= this.x + this.width &&
                mouseY >= this.y && mouseY <= this.y + this.height) {
                if(this.selected) {
                    this.gameEngine.selectedButton = null;
                    this.selected = !this.selected;
                    this.gameEngine.towerManager.selectedTowerType = null;
                } else {
                    this.onClick(this);
                }
                
                this.gameEngine.click = null; // Reset click to avoid multiple triggers
            }
        }
        // Ensure only the globally selected button is highlighted
        this.selected = this.gameEngine.selectedButton === this;


        if(this.selected) {
            for (let i = 0; i < this.gameEngine.grid.length; i++) {
                for (let j = 0; j < this.gameEngine.grid[i].length; j++) {
                    if(this.gameEngine.grid[i][j] == null) {
                        this.gameEngine.grid[i][j] = this.label;
                    } 
                }
            }
        }
    }

    draw(ctx) {
        
        if(this.gameEngine.currentRound < this.round){
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`Round ${this.round}`, this.x + this.width / 2, this.y + this.height / 2);
        } else {
            ctx.drawImage(this.bgImage, this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`$${this.price}`, this.x + this.width / 2, this.y + this.height - 10);
        }
        if (this.selected) {
            ctx.strokeStyle = 'yellow';
            ctx.lineWidth = 3;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

}