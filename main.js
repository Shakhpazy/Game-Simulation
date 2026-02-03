const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload('./Sprites/ZombieWalking.png');
ASSET_MANAGER.queueDownload('./Sprites/ZombieEatHealthy.png');
ASSET_MANAGER.queueDownload('./Sprites/Shuriken.png');
ASSET_MANAGER.queueDownload('./Sprites/IchigoIdle.png');
ASSET_MANAGER.queueDownload('./Sprites/IchigoAttack.jpg');
ASSET_MANAGER.queueDownload('./Sprites/IchigoSlash.png');


ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);

	const shovel = new Button(gameEngine, "Shovel", 0, 0, 510, (button) => {
		// This is the custom logic that runs when the button is clicked
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Shovel'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
	});

	const allyone = new Button(gameEngine, "Ally1", 25, 103, 510, (button) => {
		// This is the custom logic that runs when the button is clicked
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally1'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
	});

	gameEngine.addEntity(allyone);
	gameEngine.addEntity(shovel);



	gameEngine.start();
});
