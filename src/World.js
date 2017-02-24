import Lazer from './Lazer';
import Point from './Point';

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
        this.lazers.push(Lazer.createFromAngle(this.layout.source, angle));
    }

    update() {
        this.lazers.forEach(this.updateLazer);
    }

    updateLazer(lazer) {
        if (lazer.depth === 0) {
            lazer.setAngle((lazer.angle + Math.PI/100000) % Math.twoPI);
        }

        if (!lazer.changed) {
            return;
        }

        lazer.changed = false;

        const { point, segment } = this.getClosestIntersection(lazer);

        if (!point || !segment) {
            lazer.setEnd();

            return;
        }

        lazer.setEnd(point);

        if (lazer.depth < Lazer.maxDepth) {
            lazer.reflexion = lazer.createReflexion(segment);

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
                        const precesion = Math.pow(10, 3);
                        const dist = Math.round(lazer.vector.from.getDistance(point) * precesion) / precesion;

                        if (dist !== 0 && (!intersection.point || dist < intersection.dist)) {
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
