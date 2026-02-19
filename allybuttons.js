class allyButtons {

    constructor(gameEngine) {
        this.gameEngine = gameEngine;
		this.allyoneBgImage = ASSET_MANAGER.getAsset('./Sprites/goku.png')
		this.allytwoBgImage = ASSET_MANAGER.getAsset('./Sprites/ichigo.png')
		this.allythreeBgImage = ASSET_MANAGER.getAsset('./Sprites/naruto.png')
		this.shovelBgImage = ASSET_MANAGER.getAsset('./Sprites/shovel.png')
        this.shovel = new AllyButton(gameEngine, "Shovel", 0, 420, 0, (button) => {
        	console.log("shovel 1 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Shovel'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        }, this.shovelBgImage, 0);

        this.allyone = new AllyButton(gameEngine, "Goku", 30, 300, 0, (button) => {
        	console.log("ally 1 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Goku'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        }, this.allyoneBgImage, 10);
        this.allytwo = new AllyButton(gameEngine, "Ichigo", 5, 60, 0,(button) => {
        	console.log("ally 2 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ichigo'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        }, this.allytwoBgImage, 1);
        
        this.allythree = new AllyButton(gameEngine, "Naruto", 15, 180, 0, (button) => {
        	console.log("ally 3 button clicked");
        	gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Naruto'; 
        	button.gameEngine.selectedButton = button;
        	button.gameEngine.click = null;
        	console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
        	// Money check happens later when placing on grid, not here
        }, this.allythreeBgImage, 5);
		

        gameEngine.addEntity(this.allyone);
        gameEngine.addEntity(this.allytwo);
        gameEngine.addEntity(this.allythree);
        gameEngine.addEntity(this.shovel);
    }

    

}