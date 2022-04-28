export default class Tile {

	id: number;
	x: number;
	y: number;
	width: number;
	height: number;
	solid: boolean = false;

	constructor(ID: number, x: number, y: number) {
		this.id = ID;
		this.x = x;
		this.y = y;
	}

	// public interact() {
		
	// }

	public render(ctx: CanvasRenderingContext2D): void {
		
	}
}