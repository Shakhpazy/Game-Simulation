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

	const allyone = new Button(gameEngine, "Ally1", (button) => {
		// This is the custom logic that runs when the button is clicked
		console.log("Archer button clicked");
		if(gameEngine.player.getPoints() >= 5) {
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally1'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
		} else { 
			console.log("get more points bum");
		}
	});

	gameEngine.addEntity(allyone);



	gameEngine.start();
});
