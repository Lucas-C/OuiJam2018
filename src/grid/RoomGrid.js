import GameGrid from "./GameGrid";
import config from "../config";

export default class RoomGrid extends GameGrid {
    constructor(size = 7, roomWidth, roomHeight) {
        super(size, roomWidth, roomHeight);
    }

    showForDebug() {
        super.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid);
    }
}
