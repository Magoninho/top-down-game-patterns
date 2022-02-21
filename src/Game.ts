import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";
import World from "./World.js";

export default class Game {
	private ctx: CanvasRenderingContext2D;
	private SCALE = 3;
	private world: World = new World();

	constructor(ctx) {
		this.ctx = ctx;
		this.ctx.imageSmoothingEnabled = false;
	}

	/**
	 * This function will load assets and start the game
	 */
	public async start() {
		await this.world.init();

		// console.log(this.world.getTileID(0, 30, 30));
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

	}
	public render(ctx: CanvasRenderingContext2D): void {
		// this.tempSpriteSheet.renderSpriteById(ctx, 884, 0, 0);
		this.world.drawLayer(ctx, 0);
		this.world.drawLayer(ctx, 1);
		this.world.drawLayer(ctx, 2);
		this.world.drawLayer(ctx, 3);
		this.world.drawLayer(ctx, 4);

		// TODO: render the player

		this.world.drawLayer(ctx, 5);
	}
}