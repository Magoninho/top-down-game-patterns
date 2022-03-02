import Camera from "../Camera.js";
import Game from "../Game.js";
import ImageUtils from "../ImageUtils.js";
import Rectangle from "../Math/Rectangle.js";
import World from "../World.js";
import Entity from "./Entity.js";

export default class Player extends Entity {

	// player's sprite width and height
	protected width: number = 16;
	protected height: number = 18;

	// player's speed, depends on the world scale
	// for example, if the scale is 2, the speed must be twice as fast to compensate
	private static speed: number = 1.4 * World.SCALE;
	
	// player's directions
	private dx: number = 0;
	private dy: number = 0;

	// animation variables
	// the current frame
	private frame: number = 0;
	// the animation row in the player's spritesheet (0: down; 1: up; 2: left; 3: right)
	private row: number = 0;

	constructor(game: Game, x: number, y: number) {
		super(game, x, y);
	}

	public async init(): Promise<void> {
		this.spritesheet = await ImageUtils.loadImageFromUrl("assets/gfx/Entity/player.png");
		Game.progressBar.addProgress(200/3);
		// positioning the player in some nice place
		this.x = World.WORLD_WIDTH / 4;
		this.y = World.WORLD_HEIGHT - 500;
	}

	public collide(dirx, diry) {

		// the acceleration in both axis
		let xa = dirx * Player.speed;
		let ya = diry * Player.speed;


		// Collision box setup
		// we are not going to make the entire player be collidable, just a piece of it
		let offsetx = 4 * World.SCALE;
		let offsety = 9 * World.SCALE;

		let box_x = this.x + offsetx;
		let box_y = this.y + offsety;
		let box_width = this.width / 2;
		let box_height = this.height / 2;

		// the next position the player will be
		let nextX = box_x + xa;
		let nextY = box_y + ya;

		// Now checking if there are collisions in the next position in all corners of the square
		// Top left
		let topLeftX: number = nextX;
		let topLeftY: number = nextY;

		// Top right
		let topRightX: number = (nextX + box_width * World.SCALE);
		let topRightY: number = nextY;

		// Bottom left
		let bottomLeftX: number = nextX;
		let bottomLeftY: number = (nextY + box_height * World.SCALE);

		// Bottom right
		let bottomRightX: number = (nextX + box_width * World.SCALE);
		let bottomRightY: number = (nextY + box_height * World.SCALE);

		// checking collisions in all the 4 corners of the player's collision box
		let collision: boolean = this.world.isSolidTileAt(topLeftX, topLeftY) ||
			this.world.isSolidTileAt(topRightX, topRightY) ||
			this.world.isSolidTileAt(bottomLeftX, bottomLeftY) ||
			this.world.isSolidTileAt(bottomRightX, bottomRightY);
		return collision;
	}

	public move(dirx: number, diry: number) {

		// a nice little way to make animations
		this.frame = (this.frame + 0.1) % 3;

		// Velocity vector
		// if player is swimming, then the speed will be divided by 2 (multiplied by 0.5, same thing)
		let vx = this.isSwimming() ? dirx * Player.speed * 0.5 : dirx * Player.speed;
		let vy = this.isSwimming() ? diry * Player.speed * 0.5 : diry * Player.speed;

		// This fixes the problem of faster diagonals
		// Better explanation later...
		if (dirx != 0 && diry != 0) {
			vx /= 1.414;
			vy /= 1.414;
		}


		// adding the velocity vector to player's position
		// to avoid sticking in walls, we check collisions in axis separately
		if (!this.collide(dirx, 0))
			this.x += vx;
		if (!this.collide(0, diry))
			this.y += vy;


		// Clamping player position
		if (this.x < 0) {
			this.x = 0;
		}
		if (this.x > World.WORLD_WIDTH - this.width * World.SCALE) {
			this.x = World.WORLD_WIDTH - this.width * World.SCALE;
		}
		if (this.y < 0) {
			this.y = 0;
		}
		if (this.y > World.WORLD_HEIGHT - this.height * World.SCALE) {
			this.y = World.WORLD_HEIGHT - this.height * World.SCALE;
		}
	}

	public update() {
		// storing the player's old position (before moving)
		let playerOldX = this.x;
		let playerOldY = this.y;

		// reset the directions so the player don't stay moving forever
		this.dx = 0;
		this.dy = 0;

		// changing directions and changing row animation
		// "assets/gfx/Entity/player.png" to see rows
		if (this.game.inputHandler.isDown(37)) { // left
			this.dx = -1;

			this.row = 2;
		}
		if (this.game.inputHandler.isDown(38)) { // up
			this.dy = -1;

			this.row = 1;
		}
		if (this.game.inputHandler.isDown(39)) { // right
			this.dx = 1;

			this.row = 3
		}
		if (this.game.inputHandler.isDown(40)) { // down
			this.dy = 1;

			this.row = 0;
		}

		this.move(this.dx, this.dy);


		// storing player's new position (after moving)
		let playerNewX = this.x;
		let playerNewY = this.y;

		// Checking if the player stoped by checking if the difference from its new and old position is 0
		// which means there was no movement
		if (playerNewY - playerOldY == 0 && playerNewX - playerOldX == 0) {
			this.frame = 0; // sets the frame to the first of the selected row animation
		}
	}

	public render(ctx: CanvasRenderingContext2D) {
		// Flooring the frame counter to turn it into an index
		let flooredFrame = Math.floor(this.frame);
		// if player is swimming, then draw it with a cropped height
		if (this.isSwimming()) {
			ctx.drawImage(
				this.spritesheet,
				flooredFrame * this.width,
				this.row * this.height,
				this.width,
				this.height - 6,
				// remember to also use the camera offset on the player, otherwise it won't work!
				(this.x - Camera.x),
				(this.y - Camera.y),
				this.width * World.SCALE,
				this.height * World.SCALE - 12
			);
		} else {
			// else, draw it normally
			ctx.drawImage(
				this.spritesheet,
				flooredFrame * this.width,
				this.row * this.height,
				this.width,
				this.height,
				// remember to also use the camera offset on the player, otherwise it won't work!
				(this.x - Camera.x),
				(this.y - Camera.y),
				this.width * World.SCALE,
				this.height * World.SCALE
			);
		}

		// let offsetx = 4 * World.SCALE;
		// let offsety = 9 * World.SCALE;

		// // Collision box
		// let collisionBox = new Rectangle(
		// 	this.x + offsetx - Camera.x,
		// 	this.y + offsety - Camera.y,
		// 	(this.width / 2) * World.SCALE,
		// 	(this.height / 2) * World.SCALE);

		// collisionBox.render(ctx, "rgb(0,180,255,0.8)");
	}

	public canSwim(): boolean {
		return true;
	}
}