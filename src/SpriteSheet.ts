export default class SpriteSheet {
	private image: HTMLImageElement;
	private tilesize: number;
	private scale: number = 1;

	// map dimensions in tiles
	private mapWidth: number;
	private mapHeight: number;

	constructor(image: HTMLImageElement, tilesize: number, scale: number) {
		this.image = image;
		this.tilesize = tilesize;
		this.scale = scale;

		this.mapWidth = Math.ceil(this.image.width / this.tilesize);
		this.mapHeight = Math.ceil(this.image.height / this.tilesize);
	}

	public renderSprite(ctx: CanvasRenderingContext2D, col: number, row: number, x: number, y: number): void {
		ctx.drawImage(this.image, col*this.tilesize, row*this.tilesize, this.tilesize, this.tilesize, x, y, this.tilesize*this.scale, this.tilesize*this.scale);
	}

	public renderSpriteById(ctx: CanvasRenderingContext2D, ID: number, x: number, y: number): void {
		
		// a nice formula to find x and y with a tile ID
		// remember that the tile ID is x + (y * width)
		let spritey = Math.floor(ID/this.mapWidth);
		let spritex = ID - (spritey * this.mapWidth);


		ctx.drawImage(
			this.image, // the image
			spritex * this.tilesize, // source x (don't forget to multiply by the tilesize!)
			spritey * this.tilesize, // source y
			this.tilesize, // source width
			this.tilesize, // source height
			x*this.scale, // target x
			y*this.scale, // target y
			this.tilesize*this.scale, // target width
			this.tilesize*this.scale // target height
		);
	}
}