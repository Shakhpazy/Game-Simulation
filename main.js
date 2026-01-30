const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const grid = new Grid();
ASSET_MANAGER.queueDownload("./sprites/zombie.gif");
ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	const t = new Tungtungsahur(10, 10, 0, 0)
	const z = new Zombie(900, 12, 0)
	gameEngine.init(ctx);

	gameEngine.addEntity(t)
	gameEngine.addEntity(z)

	gameEngine.start();
});
