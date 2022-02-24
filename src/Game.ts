import Camera from "./Camera.js";
import Player from "./Entities/Player.js";
import InputHandler from "./InputHandler.js";
import World from "./World.js";

export default class Game {
	public ctx: CanvasRenderingContext2D;
	public static WIDTH: number = document.getElementById("game-canvas").clientWidth;
	public static HEIGHT: number = document.getElementById("game-canvas").clientHeight;
	public world: World = new World();
	public player: Player = new Player(this, 0, 0);
	public inputHandler: InputHandler = new InputHandler();
	public camera: Camera = new Camera();

	constructor(ctx) {
		this.ctx = ctx;
		this.ctx.imageSmoothingEnabled = false;
	}

	/**
	 * This function will load assets and start the game
	 */
	public async start() {
		await this.world.init(); // loading world
		await this.player.init();

		this.camera.follow(this.player);
		this.run();
	}

	// game loop function with delta time
	public run(): void {

		this.update();
		this.render(this.ctx);

		// Request to do this again ASAP
		requestAnimationFrame(this.run.bind(this));
	}

	public update(): void {
		this.player.update();
		this.camera.update();
	}


	public render(ctx: CanvasRenderingContext2D): void {
		this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);

		// Rendering all 4 layers that comes before the player
		for (let l = 0; l <= 4; l++) {
			this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
			
		}

		// Rendering the player between layers
		this.player.render(ctx);

		// This layer has things that will be over the player (e.g. the flag)
		this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
	}
}