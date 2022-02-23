import Camera from "./Camera.js";
import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";

export default class World {
	public static WORLD_SIZE: number;
	public static tilesize: number = 16;

	// Scaling factor, we could also use the ctx.scale() function, but this give us more control
	public static SCALE: number = 2;
	private spritesheet: SpriteSheet; // the spritesheet for rendering layers

	// Layers, all layers are in map.json
	private layers: number[] = [];

	constructor() {
	}

	public async init() {
		this.spritesheet = new SpriteSheet(await ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), World.tilesize, World.SCALE);

		// fetching data from map.json
		let response = await fetch("assets/map.json");
		let data = await response.json();

		// The world size is on the map.json
		// TODO: make world width and height
		World.WORLD_SIZE = data.width;

		// pushing layers data from map.json to this.layers
		data.layers.forEach(layerData => {
			this.layers.push(layerData.data);
		});
	}

	// Draws a selected layer, with offsets, generally handled by the camera class
	public drawLayer(ctx: CanvasRenderingContext2D, layer: number, offsetx: number, offsety: number): void {
		for (let i = 0; i < World.WORLD_SIZE; i++) {
			for (let j = 0; j < World.WORLD_SIZE; j++) {
				const tileID = this.getTileID(layer, j, i);
				this.spritesheet.renderSpriteById(ctx, tileID, (j * World.tilesize) + offsetx, (i * World.tilesize) + offsety);
			}
		}
	}

	// Gets a tile ID, which is basically (x + (y * world_size)) on the spritesheet
	public getTileID(layer, x, y): number {
		return this.layers[layer][x + (y * World.WORLD_SIZE)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
	}


	public getLayers(): number[] {
        return this.layers;
    }
}