export default class Rectangle {
	public x: number;
	public y: number;
	public width: number;
	public height: number;
	constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	// checks if a rectangle intersects with this, using x, y, width and height
	public intersects_xy(x, y, width, height) {
		return (this.x < x + width &&
			this.x + this.width > x &&
			this.y < y + height &&
			this.y + this.height > y);
	}

	// checks if a rectangle intersects with another rectangle object
	public intersects_Rect(rectangle: Rectangle) {
		return (this.x < rectangle.x + rectangle.width &&
			this.x + this.width > rectangle.x &&
			this.y < rectangle.y + rectangle.height &&
			this.y + this.height > rectangle.y);
	}

	public render(ctx: CanvasRenderingContext2D, color) {
		ctx.fillStyle = color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}