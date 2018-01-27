import Phaser from "phaser-ce/build/custom/phaser-split";
import RoomGrid from "../../grid/RoomGrid";
import config from "../../config";
import DIRECTION from "../../const/Direction";

export default class BaseRoom extends Phaser.Group {
  constructor() {
    super(game);
    this.grid = new RoomGrid(config.cellsPerRoom, this.getWidth(), this.getHeight())
    //this.grid.showForDebug()
    this.exits = [Object.values(DIRECTION)]
    this.exits = ['right', 'up', 'down', 'left']
    this.alliesCount = 0
    this.baddiesCount = 0
    this.isEndCell = false
  }

  getWidth() {
    return config.levelGridWidth / config.cellsPerLine;
  }

  getHeight() {
      return config.levelGridHeight / config.cellsPerLine;
  }

  /**********
   * Setters
   *********/
  setGroundTiles({spriteSheet, topLeftIndex, topMiddleIndex, topRightIndex,
                               middleLeftIndex, middleIndex, middleRightIndex,
                               bottomLeftIndex, bottomMiddleIndex, bottomRightIndex}) {
    // Corners:
    this.grid.placeAt(0, 0, this.create(0, 0, spriteSheet, topLeftIndex));
    this.grid.placeAt(0, config.cellsPerRoom - 1, this.create(0, 0, spriteSheet, bottomLeftIndex));
    this.grid.placeAt(config.cellsPerRoom - 1, 0, this.create(0, 0, spriteSheet, topRightIndex));
    this.grid.placeAt(config.cellsPerRoom - 1, config.cellsPerRoom - 1, this.create(0, 0, spriteSheet, bottomRightIndex));

    // Sides:
    for (let k = 1; k < config.cellsPerRoom - 1; k++) {
      this.grid.placeAt(k, 0, this.create(0, 0, spriteSheet, topMiddleIndex));
      this.grid.placeAt(k, config.cellsPerRoom - 1, this.create(0, 0, spriteSheet, bottomMiddleIndex));
      this.grid.placeAt(0, k, this.create(0, 0, spriteSheet, middleLeftIndex));
      this.grid.placeAt(config.cellsPerRoom - 1, k, this.create(0, 0, spriteSheet, middleRightIndex));
    }
    // Middle:
    for (let i = 1; i < config.cellsPerRoom - 1; i++) {
      for (let j = 1; j < config.cellsPerRoom - 1; j++) {
        this.grid.placeAt(i, j, this.create(0, 0, spriteSheet, middleIndex));
      }
    }
  }
  addExits(...exits) {
      this.exits = exits
  }
  addNellaMandelson(x, y) {
      console.log('addNellaMandelson', x, y)
  }
  addEndWindow(x, y) {
      this.isEndCell = true
      console.log('addEndWindow', x, y)
  }
  addAlly(x, y) {
      console.log('addAlly', x, y)
  }
  addBaddy(x, y) {
      console.log('addBaddy', x, y)
  }
  addFurniture(x, y, spriteIndex) {
      console.log('addFurniture', x, y, spriteIndex)
  }
  addSideWallSprites(side) {
      console.log('addSideWallSprites', side)
  }
  addSideBarSprites(side) {
      console.log('addSideBarSprites', side)
  }
}
