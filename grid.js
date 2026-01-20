const COLS = 9; // number of columns in the grid
const ROWS = 5; // number of rows in the grid
const WIDTH = 100; // width of each cell
const HEIGHT = 100; // height of each cell

class Grid {

    constructor() {
        this.grid = new Array(ROWS).fill().map(() => Array(COLS).fill(null))
        console.log(this.grid);
    }

    draw(ctx) {
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
        return true;
    }



}


