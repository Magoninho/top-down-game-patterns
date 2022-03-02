export default class ProgressBar {
    constructor() {
        this.progress = 0;
        this.x = 240 - 100;
        this.y = 240 - 10;
        this.width = 200;
        this.height = 20;
    }
    render(ctx) {
        // rendering white border
        ctx.fillStyle = "white";
        ctx.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
        // rendering progress bar
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.progress, this.height);
    }
    addProgress(progress) {
        this.progress += progress;
    }
}
//# sourceMappingURL=ProgressBar.js.map