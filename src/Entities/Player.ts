import Game from "../Game.js";
import ImageUtils from "../ImageUtils.js";
import World from "../World.js";
import Entity from "./Entity.js";

export default class Player extends Entity {

	private game: Game; // the game the player is on
	width: number = 16;
	height: number = 18;
	private frame: number = 0;
	private row: number = 3;

	constructor(game: Game, x: number, y: number) {
		super(x, y, World.tilesize, World.tilesize);
		this.game = game;
	}

	public async init(): Promise<void> {
		this.spritesheet = await ImageUtils.loadImageFromUrl("assets/gfx/Entity/player.png");
	}

	public update() {

	}

	public render(ctx: CanvasRenderingContext2D) {
		
		// a nice little way to make animations
		this.frame = (this.frame + 0.1) % 3;
		ctx.drawImage(
			this.spritesheet,
			Math.floor(this.frame)*this.width,
			this.row*this.height,
			this.width, 
			this.height,
			(this.x * World.SCALE) + Game.WIDTH/2,
			(this.y * World.SCALE) + Game.HEIGHT/2,
			this.width * World.SCALE,
			this.height * World.SCALE
		)
	}
}