import GameGrid from "./GameGrid";
import config from "../config";

export default class RoomGrid extends GameGrid {
    constructor(size, roomWidth, roomHeight) {
        super(size, roomWidth, roomHeight);
    }

    showForDebug() {
        super.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid);
    }
}
