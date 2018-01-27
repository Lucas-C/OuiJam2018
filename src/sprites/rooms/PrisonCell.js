import BaseRoom from "./BaseRoom";

export default class PrisonCell extends BaseRoom {
    constructor() {
        super();
        this.setGroundTiles({
            spriteSheet: 'roguelikeSheet',
            topLeftIndex: 1428,
            topMiddleIndex: 1429,
            topRightIndex: 1430,
            middleLeftIndex: 1485,
            middleIndex: 1486,
            middleRightIndex: 1487,
            bottomLeftIndex: 1542,
            bottomMiddleIndex: 1543,
            bottomRightIndex: 1544
        })
    }
}