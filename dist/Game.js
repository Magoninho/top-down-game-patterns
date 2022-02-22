var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Camera from "./Camera.js";
import World from "./World.js";
export default class Game {
    constructor(ctx) {
        this.WIDTH = document.getElementById("game-canvas").clientWidth;
        this.HEIGHT = document.getElementById("game-canvas").clientHeight;
        this.world = new World();
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }
    /**
     * This function will load assets and start the game
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.world.init(); // loading world
            console.log(World.WORLD_SIZE * this.world.tilesize);
            this.run();
        });
    }
    // game loop function with delta time
    run() {
        let then = Date.now();
        let FPS = 60;
        let now = Date.now();
        let delta = now - then;
        this.update(delta / 1000);
        this.render(this.ctx);
        then = now;
        // Request to do this again ASAP
        requestAnimationFrame(this.run.bind(this));
    }
    update(deltaTime) {
        Camera.x += 1.5;
        Camera.y += 0.5;
        let worldSize = World.WORLD_SIZE * this.world.tilesize;
        // Camera clamping
        Camera.y = Math.max(Camera.y, 0);
        Camera.x = Math.max(Camera.x, 0);
        Camera.x = Math.min(Camera.x, worldSize - this.WIDTH * 0.5);
        Camera.y = Math.min(Camera.y, worldSize - this.HEIGHT * 0.5);
    }
    render(ctx) {
        // this.tempSpriteSheet.renderSpriteById(ctx, 884, 0, 0);
        this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
        for (let l = 0; l <= 4; l++) {
            this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
        }
        // TODO: render the player
        this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
        this.ctx.fillStyle = "red";
        this.ctx.font = "48px sans";
        this.ctx.fillText(`${Camera.x}`, 40, 40);
    }
}
//# sourceMappingURL=Game.js.map