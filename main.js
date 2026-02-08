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
ASSET_MANAGER.queueDownload('./Sprites/gojoIdle.png');
ASSET_MANAGER.queueDownload('./Sprites/gojoBlast.png');
ASSET_MANAGER.queueDownload('./Sprites/gojoAttack.png');
ASSET_MANAGER.queueDownload('./Sprites/gojoStart.png');
ASSET_MANAGER.queueDownload('./Sprites/gojoEnd.png');
ASSET_MANAGER.queueDownload('./Sprites/empty.png');
ASSET_MANAGER.queueDownload('./Sprites/goku.png');
ASSET_MANAGER.queueDownload('./Sprites/naruto.png');
ASSET_MANAGER.queueDownload('./Sprites/ichigo.png');
ASSET_MANAGER.queueDownload('./Sprites/shovel.png');




ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	gameEngine.init(ctx);


	
	gameEngine.start();
});
