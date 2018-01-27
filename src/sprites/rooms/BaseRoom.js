import Phaser from "phaser-ce/build/custom/phaser-split";
import RoomGrid from "../../grid/RoomGrid";
import config from "../../config";

export default class BaseRoom extends Phaser.Group {
  constructor() {
    super(game);
    this.grid = new RoomGrid(config.cellsPerRoom, this.getWidth(), this.getHeight());
    this.grid.showForDebug();
    this.exits = ['right', 'up', 'down', 'left'];
  }

  getWidth() {
    return config.levelGridWidth / config.cellsPerLine;
  }

  getHeight() {
      return config.levelGridHeight / config.cellsPerLine;
  }

  /**********
   * Getters
   *********/
  exits() {
      return this.exits
  }
  alliesCount() {
      return 0
  }
  baddiesCount() {
      return 0
  }

  /**********
   * Setters
   *********/
  addExits(...exits) {
      this.exits = exits
  }
  addNellaMandelson(x, y) {
      console.log('addNellaMandelson', x, y)
  }
  addEndWindow(x, y) {
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
