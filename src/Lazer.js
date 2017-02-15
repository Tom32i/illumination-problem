class Lazer {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.points = [
            [x, y],
            [
                x + 100 * Math.cos(this.angle),
                y + 100 * Math.sin(this.angle),
            ]
        ];
    }
}

export default Lazer;
