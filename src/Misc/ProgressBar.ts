export default class ProgressBar {
	private progress: number = 0;
	private x: number = 240 - 100;
	private y: number = 240 - 10;
	public width: number = 200;
	public height: number = 20;

	public render(ctx: CanvasRenderingContext2D) {
		// rendering white border
		ctx.fillStyle = "white";
		ctx.fillRect(this.x - 1, this.y - 1, this.width+2, this.height+2);
		// rendering progress bar
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.progress, this.height);
	}

	public addProgress(progress: number) {
		this.progress += progress;
	}
}