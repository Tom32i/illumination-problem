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

        if (!point || !segment) {
            return true;
        }

        lazer.end = point;

        if (lazer.depth < Lazer.maxDepth) {
            lazer.reflexion = lazer.createReflexion(segment);
            console.log(lazer.reflexion);
            if (lazer.reflexion) {
                this.updateLazer(lazer.reflexion);
            }
        }

        return true;
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

                        if (dist && (!intersection.point || dist < intersection.dist)) {
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
