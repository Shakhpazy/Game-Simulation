class allyButtons {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.shovel = new AllyButton(gameEngine, "Shovel", 0, 315, 0, (button) => {
        	console.log("shovel 1 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Shovel'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        });

        this.allyone = new AllyButton(gameEngine, "Goku", 15, 0, 0, (button) => {
        	console.log("ally 1 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Goku'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        });

        this.allytwo = new AllyButton(gameEngine, "Ichigo", 5, 105, 0,(button) => {
        	console.log("ally 2 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ichigo'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        });
        
        this.allythree = new AllyButton(gameEngine, "Naruto", 10, 210, 0, (button) => {
        	console.log("ally 3 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Naruto'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        });

        gameEngine.addEntity(this.allyone);
        gameEngine.addEntity(this.allytwo);
        gameEngine.addEntity(this.allythree);
        gameEngine.addEntity(this.shovel);
    }

    

}