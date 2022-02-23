export default class SpriteSheet {
    constructor(image, tilesize, scale) {
        this.scale = 1;
        this.image = image;
        this.tilesize = tilesize;
        this.scale = scale;
        this.mapWidth = Math.ceil(this.image.width / this.tilesize);
        this.mapHeight = Math.ceil(this.image.height / this.tilesize);
    }
    // Renders a sprite from col and row positions on the spritesheet image
    renderSprite(ctx, col, row, x, y) {
        ctx.drawImage(this.image, col * this.tilesize, row * this.tilesize, this.tilesize, this.tilesize, x, y, this.tilesize * this.scale, this.tilesize * this.scale);
    }
    // Renders a sprite from an ID (x + (y * world_size))
    renderSpriteById(ctx, ID, x, y) {
        // a nice formula to find x and y with a tile ID
        // remember that the tile ID is x + (y * width)
        let spritey = Math.floor(ID / this.mapWidth);
        let spritex = ID - (spritey * this.mapWidth);
        ctx.drawImage(this.image, // the image
        spritex * this.tilesize, // source x (don't forget to multiply by the tilesize!)
        spritey * this.tilesize, // source y
        this.tilesize, // source width
        this.tilesize, // source height
        x, // target x
        y, // target y
        this.tilesize * this.scale, // target width
        this.tilesize * this.scale // target height
        );
    }
    getTileSize() {
        return this.tilesize;
    }
}
//# sourceMappingURL=SpriteSheet.js.map