import Phaser from "phaser-ce/build/custom/phaser-split";
import GameGrid from "../../grid/GameGrid";
import config from "../../config";

export default class DefaultRoom extends Phaser.Group {
  constructor() {
    super(game);
    this.grid = new GameGrid(config.cellsPerRoom, this.getWidth(), this.getHeight());
    const cell1 = this.create(0, 0, 'roguelikeSheet', 1428);
    const cell2 = this.create(0, 0, 'roguelikeSheet', 1428);
    this.grid.placeAt(0, 0, cell1);
    this.grid.placeAt(6, 6, cell2);
    this.grid.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid);
  }

  getWidth() {
    return config.mainGridWidth / config.cellsPerLine;
  }

  getHeight() {
      return config.mainGridHeight / config.cellsPerLine;
  }
}
