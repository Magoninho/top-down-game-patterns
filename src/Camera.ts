import Entity from "./Entities/Entity.js";
import Game from "./Game.js";
import World from "./World.js";

export default class Camera {
	public static x: number = 0;
	public static y: number = 0;
	public static width: number;
	public static height: number;
	private target: Entity;

	constructor() {
		Camera.width = Game.WIDTH;
		Camera.height = Game.HEIGHT;
	}

	public follow(entity: Entity) {
		this.target = entity;
		// Camera.x = this.target.getX() - Game.WIDTH/2;
		// Camera.y = this.target.getY() - Game.HEIGHT/2;
	}

	// update camera positions based on the entity position
	public update() {

		Camera.x = this.target.getX() - Game.WIDTH/2;
		Camera.y = this.target.getY() - Game.HEIGHT/2;

		Camera.y = Math.max(Camera.y, 0);
		Camera.x = Math.max(Camera.x, 0);

		Camera.x = Math.min(Camera.x, World.WORLD_WIDTH-Game.WIDTH);
		Camera.y = Math.min(Camera.y, World.WORLD_HEIGHT-Game.HEIGHT);
	}
}