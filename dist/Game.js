var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import World from "./World.js";
export default class Game {
    constructor(ctx) {
        this.SCALE = 3;
        this.world = new World();
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }
    /**
     * This function will load assets and start the game
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.world.init();
            // console.log(this.world.getTileID(0, 30, 30));
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
    }
    render(ctx) {
        // this.tempSpriteSheet.renderSpriteById(ctx, 884, 0, 0);
        this.world.drawLayer(ctx, 0);
        this.world.drawLayer(ctx, 1);
        this.world.drawLayer(ctx, 2);
        this.world.drawLayer(ctx, 3);
        this.world.drawLayer(ctx, 4);
        // TODO: render the player
        this.world.drawLayer(ctx, 5);
    }
}
//# sourceMappingURL=Game.js.map