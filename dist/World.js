var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";
export default class World {
    constructor() {
        this.layers = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.spritesheet = new SpriteSheet(yield ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), 16, 2);
            let response = yield fetch("assets/map.json");
            let data = yield response.json();
            World.WORLD_SIZE = data.height;
            console.log(World.WORLD_SIZE);
            data.layers.forEach(layerData => {
                this.layers.push(layerData.data);
                // console.log(layerData.data)
            });
            this.tilesize = this.spritesheet.getTileSize();
        });
    }
    drawLayer(ctx, layer, offsetx, offsety) {
        for (let i = 0; i < World.WORLD_SIZE; i++) {
            for (let j = 0; j < World.WORLD_SIZE; j++) {
                const tileID = this.getTileID(layer, j, i);
                this.spritesheet.renderSpriteById(ctx, tileID, (j * this.tilesize) + offsetx, (i * this.tilesize) + offsety);
            }
        }
    }
    getTileID(layer, x, y) {
        return this.layers[layer][x + (y * World.WORLD_SIZE)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
    }
    getLayers() {
        return this.layers;
    }
}
//# sourceMappingURL=World.js.map