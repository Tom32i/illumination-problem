import Lazer from './Lazer';

/**
 * World
 */
class World {
    constructor(layout) {
        this.layout = layout;
        this.lazers = [];

        this.updateLazer = this.updateLazer.bind(this);
    }

    addLazer(angle) {
        this.lazers.push(
            new Lazer(this.layout.source, angle)
        );
    }

    update() {
        this.lazers.forEach(this.updateLazer);
    }

    updateLazer(lazer) {
        if (!lazer.update()) {
            return;
        }

        const { point, segment } = this.getClosestIntersection(lazer);

        lazer.end = point;

        if (lazer.depth < Lazer.maxDepth) {
            lazer.reflexion = lazer.createReflexion(segment);
            console.log(lazer.reflexion);
            this.lazers.push(lazer.reflexion);
            this.updateLazer(lazer.reflexion);
        }
    }

    /**
     * Get closest intersection
     *
     * @param {Array} walls
     *
     * @return {Point}
     */
    getClosestIntersection(lazer) {
        return this.layout.walls.reduce((intersection, segment, index) => {
            const point = segment.getIntersect(lazer.vector, index === 16);

            if (point) {
                if (segment.contains(point)) {
                    if (lazer.contains(point)) {
                        const dist = lazer.origin.getDistance(point);

                        if (!intersection.point || (dist && dist < intersection.dist)) {
                            return { point, segment, dist };
                        }
                    }
                }
            }

            return intersection;
        }, { point: null, segment: null, dist: null});
    }
}

export default World;
