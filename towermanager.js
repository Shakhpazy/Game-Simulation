class TowerManager {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.selectedTowerType = null;
        this.towers = new Set(["Goku", "Ichigo", "Naruto"]); 
    }

    selectTower(towerType) {
        this.selectedTowerType = towerType;
    }

    placeTower(row, col) {
        if (!this.selectedTowerType) return false;

        if (this.selectedTowerType === 'Shovel') {
            // Remove tower logic
            const existingTower = this.gameEngine.grid.grid[row][col];
            if (existingTower && !(existingTower instanceof Tower)) {
                this.gameEngine.grid.grid[row][col] = null;
                existingTower.remove();
                this.selectedTowerType = null;
                this.gameEngine.selectedButton = null;
                this.gameEngine.player.updatePoints(existingTower.cost/2, true, 0); // Refund points when selling tower
                return true;
            } else {
                this.selectedTowerType = null;
                this.gameEngine.selectedButton = null;
                return false;
            }
        }

        if (this.gameEngine.grid.grid[row][col] !== null) {
            console.log("Cell is already occupied");
            return false;
        }

        let tower;
        let bought = false
        
        const x = XSTART + col * WIDTH + 10;
        const y = YSTART + row * HEIGHT + 10;

        if (this.selectedTowerType === 'Goku') {
            tower = new Ally1(x, y, row, col, this.gameEngine);
            bought = this.gameEngine.player.points >= tower.cost ? true : false;
        }
        if (this.selectedTowerType === 'Ichigo') {
            tower = new Ally2(x, y, row, col, this.gameEngine);
            bought = this.gameEngine.player.points >= tower.cost ? true : false;
        }
        if (this.selectedTowerType === 'Naruto') {
            tower = new Ally3(x, y, row, col, this.gameEngine);
            bought = this.gameEngine.player.points >= tower.cost ? true : false;
        }
        // Add more tower types here as needed

        // if we dont have enough money so we cant place it
        if (!bought) {
            return false;
        }
        this.gameEngine.player.updatePoints(0, false, tower.cost); // Deduct points when placing tower
        this.gameEngine.grid.grid[row][col] = tower;
        this.gameEngine.addEntity(tower);
        this.selectedTowerType = null;
        this.gameEngine.selectedButton = null;
        return true;
    }

}