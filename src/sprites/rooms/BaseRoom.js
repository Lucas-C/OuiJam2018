import Phaser from "phaser-ce/build/custom/phaser-split";
import RoomGrid from "../../grid/RoomGrid";
import config from "../../config";
import DIRECTION from "../../const/Direction";
import FRAME from "../../const/Frame";

export default class BaseRoom extends Phaser.Group {
  constructor(roomWidth, roomHeight) {
    super(game);
    this.grid = new RoomGrid(config.cellsPerRoomSide, roomWidth, roomHeight)
    //this.grid.showForDebug()
    this.exits = [Object.values(DIRECTION)]
    this.alliesCount = 0
    this.baddiesCount = 0
    this.isEndCell = false
    this.groundTilesIndices = null; // Must be set by child classes
  }

  /**********
   * Setters
   *********/
  setGroundTiles() {
    /*
    // Corners:
    this.grid.placeAt(0, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_LFT));
    this.grid.placeAt(0, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_LFT));
    this.grid.placeAt(config.cellsPerRoomSide - 1, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_RGT));
    this.grid.placeAt(config.cellsPerRoomSide - 1, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_RGT));

    // Sides:
    for (let k = 1; k < config.cellsPerRoomSide - 1; k++) {
      this.grid.placeAt(k, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_MID));
      this.grid.placeAt(k, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_MID));
      this.grid.placeAt(0, k, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_LFT));
      this.grid.placeAt(config.cellsPerRoomSide - 1, k, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_RGT));
    }
    */
    // Middle:
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      for (let j = 0; j < config.cellsPerRoomSide; j++) {
        this.grid.placeAt(i, j, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_MID));
      }
    }
  }

  addExits(...exits) {
    this.exits = exits
  }

  addNellaMandelson(x, y) {
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', FRAME.NELLA_MANDELSON)); // the pretty one
  }

  addEndWindow(x, y) {
    this.isEndCell = true
    this.grid.placeAt(x, y, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WINDOW_1));
    this.grid.placeAt(x, y, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.CURTAINS_1));
  }

  addAlly(x, y) {
    this.alliesCount += 1
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', this.selectOneInArray([0, 1]))); // base
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', this.selectOneInArray([10, 14, 327, 381])), -1, 1); // clothes
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', this.selectOneInArray([19, 21])), -1, 1); // hair
  }

  addBaddy(x, y) {
    this.baddiesCount += 1
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', this.selectOneInArray([270, 432, 541]))); // all in one
  }

  selectOneInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  addFurniture(x, y) {
    let furnitureArray = [
      FRAME.CHAIR_FRONT_1, FRAME.CHAIR_FRONT_2, FRAME.CHAIR_FRONT_3, FRAME.CHAIR_FRONT_4,
      FRAME.CHAIR_SIDE_LEFT_1, FRAME.CHAIR_SIDE_LEFT_2, FRAME.CHAIR_SIDE_LEFT_3, FRAME.CHAIR_SIDE_LEFT_4,
      FRAME.CHAIR_SIDE_RIGHT_1, FRAME.CHAIR_SIDE_RIGHT_2, FRAME.CHAIR_SIDE_RIGHT_3, FRAME.CHAIR_SIDE_RIGHT_4,
      FRAME.BED_SIDE_LEFT_1, FRAME.BED_SIDE_RIGHT_1, FRAME.BED_FRONT_1, FRAME.BED_BACK_1,
      FRAME.BED_SIDE_LEFT_2, FRAME.BED_SIDE_RIGHT_2, FRAME.BED_FRONT_2, FRAME.BED_BACK_2
    ];
    this.grid.placeAt(x, y, this.create(0, 0, 'roguelikeSheet', this.selectOneInArray(furnitureArray))); // all in one
  }


  addSideMetalBars(...sides) {
    this.sides = sides;
    sides.forEach(side => {
      switch (side) {
        case DIRECTION.UP:
          this._addTopSideMetalBar();
          break;
        case DIRECTION.DOWN:
          this._addBottomSideMetalBar();
          break;
        case DIRECTION.LEFT:
          this._addLeftSideMetalBar();
          break;
        case DIRECTION.RIGHT:
          this._addRightSideMetalBar();
          break;
      }
    })
  }

  _addTopSideMetalBar() {
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR);
      metalBar.anchor.setTo(0.4, 1);
      metalBar.angle = 90;
      this.grid.placeAt(i, 0, metalBar);
    }
  }

  _addBottomSideMetalBar() {
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR);
      metalBar.anchor.setTo(0.5, 1);
      metalBar.angle = 90;
      this.grid.placeAt(i, config.cellsPerRoomSide, metalBar);
    }
  }

  _addLeftSideMetalBar() {
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR);
      metalBar.anchor.setTo(0.4, 0);
      this.grid.placeAt(0, i, metalBar);
    }
  }

  _addRightSideMetalBar() {
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR);
      metalBar.anchor.setTo(0.5, 0);
      this.grid.placeAt(config.cellsPerRoomSide, i, metalBar);
    }
  }

  addSideWalls(...sides) {
    this.sides = sides;
    sides.forEach(side => {
      switch (side) {
        case DIRECTION.UP:
          this._addTopSideWall();
          break;
        case DIRECTION.DOWN:
          this._addBottomSideWall();
          break;
        case DIRECTION.LEFT:
          this._addLeftSideWall();
          break;
        case DIRECTION.RIGHT:
          this._addRightSideWall();
          break;
      }
    })
  }

  _addTopSideWall() {
    const yPos = 0;
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.grid.placeAt(i, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_HORIZONTAL));
    }
    const endLeftSprite = this.hasLeftSideWall() ? FRAME.WALL_CORNER_TOP_LEFT : FRAME.WALL_DEADEND_LEFT;
    this.grid.placeAt(0, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endLeftSprite));
    const endRightSprite = this.hasRightSideWall() ? FRAME.WALL_CORNER_TOP_RIGHT : FRAME.WALL_DEADEND_RIGHT;
    this.grid.placeAt(config.cellsPerRoomSide - 1, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endRightSprite));
  }

  _addBottomSideWall() {
    const yPos = config.cellsPerRoomSide - 1;
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.grid.placeAt(i, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_HORIZONTAL));
    }
    const endLeftSprite = this.hasLeftSideWall() ? FRAME.WALL_CORNER_BOT_LEFT : FRAME.WALL_DEADEND_LEFT;
    this.grid.placeAt(0, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endLeftSprite));
    const endRightSprite = this.hasRightSideWall() ? FRAME.WALL_CORNER_BOT_RIGHT : FRAME.WALL_DEADEND_RIGHT;
    this.grid.placeAt(config.cellsPerRoomSide - 1, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endRightSprite));
  }

  _addLeftSideWall() {
    const xPos = 0;
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.grid.placeAt(xPos, i, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_VERTICAL));
    }
    const endTopSprite = this.hasTopSideWall() ? FRAME.WALL_CORNER_TOP_LEFT : FRAME.WALL_DEADEND_TOP;
    this.grid.placeAt(xPos, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endTopSprite));
    const endBottomSprite = this.hasBottomSideWall() ? FRAME.WALL_CORNER_BOT_LEFT : FRAME.WALL_DEADEND_BOTTOM;
    this.grid.placeAt(xPos, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endBottomSprite));
  }

  _addRightSideWall() {
    const xPos = config.cellsPerRoomSide - 1;
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.grid.placeAt(xPos, i, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_VERTICAL));
    }
    const endTopSprite = this.hasTopSideWall() ? FRAME.WALL_CORNER_TOP_RIGHT : FRAME.WALL_DEADEND_TOP;
    this.grid.placeAt(xPos, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endTopSprite));
    const endBottomSprite = this.hasBottomSideWall() ? FRAME.WALL_CORNER_BOT_RIGHT : FRAME.WALL_DEADEND_BOTTOM;
    this.grid.placeAt(xPos, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endBottomSprite));
  }

  hasLeftSideWall() {
    return this.sides.includes(DIRECTION.LEFT);
  }

  hasRightSideWall() {
    return this.sides.includes(DIRECTION.RIGHT);
  }

  hasTopSideWall() {
    return this.sides.includes(DIRECTION.UP);
  }

  hasBottomSideWall() {
    return this.sides.includes(DIRECTION.DOWN);
  }
}

BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET = 'roguelikeSheet';
BaseRoom.METAL_BAR_SPRITE_SHEET = 'roguelikeIndoor';
