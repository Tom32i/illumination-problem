class Lazer {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.coeffDir = this.getCoeffDir(x, y, angle);
        this.ordOrigin = this.getOrdOrigin(x, y, this.coeffDir);
        this.points = [[x, y]];

        for (let i = 1; i < 2; i++) {
            const px = x + i * 1;
            this.points.push([px, this.getY(px)]);
        }
    }

    getCoeffDir(x, y, angle, dist = 100) {
        const xb = x + dist * Math.cos(angle);
        const yb = y + dist * Math.sin(angle);

        return (yb - y) / (xb - x);
    }

    getOrdOrigin(x, y, m) {
        return y - m * x;
    }

    getY(x) {
        return this.coeffDir * x + this.ordOrigin;
    }
}

export default Lazer;
