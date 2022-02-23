export default class Entity {
    // protected because we want the child classes to have access
	protected x: number;
	protected y: number;
	protected width: number;
	protected height: number;
	protected spritesheet: HTMLImageElement;

	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

    // Initializes assets for specific child classes
    public async init(): Promise<void> {

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