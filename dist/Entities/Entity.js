var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Entity {
    constructor(game, x, y) {
        this.x = x;
        this.y = y;
        this.game = game;
        this.world = this.game.world;
    }
    // Initializes assets for specific child classes
    init() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update(deltaTime) {
    }
    render(ctx) {
    }
    canSwim() {
        return false;
    }
    isSwimming() {
        // returns if there is a liquid tile where the entity is
        return (this.game.world.isLiquidAt(this.x + this.width / 2, this.y + this.height / 2));
    }
    getX() {
        return this.x;
    }
    setX(x) {
        this.x = x;
    }
    getY() {
        return this.y;
    }
    setY(y) {
        this.y = y;
    }
}
//# sourceMappingURL=Entity.js.map