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
import ImageUtils from "./ImageUtils.js";
import SpriteSheet from "./SpriteSheet.js";
export default class World {
    constructor() {
        // Layers, all layers are in map.json
        this.layers = [];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.spritesheet = new SpriteSheet(yield ImageUtils.loadImageFromUrl("assets/gfx/Overworld.png"), World.TILESIZE, World.SCALE);
            // fetching data from map.json
            let response = yield fetch("assets/map.json");
            let data = yield response.json();
            // The world size is on the map.json
            // World width and height in tiles (32x32)
            World.WORLD_WIDTH_IN_TILES = data.width;
            World.WORLD_HEIGHT_IN_TILES = data.height;
            // World width and height in pixels
            World.WORLD_WIDTH = World.WORLD_WIDTH_IN_TILES * World.TILESIZE * World.SCALE;
            World.WORLD_HEIGHT = World.WORLD_HEIGHT_IN_TILES * World.TILESIZE * World.SCALE;
            // pushing layers data from map.json to this.layers
            data.layers.forEach(layerData => {
                this.layers.push(layerData.data);
            });
        });
    }
    // Draws a selected layer, with offsets, generally handled by the camera class
    drawLayer(ctx, layer, offsetx, offsety) {
        // This will make sure that what is being rendered is inside of the camera
        // Understand is like a render distance
        let startCol = Math.floor(Camera.x / (World.TILESIZE * World.SCALE));
        let startRow = Math.floor(Camera.y / (World.TILESIZE * World.SCALE));
        let endCol = startCol + Math.floor(Camera.width / (World.TILESIZE * World.SCALE));
        let endRow = startRow + Math.floor(Camera.height / (World.TILESIZE * World.SCALE));
        for (let i = startRow; i <= endRow; i++) {
            for (let j = startCol; j <= endCol; j++) {
                const tileID = this.getTileID(layer, j, i);
                // Rendering every sprite
                // Remember to multiply it by the world scale
                this.spritesheet.renderTileById(ctx, tileID, (j * World.TILESIZE * World.SCALE) + offsetx, (i * World.TILESIZE * World.SCALE) + offsety);
            }
        }
    }
    // Gets a tile ID, which is basically (x + (y * world_size)) on the spritesheet
    getTileID(layer, x, y) {
        return this.layers[layer][x + (y * World.WORLD_WIDTH_IN_TILES)] - 1; // -1 because the results of the Tiled software do not include 0 as the first index
    }
    getLayers() {
        return this.layers;
    }
}
World.TILESIZE = 16;
// Scaling factor, we could also use the ctx.scale() function, but this give us more control
World.SCALE = 2;
//# sourceMappingURL=World.js.map