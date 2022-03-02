export default class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    // checks if a rectangle intersects with this, using x, y, width and height
    intersects_xy(x, y, width, height) {
        return (this.x < x + width &&
            this.x + this.width > x &&
            this.y < y + height &&
            this.y + this.height > y);
    }
    // checks if a rectangle intersects with another rectangle object
    intersects_Rect(rectangle) {
        return (this.x < rectangle.x + rectangle.width &&
            this.x + this.width > rectangle.x &&
            this.y < rectangle.y + rectangle.height &&
            this.y + this.height > rectangle.y);
    }
    render(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
//# sourceMappingURL=Rectangle.js.map