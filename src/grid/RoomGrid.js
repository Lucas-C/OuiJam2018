import GameGrid from "./GameGrid";
import config from "../config";

export default class RoomGrid extends GameGrid {
    constructor(size, roomWidth, roomHeight, parent) {
        super(roomWidth / size, roomHeight / size, parent);
    }

    showForDebug() {
        super.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid);
    }
}
