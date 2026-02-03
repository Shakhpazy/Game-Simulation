class TowerManager {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.selectedTowerType = null;
        this.towers = new Set(["Ally1"]);
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
        if (this.selectedTowerType === 'Ally1') {
            tower = new Ally1(col * 100 + 10, row * 100 + 10, this.gameEngine);
        }
        // Add more tower types here as needed

        this.gameEngine.grid.grid[row][col] = tower;
        this.gameEngine.addEntity(tower);
        this.selectedTowerType = null;
        this.gameEngine.selectedButton = null;
        return true;
    }

}