import Phaser from "phaser-ce/build/custom/phaser-split";
import RoomGrid from "../../grid/RoomGrid";
import config from "../../config";
import DIRECTION from "../../const/Direction";
import FRAME from "../../const/Frame";

export default class BaseRoom extends Phaser.Group {
    constructor() {
        super(game);
        this.grid = new RoomGrid(config.cellsPerRoomSide, BaseRoom.getWidth(), BaseRoom.getHeight())
        //this.grid.showForDebug()
        this.exits = [Object.values(DIRECTION)]
        this.alliesCount = 0
        this.baddiesCount = 0
        this.isEndCell = false
    }

    /**********
     * Getters
     *********/
    exits() {
        return this.exits
    }

    /**********
     * Setters
     *********/
    setGroundTiles() {
        for (let i = 0; i < config.cellsPerRoomSide ; i++) {
            for (let j = 0; j < config.cellsPerRoomSide; j++) {
                this.grid.placeAt(i, j, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.FLOOR_CELL_BASIC_CTR_MID));
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
        this.alliesCount += 1
    }

    addBaddy(x, y) {
        console.log('addBaddy', x, y)
        this.baddiesCount += 1
    }

    addFurniture(x, y, spriteIndex) {
        console.log('addFurniture', x, y, spriteIndex)
    }

    addSideWalls(...sides) {
        console.log('addSideWall', sides);
        this.sides = sides;
        sides.forEach(side => {
            console.log(`add wall ${side}`);
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

    addSideBar(side) {
        console.log('addSideBar', side)
    }
}

BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET = 'roguelikeSheet';
BaseRoom.getWidth = () => config.levelGridWidth / config.roomsPerLevelSide;
BaseRoom.getHeight = () => config.levelGridHeight / config.roomsPerLevelSide;
