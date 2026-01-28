const COLS = 9; // number of columns in the grid
const ROWS = 5; // number of rows in the grid
const WIDTH = 100; // width of each cell
const HEIGHT = 100; // height of each cell

class Grid {

    constructor(gameEngine) {
        this.grid = new Array(ROWS).fill().map(() => Array(COLS).fill(null));
        this.gameEngine = gameEngine;
        this.activeRows = [2];
        console.log(this.grid);
    }

    pixelToCell(x, y) {
        const row = Math.trunc(y / HEIGHT);
        const col = Math.trunc(x / WIDTH);
    
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null;
        return [row, col];
    }
    
    getCellHover() {
        if (!this.gameEngine.mouse) return null;
        return this.pixelToCell(this.gameEngine.mouse.x, this.gameEngine.mouse.y);
    }
    
    getCellClicked() {
        if (!this.gameEngine.click) return null;
        return this.pixelToCell(this.gameEngine.click.x, this.gameEngine.click.y);
    }

    draw(ctx) {
        const mouseOver = this.getCellHover()
        const mouseClicked = this.getCellClicked()

        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        
        // Draw horizontal lines
        for (let row = 0; row <= ROWS; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * HEIGHT);
            ctx.lineTo(COLS * WIDTH, row * HEIGHT);
            ctx.stroke();
        }
        
        // Draw vertical lines
        for (let col = 0; col <= COLS; col++) {
            ctx.beginPath();
            ctx.moveTo(col * WIDTH, 0);
            ctx.lineTo(col * WIDTH, ROWS * HEIGHT);
            ctx.stroke();
        }
        
        if (mouseClicked) {
            const [row, col] = mouseClicked;
            if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
                this.gameEngine.towerManager.placeTower(row, col);
            }
            this.gameEngine.click = null
        }

        if (mouseOver) {
            const [row, col] = mouseOver;
            if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
                ctx.save();
                ctx.fillStyle = "purple";
                ctx.globalAlpha = 0.3;
                ctx.fillRect(col * WIDTH, row * HEIGHT, WIDTH, HEIGHT);
                ctx.restore();
            }
        }
    }





}


