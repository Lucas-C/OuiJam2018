import GameGrid from "./GameGrid";
import config from "../config";

export default class RoomGrid extends GameGrid {
  constructor(size, roomWidth, roomHeight, parent) {
    super(roomWidth / size, roomHeight / size, parent);
  }

  placeAt(xx, yy, obj) {
    super.placeAt(xx, yy, obj)
    // Only has an effect ig obj is a Sprite
    obj.scale.setTo(this.widthCell / config.spriteSize, this.heightCell / config.spriteSize)
  }

  showForDebug() {
    super.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid);
  }
}
