export default class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
    }
    // checks if a circle is colliding with another
    intersects(circle) {
        let dx = this.x - circle.x;
        let dy = this.y - circle.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        return (distance < this.radius + circle.radius);
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.stroke();
    }
}
//# sourceMappingURL=Circle.js.map