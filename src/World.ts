import Camera from "./Camera.js";
import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";

export default class World {
	public static WORLD_WIDTH_IN_TILES: number;
	public static WORLD_HEIGHT_IN_TILES: number;
	public static WORLD_WIDTH: number;
	public static WORLD_HEIGHT: number;
	public static TILESIZE: number = 16;

	// Scaling factor, we could also use the ctx.scale() function, but this give us more control
	public static SCALE: number = 2;
	private spritesheet: SpriteSheet; // the spritesheet for rendering layers

	// Layers, all layers are in map.json
	private layers: number[] = [];

	public async init() {
		this.spritesheet = new SpriteSheet(await ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), World.TILESIZE, World.SCALE);

		// fetching data from map.json
		let response = await fetch("assets/map.json");
		let data = await response.json();

		// The world size is on the map.json
		// World width and height in tiles (32x32)
		World.WORLD_WIDTH_IN_TILES = data.width; 
		World.WORLD_HEIGHT_IN_TILES = data.height; 
		// World width and height in pixels
		World.WORLD_WIDTH = World.WORLD_WIDTH_IN_TILES*World.TILESIZE*World.SCALE;
		World.WORLD_HEIGHT = World.WORLD_HEIGHT_IN_TILES*World.TILESIZE*World.SCALE;

		// pushing layers data from map.json to this.layers
		data.layers.forEach(layerData => {
			this.layers.push(layerData.data);
		});
	}

	// Draws a selected layer, with offsets, generally handled by the camera class
	public drawLayer(ctx: CanvasRenderingContext2D, layer: number, offsetx: number, offsety: number): void {

		// This will make sure that what is being rendered is inside of the camera
		// Understand is like a render distance
		let startCol = this.getCol(Camera.x);
		let startRow = this.getRow(Camera.y);

		let endCol = startCol + this.getCol(Camera.width);
		let endRow = startRow + this.getRow(Camera.height);

		for (let i = startRow; i <= endRow; i++) {
			for (let j = startCol; j <= endCol; j++) {
				const tileID = this.getTileID(layer, j, i);

				// Rendering every sprite
				// Remember to multiply it by the world scale
				this.spritesheet.renderTileById(ctx, tileID, (j * World.TILESIZE * World.SCALE) + offsetx, (i * World.TILESIZE * World.SCALE) + offsety);
			}
		}
	}

	// checks if on a position, in pixels, there is a solid tile (all tiles different from -1 in the solid layer)
	public isSolidTileAt(x: number, y: number): boolean {
		let solidLayer = 4; // the solid layer from this.layers

		let col = this.getCol(x);
		let row = this.getRow(y);
		// if it is different from -1 in the solid layer, then it is solid
		return this.getTileID(solidLayer, col, row) != -1;
	}

	// checks if on a position, in pixels, there is a liquid tile (e.g. water)
	public isLiquidAt(x: number, y: number) {
		let waterLevel = 1;
		let col = this.getCol(x);
        let row = this.getRow(y);
		return this.getTileID(waterLevel, col, row) == 283;
	}

	// Gets a tile ID, which is basically (x + (y * world_size)) on the spritesheet
	public getTileID(layer, x, y): number {
		return this.layers[layer][x + (y * World.WORLD_WIDTH_IN_TILES)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
	}

	// getRow and getCol functions converts position in pixels to position in tiles
	public getCol(x: number): number {
		return Math.floor(x / (World.TILESIZE * World.SCALE));
	}

	public getRow(y: number): number {
		return Math.floor(y / (World.TILESIZE * World.SCALE));
	}

	public getLayers(): number[] {
        return this.layers;
    }
}