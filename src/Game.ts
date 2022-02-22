import Camera from "./Camera.js";
import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";
import Tile from "./Tile/Tile.js";
import World from "./World.js";

export default class Game {
	private ctx: CanvasRenderingContext2D;
	private WIDTH: number = document.getElementById("game-canvas").clientWidth;
	private HEIGHT: number = document.getElementById("game-canvas").clientHeight;
	private world: World = new World();

	constructor(ctx) {
		this.ctx = ctx;
		this.ctx.imageSmoothingEnabled = false;
	}

	/**
	 * This function will load assets and start the game
	 */
	public async start() {
		await this.world.init(); // loading world
		console.log(World.WORLD_SIZE*this.world.tilesize)
		this.run();
	}

	// game loop function with delta time
	public run(): void {
		let then = Date.now();
		let FPS = 60;
		let now = Date.now();
		let delta = now - then;

		this.update(delta / 1000);
		this.render(this.ctx);

		then = now;

		// Request to do this again ASAP
		requestAnimationFrame(this.run.bind(this));
	}

	public update(deltaTime: number): void {
		Camera.x += 1.5;
		Camera.y += 0.5;

		let worldSize = World.WORLD_SIZE*this.world.tilesize;

		// Camera clamping
		Camera.y = Math.max(Camera.y, 0);
		Camera.x = Math.max(Camera.x, 0);

		Camera.x = Math.min(Camera.x, worldSize-this.WIDTH*0.5);
		Camera.y = Math.min(Camera.y, worldSize-this.HEIGHT*0.5);

		
	}
	public render(ctx: CanvasRenderingContext2D): void {
		// this.tempSpriteSheet.renderSpriteById(ctx, 884, 0, 0);
		this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT)
		for (let l = 0; l <= 4; l++) {
			this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
			
		}

		// TODO: render the player

		this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
		
		this.ctx.fillStyle = "red";
		this.ctx.font = "48px sans"
		this.ctx.fillText(`${Camera.x}`, 40, 40)
	}
}