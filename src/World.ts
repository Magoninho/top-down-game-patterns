import Camera from "./Camera.js";
import ImageUtils from "./ImageUtils.js";
import { INTERACTABLE, OVERWORLD, PLANTS } from "./Layers.js";
import SpriteSheet from "./SpriteSheet.js";

export default class World {
	public static WORLD_SIZE: number;
	public tilesize: number;
	private spritesheet: SpriteSheet; // the spritesheet for rendering layers

	private layers: number[] = [];


	public async init() {
		this.spritesheet = new SpriteSheet(await ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), 16, 2);
		let response = await fetch("assets/map.json");
		let data = await response.json();
		World.WORLD_SIZE = data.height;
		console.log(World.WORLD_SIZE)
		data.layers.forEach(layerData => {
			this.layers.push(layerData.data);
			// console.log(layerData.data)
		});
		this.tilesize = this.spritesheet.getTileSize();
	}

	public drawLayer(ctx: CanvasRenderingContext2D, layer: number, offsetx: number, offsety: number): void {
		for (let i = 0; i < World.WORLD_SIZE; i++) {
			for (let j = 0; j < World.WORLD_SIZE; j++) {
				const tileID = this.getTileID(layer, j, i);
				this.spritesheet.renderSpriteById(ctx, tileID, (j * this.tilesize) + offsetx, (i * this.tilesize) + offsety);
			}
		}
	}


	public getTileID(layer, x, y): number {
		return this.layers[layer][x + (y * World.WORLD_SIZE)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
	}


	public getLayers(): number[] {
        return this.layers;
    }
}