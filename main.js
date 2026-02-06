const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('./Sprites/ZombieWalking.png');
ASSET_MANAGER.queueDownload('./Sprites/ZombieEatHealthy.png');
ASSET_MANAGER.queueDownload('./Sprites/Shuriken.png');
ASSET_MANAGER.queueDownload('./Sprites/IchigoIdle.png');
ASSET_MANAGER.queueDownload('./Sprites/IchigoAttack.jpg');
ASSET_MANAGER.queueDownload('./Sprites/IchigoSlash.png');
ASSET_MANAGER.queueDownload('./Sprites/NarutoAttack.png');
ASSET_MANAGER.queueDownload('./Sprites/NarutoIdle.png');
ASSET_MANAGER.queueDownload('./Sprites/gokuIdle.png');
ASSET_MANAGER.queueDownload('./Sprites/gokuBlast.png');
ASSET_MANAGER.queueDownload('./Sprites/gokuAttack1.png');
ASSET_MANAGER.queueDownload('./Sprites/gokuAttack2.png');
ASSET_MANAGER.queueDownload('./Sprites/grid.png');



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);

	const shovel = new Button(gameEngine, "Shovel", 0, 500, 650, (button) => {
		console.log("shovel 1 button clicked");
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Shovel'; 
		button.gameEngine.selectedButton = button;
		button.gameEngine.click = null;
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
	});


	const allyone = new Button(gameEngine, "Ally1", 15, 0, 650, (button) => {
		console.log("ally 1 button clicked");
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally1'; 
		button.gameEngine.selectedButton = button;
		button.gameEngine.click = null;
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		// Money check happens later when placing on grid, not here
	});
	const allytwo = new Button(gameEngine, "Ally2", 5, 150, 650,(button) => {
		console.log("ally 2 button clicked");
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally2'; 
		button.gameEngine.selectedButton = button;
		button.gameEngine.click = null;
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		// Money check happens later when placing on grid, not here
	});
	const allythree = new Button(gameEngine, "Ally3", 10, 300, 650, (button) => {
		console.log("ally 3 button clicked");
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally3'; 
		button.gameEngine.selectedButton = button;
		button.gameEngine.click = null;
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		// Money check happens later when placing on grid, not here
	});

	gameEngine.addEntity(allyone);
	gameEngine.addEntity(allytwo);
	gameEngine.addEntity(allythree);
	gameEngine.addEntity(shovel);


	
	gameEngine.start();
});
