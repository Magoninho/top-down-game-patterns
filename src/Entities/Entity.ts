import Game from "../Game";
import World from "../World";

export default class Entity {
    // protected because we want the child classes to have access
    protected game: Game; // the game the entity is on
    protected world: World; // the world the entity is on
	protected x: number;
	protected y: number;
	protected width: number;
	protected height: number;
	protected spritesheet: HTMLImageElement;

	constructor(game: Game, x: number, y: number) {
		this.x = x;
		this.y = y;
        this.game = game;
        this.world = this.game.world;
	}

    // Initializes assets for specific child classes
    public async init(): Promise<void> {

    }

	public update(deltaTime: number): void {
	}

	public render(ctx: CanvasRenderingContext2D) {
	}

    public canSwim(): boolean {
        return false;
    }

    protected isSwimming(): boolean {
        // returns if there is a liquid tile where the entity is
        return (this.game.world.isLiquidAt(this.x + this.width / 2, this.y + this.height / 2));
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
}