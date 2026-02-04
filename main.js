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



ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);

	const shovel = new Button(gameEngine, "Shovel", 0, 500, 500, (button) => {
		// This is the custom logic that runs when the button is clicked
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Shovel'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
	});


	const allyone = new Button(gameEngine, "Ally1", 5, 0, 500, (button) => {
		// This is the custom logic that runs when the button is clicked
		console.log("ally 1 button clicked");
		if(gameEngine.player.getPoints() >= 1) {
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally1'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		} else { 
			console.log("get more points bum");
		}
	});
	const allytwo = new Button(gameEngine, "Ally2", 5, 150, 500,(button) => {
		// This is the custom logic that runs when the button is clicked
		console.log("ally 2 button clicked");
		if(gameEngine.player.getPoints() >= 1) {
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally2'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		} else { 
			console.log("get more points bum");
		}
	});
	const allythree = new Button(gameEngine, "Ally3", 5, 300, 500, (button) => {
		// This is the custom logic that runs when the button is clicked
		console.log("ally 3 button clicked");
		if(gameEngine.player.getPoints() >= 1) {
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally3'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		} else { 
			console.log("get more points bum");
		}
	});

	gameEngine.addEntity(allyone);
	gameEngine.addEntity(allytwo);
	gameEngine.addEntity(allythree);
	gameEngine.addEntity(shovel);


	
	gameEngine.start();
});
