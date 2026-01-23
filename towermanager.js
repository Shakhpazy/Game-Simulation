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

        if (this.gameEngine.grid.grid[row][col] !== null) {
            console.log("Cell is already occupied");
            return false;
        }
        const tower = new Ally1(col * 100 + 10, row * 100 + 10, this.gameEngine);
        this.gameEngine.grid.grid[row][col] = tower;
        this.gameEngine.addEntity(tower)
        return true;
    }

}