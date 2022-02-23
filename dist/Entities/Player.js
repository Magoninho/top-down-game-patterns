var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from "../Game.js";
import ImageUtils from "../ImageUtils.js";
import World from "../World.js";
import Entity from "./Entity.js";
export default class Player extends Entity {
    constructor(game, x, y) {
        super(x, y, World.tilesize, World.tilesize);
        this.width = 16;
        this.height = 18;
        this.frame = 0;
        this.row = 3;
        this.game = game;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.spritesheet = yield ImageUtils.loadImageFromUrl("assets/gfx/Entity/player.png");
        });
    }
    update() {
    }
    render(ctx) {
        // a nice little way to make animations
        this.frame = (this.frame + 0.1) % 3;
        ctx.drawImage(this.spritesheet, Math.floor(this.frame) * this.width, this.row * this.height, this.width, this.height, (this.x * World.SCALE) + Game.WIDTH / 2, (this.y * World.SCALE) + Game.HEIGHT / 2, this.width * World.SCALE, this.height * World.SCALE);
    }
}
//# sourceMappingURL=Player.js.map