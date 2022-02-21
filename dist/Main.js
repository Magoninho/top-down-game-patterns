var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Game from "./Game.js";
let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        let game = new Game(ctx);
        yield game.start();
    });
}
start();
//# sourceMappingURL=Main.js.map