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
import Player from "./Entities/Player.js";
import InputHandler from "./InputHandler.js";
import ProgressBar from "./Misc/ProgressBar.js";
import World from "./World.js";
export default class Game {
    constructor(ctx) {
        this.world = new World();
        this.player = new Player(this, 0, 0);
        this.inputHandler = new InputHandler();
        this.camera = new Camera();
        this.progressBar = new ProgressBar();
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }
    /**
     * This function will load assets and start the game
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            // the number of stuff to be loaded
            // in this case we have 2 (the world, and the player)
            yield this.world.init(); // loading world
            this.progressBar.addProgress(100);
            this.progressBar.render(this.ctx);
            yield this.player.init();
            this.progressBar.addProgress(100);
            this.camera.follow(this.player);
            this.run();
        });
    }
    // game loop
    run() {
        this.update();
        this.render(this.ctx);
        // Request to do this again ASAP
        requestAnimationFrame(this.run.bind(this));
    }
    update() {
        this.player.update();
        this.camera.update();
    }
    render(ctx) {
        this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        // Rendering all 4 layers that comes before the player
        for (let l = 0; l <= 4; l++) {
            this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
        }
        // Rendering the player between layers
        this.player.render(ctx);
        // This layer has things that will be over the player (e.g. the flag)
        this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
    }
}
Game.WIDTH = document.getElementById("game-canvas").clientWidth;
Game.HEIGHT = document.getElementById("game-canvas").clientHeight;
//# sourceMappingURL=Game.js.map