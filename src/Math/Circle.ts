export default class Circle {
	public x: number;
	public y: number;
	public radius: number;

	constructor(x: number, y: number, radius: number) {
		this.x = x;
		this.y = y;
		this.radius = radius;
	}

	// checks if a circle is colliding with another
	public intersects(circle: Circle) {
		let dx = this.x - circle.x;
		let dy = this.y - circle.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		return (distance < this.radius + circle.radius);
	}

	public render(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.stroke(); 
	}
}