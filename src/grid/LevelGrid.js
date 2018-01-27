import GameGrid from "./GameGrid";
import config from "../config";

export default class LevelGrid extends GameGrid {
    constructor(size = 7, levelWidth, levelHeight) {
        super(size, levelWidth, levelHeight);
    }

    addRoom(x, y, room) {
        console.log('addRoom', x, y, room);
        this.placeAt(x, y, room);
    }

    roomAtPos(x, y) {
        console.log('roomAtPos', x, y)
        return null
    }

    showForDebug() {
        super.showForDebug(config.debugColorMainGrid, config.debugSizeMainGrid);
    }
}
