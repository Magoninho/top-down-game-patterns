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
import World from "./World.js";
export default class Game {
    constructor(ctx) {
        this.world = new World();
        this.player = new Player(this, 0, 0);
        this.ctx = ctx;
        this.ctx.imageSmoothingEnabled = false;
    }
    /**
     * This function will load assets and start the game
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.world.init(); // loading world
            yield this.player.init();
            this.run();
        });
    }
    // game loop function with delta time
    run() {
        this.update();
        this.render(this.ctx);
        // Request to do this again ASAP
        requestAnimationFrame(this.run.bind(this));
    }
    update() {
        // Temporary, just to move the camera around the world
        Camera.x += 2;
        Camera.y = 0;
        // World size in pixels
        // TODO : remove from update
        let worldSize = World.WORLD_SIZE * World.tilesize * 2;
        // Camera clamping
        Camera.y = Math.max(Camera.y, 0);
        Camera.x = Math.max(Camera.x, 0);
        // you must divide by the scale because the width, IN RELATION WITH THE SCALED WORLD, has DECREASED the amount of the scale
        // e.g. scale = 2; width / 2
        // 		scale = 3; width / 3
        //		...
        // That was the best explanation I could give in a comment, feel free to change it with a pull request :D
        Camera.x = Math.min(Camera.x, worldSize - Game.WIDTH);
        Camera.y = Math.min(Camera.y, worldSize - Game.HEIGHT);
    }
    render(ctx) {
        this.ctx.clearRect(0, 0, Game.WIDTH, Game.HEIGHT);
        // Rendering all 4 layers that comes before the player
        for (let l = 0; l <= 4; l++) {
            this.world.drawLayer(ctx, l, -Camera.x, -Camera.y);
        }
        this.player.render(ctx);
        this.world.drawLayer(ctx, 5, -Camera.x, -Camera.y);
        this.ctx.fillStyle = "red";
        this.ctx.font = "48px sans";
        this.ctx.fillText(`${Camera.x}`, 40, 40);
    }
}
Game.WIDTH = document.getElementById("game-canvas").clientWidth;
Game.HEIGHT = document.getElementById("game-canvas").clientHeight;
//# sourceMappingURL=Game.js.map