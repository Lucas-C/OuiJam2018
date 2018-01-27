import GameGrid from "./GameGrid";
import config from "../config";

export default class LevelGrid extends GameGrid {
  constructor(size, levelWidth, levelHeight, parent) {
    super(levelWidth / size, levelHeight / size, parent);
    this.size = size
    this.rooms = Array.from({length: size}, () => Array.from({length: size}))
  }

  addRoom(x, y, room) {
    this.rooms[x][y] = room
    this.placeAt(x, y, room);
  }

  roomAtPos(x, y) {
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      return null
    }
    return this.rooms[x] && this.rooms[x][y]
  }

  showForDebug() {
    super.showForDebug(config.debugColorMainGrid, config.debugSizeMainGrid);
  }
}
