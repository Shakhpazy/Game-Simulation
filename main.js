const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	const t = new Ally1(10, 10, gameEngine)
	const z = new Zombie(0, gameEngine)
	gameEngine.init(ctx);

	gameEngine.addEntity(t)
	gameEngine.addEntity(z)
	gameEngine

	const archerButton = new Button(gameEngine, "Ally1", (button) => {
		// This is the custom logic that runs when the button is clicked
		console.log("Archer button clicked");
		gameEngine.towerManager.selectedTowerType = button.selected ? null : 'Ally1'; 
		console.log("Selected Tower Type:", gameEngine.towerManager.selectedTowerType);
	});

	gameEngine.addEntity(archerButton);



	gameEngine.start();
});
