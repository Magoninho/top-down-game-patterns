import Camera from "./Camera.js";
import Player from "./Entities/Player.js";
import World from "./World.js";

export default class Game {
	private ctx: CanvasRenderingContext2D;
	public static WIDTH: number = document.getElementById("game-canvas").clientWidth;
	public static HEIGHT: number = document.getElementById("game-canvas").clientHeight;
	private world: World = new World();
	private player: Player = new Player(this, 0, 0);

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
		// Temporary, just to move the camera around the world
		Camera.x += 2;
		Camera.y = 0;

		// World size in pixels
		// TODO : remove from update
		let worldSize = World.WORLD_SIZE*World.tilesize*2;

		// Camera clamping
		Camera.y = Math.max(Camera.y, 0);
		Camera.x = Math.max(Camera.x, 0);

		// you must divide by the scale because the width, IN RELATION WITH THE SCALED WORLD, has DECREASED the amount of the scale
		// e.g. scale = 2; width / 2
		// 		scale = 3; width / 3
		//		...
		// That was the best explanation I could give in a comment, feel free to change it with a pull request :D
		Camera.x = Math.min(Camera.x, worldSize-Game.WIDTH);
		Camera.y = Math.min(Camera.y, worldSize-Game.HEIGHT);

		
	}


	public render(ctx: CanvasRenderingContext2D): void {
		this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);

		// Rendering all 4 layers that comes before the player
		for (let l = 0; l <= 4; l++) {
			this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
			
		}

		
		// the last layer is where we have solid tiles
		// TODO: figure that out later
		this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
		this.player.render(ctx);
		
		this.ctx.fillStyle = "red";
		this.ctx.font = "48px sans"
		this.ctx.fillText(`${Camera.x}`, 40, 40)
	}
}