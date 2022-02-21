import ImageUtils from "./ImageUtils.js";
import { INTERACTABLE, OVERWORLD, PLANTS } from "./Layers.js";
import SpriteSheet from "./SpriteSheet.js";

export default class World {
	private TILESIZE: number = 16;
	private WORLD_SIZE: number = 32;
	private spritesheet: SpriteSheet; // the spritesheet for rendering layers

	private layers = [];

	public async init() {
		this.spritesheet = new SpriteSheet(await ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), 16, 2);
		let response = await fetch("assets/Tiled_projects/map.json");
		let data = await response.json();
		data.layers.forEach(layerData => {
			this.layers.push(layerData.data);
			// console.log(layerData.data)
		});
		console.log(this.layers)
	}

	public drawLayer(ctx: CanvasRenderingContext2D, layer: number): void {
		for (let i = 0; i < this.WORLD_SIZE; i++) {
			for (let j = 0; j < this.WORLD_SIZE; j++) {
				const tileID = this.getTileID(layer, j, i);
				this.spritesheet.renderSpriteById(ctx, tileID, j * this.TILESIZE, i * this.TILESIZE);
			}
		}
	}


	public getTileID(layer, x, y): number {
		return this.layers[layer][x + (y * this.WORLD_SIZE)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
	}
}