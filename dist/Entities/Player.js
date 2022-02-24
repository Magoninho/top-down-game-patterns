var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Camera from "../Camera.js";
import ImageUtils from "../ImageUtils.js";
import World from "../World.js";
import Entity from "./Entity.js";
export default class Player extends Entity {
    constructor(game, x, y) {
        super(x, y);
        this.width = 16;
        this.height = 18;
        this.dx = 0;
        this.dy = 0;
        this.moving = false;
        // animation variables
        this.frame = 0;
        this.row = 0;
        this.game = game;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.spritesheet = yield ImageUtils.loadImageFromUrl("assets/gfx/Entity/player.png");
            // positioning the player to be right on the door
            this.x = World.WORLD_WIDTH / 4;
            this.y = World.WORLD_HEIGHT / 4;
        });
    }
    move(dirx, diry) {
        // a nice little way to make animations
        this.frame = (this.frame + 0.1) % 3;
        // Velocity vector
        let vx = dirx * Player.speed;
        let vy = diry * Player.speed;
        // This fixes the problem of faster diagonals
        // Better explanation later...
        if (dirx != 0 && diry != 0) {
            vx /= 1.414;
            vy /= 1.414;
        }
        // adding the velocity vector to player's position
        this.x += vx;
        this.y += vy;
        // TODO: collision function call
        // Clamping player position
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > World.WORLD_WIDTH - this.width) {
            this.x = World.WORLD_WIDTH - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > World.WORLD_HEIGHT - this.height) {
            this.y = World.WORLD_HEIGHT - this.height;
        }
    }
    update() {
        let playerOldX = this.x;
        let playerOldY = this.y;
        // reset the directions so the player don't stay moving forever
        this.dx = 0;
        this.dy = 0;
        if (this.game.inputHandler.isDown(37)) { // left
            this.dx = -1;
            this.row = 2;
        }
        if (this.game.inputHandler.isDown(38)) { // up
            this.dy = -1;
            this.row = 1;
        }
        if (this.game.inputHandler.isDown(39)) { // right
            this.dx = 1;
            this.row = 3;
        }
        if (this.game.inputHandler.isDown(40)) { // down
            this.dy = 1;
            this.row = 0;
        }
        this.move(this.dx, this.dy);
        let playerNewX = this.x;
        let playerNewY = this.y;
        // Checking if the player stoped by comparing its previous position with its moved one
        if (playerNewY - playerOldY == 0 && playerNewX - playerOldX == 0) {
            this.frame = 0; // sets the frame to the first of the selected row animation
        }
    }
    render(ctx) {
        // Flooring the frame counter to turn it into an index
        let flooredFrame = Math.floor(this.frame);
        ctx.drawImage(this.spritesheet, flooredFrame * this.width, this.row * this.height, this.width, this.height, 
        // remember to also use the camera offset on the player, otherwise it won't work!
        (this.x - Camera.x), (this.y - Camera.y), this.width * World.SCALE, this.height * World.SCALE);
    }
}
Player.speed = 1.4 * World.SCALE;
//# sourceMappingURL=Player.js.map