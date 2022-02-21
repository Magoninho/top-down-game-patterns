export default class Entity {
	private x: number;
	private y: number;
	private width: number;
	private height: number;
	private sprite: HTMLImageElement;

	constructor(x, y, width, height, sprite: HTMLImageElement) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.sprite = sprite;
	}

	public update(deltaTime: number): void {

	}

	public render(ctx: CanvasRenderingContext2D) {
		
	}

	public getX(): number {
        return this.x;
    }

    public setX(x: number): void {
        this.x = x;
    }

    public getY(): number {
        return this.y;
    }

    public setY(y: number): void {
        this.y = y;
    }

    public getWidth(): number {
        return this.width;
    }

    public setWidth(width: number): void {
        this.width = width;
    }

    public getHeight(): number {
        return this.height;
    }

    public setHeight(height: number): void {
        this.height = height;
    }
}