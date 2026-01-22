const COLS = 9; // number of columns in the grid
const ROWS = 5; // number of rows in the grid
const WIDTH = 100; // width of each cell
const HEIGHT = 100; // height of each cell

class Grid {

    constructor(game) {
        this.grid = new Array(ROWS).fill().map(() => Array(COLS).fill(null))
        this.game = game
        console.log(this.grid);
    }

    pixelToCell(x, y) {
        const row = Math.trunc(y / HEIGHT);
        const col = Math.trunc(x / WIDTH);
    
        if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return null;
        return [row, col];
    }
    
    getCellHover() {
        if (!this.game.mouse) return null;
        return this.pixelToCell(this.game.mouse.x, this.game.mouse.y);
    }
    
    getCellClicked() {
        if (!this.game.click) return null;
        return this.pixelToCell(this.game.click.x, this.game.click.y);
    }

    /**
     * Places an entity in the grid at the given row and column.
     * 
     * @param {*} entity the different allies that can be placed in the grid
     * @param {*} row 
     * @param {*} col 
     * @returns {boolean} true if the entity was placed, false if the cell is already occupied
     */
    placeEntity(entity, row, col) {
        if (this.grid[row][col] !== null) {
            console.log("Cell is already occupied");
            return false;
        }
        this.grid[row][col] = entity;
        this.game.addEntity(entity)
        return true;
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
            console.log(mouseClicked)
            const [row, col] = mouseClicked;
            if (row >= 0 && row < ROWS && col >= 0 && col < COLS) {
                if (this.game.selectedTowerType === 'Ally1') {
                    const ally = new Ally1(col * 100 + 10, row * 100 + 10, row, col, this.game);
                    this.placeEntity(ally, row, col);
                }
            }
            this.game.click = null
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


