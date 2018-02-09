import Phaser from 'phaser-ce/build/custom/phaser-split'
import config from '../../config'
import RoomGrid from '../../grid/RoomGrid'
import Inmate from '../../sprites/characters/Inmate'
import {DIRECTION, oppositeDir} from '../../const/Direction'
import FRAME from '../../const/Frame'
import {selectOneInArray} from '../../utils'

export default class BaseRoom extends Phaser.Group {
  constructor (roomWidth, roomHeight) {
    super(window.game)
    this.roomWidth = roomWidth
    this.roomHeight = roomHeight
    this.cellsGrid = new RoomGrid(config.cellsPerRoomSide, roomWidth, roomHeight)
    // this.cellsGrid.showForDebug()
    this.sideWalls = []
    this.sideBars = []
    this.characters = []
    this.windowSprite = null
    this.groundTilesIndices = null // Must be set by child classes
  }

  allies () {
    return this.characters.filter(c => c.isAlly)
  }

  baddies () {
    return this.characters.filter(c => !c.isAlly)
  }

  isDangerous () {
    return this.baddies().length > 0
  }

  getRoomInDirection ({deltaX, deltaY}) {
    const [dstX, dstY] = [this.gridPos.x + deltaX, this.gridPos.y + deltaY]
    return this.parentLevelGrid.roomAtPos(dstX, dstY)
  }

  /*
   * If this & destRoom are not aligned:
   * - if they are more distant from each other on one orthogonal axis,
   *   then return the direction on this axis
   * - else, if they are on an exact diagonal,
   *   then return consistently the first direction of the diagonal, clockwise,
   *   so that `A.getPassingToRoom(B)` is always the opposite of `B.getPassingToRoom(A)`
   */
  getDirectionToRoom (destRoom) {
    const distX = Math.abs(this.gridPos.x - destRoom.gridPos.x)
    const distY = Math.abs(this.gridPos.y - destRoom.gridPos.y)
    if (distY === distX) {
      if (destRoom.gridPos.y > this.gridPos.y) {
        return destRoom.gridPos.x > this.gridPos.x ? DIRECTION.DOWN : DIRECTION.LEFT
      } else {
        return destRoom.gridPos.x < this.gridPos.x ? DIRECTION.UP : DIRECTION.RIGHT
      }
    }
    if (distY > distX) {
      return destRoom.gridPos.y > this.gridPos.y ? DIRECTION.DOWN : DIRECTION.UP
    } else {
      return destRoom.gridPos.x > this.gridPos.x ? DIRECTION.RIGHT : DIRECTION.LEFT
    }
  }

  getPassingToRoom (destRoom) {
    const passing = {
      bars: false,
      walls: false
    }
    const dirToDest = this.getDirectionToRoom(destRoom)
    if (this.sideBars.includes(dirToDest)) {
      passing.bars = true
    }
    if (this.sideWalls.includes(dirToDest)) {
      passing.walls = true
    }
    const dirFromDest = destRoom.getDirectionToRoom(this)
    if (destRoom.sideBars.includes(dirFromDest)) {
      passing.bars = true
    }
    if (destRoom.sideWalls.includes(dirFromDest)) {
      passing.walls = true
    }
    return passing
  }

  /*
   * Given a tile T1 in a room R1 (this),
   * compute the relative position in px of a tile T2 in another room R2.
   * If no source tile gridPos is specified, consider the top right corner
   */
  getDeltaToTileInRoom ({room, toTileGridPos, fromTileGridPos}) {
    if (!fromTileGridPos) {
      fromTileGridPos = {x: 0, y: 0}
    }
    return {
      x: (room.gridPos.x - this.gridPos.x) * this.parentLevelGrid.widthCell + (toTileGridPos.x - fromTileGridPos.x) * room.cellsGrid.widthCell,
      y: (room.gridPos.y - this.gridPos.y) * this.parentLevelGrid.heightCell + (toTileGridPos.y - fromTileGridPos.y) * room.cellsGrid.heightCell
    }
  }

  /**********
   * Setters
   *********/
  setUniformBackground (color) {
    this.background = window.game.add.graphics(0, 0)
    this.add(this.background)
    this.background.beginFill(color)
    this.background.drawRect(0, 0, this.roomWidth, this.roomHeight)
    this.background.endFill()
  }

  setGroundTiles () {
    /*
    // Corners:
    this.cellsGrid.placeAt(0, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_LFT));
    this.cellsGrid.placeAt(0, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_LFT));
    this.cellsGrid.placeAt(config.cellsPerRoomSide - 1, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_RGT));
    this.cellsGrid.placeAt(config.cellsPerRoomSide - 1, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_RGT));

    // Sides:
    for (let k = 1; k < config.cellsPerRoomSide - 1; k++) {
      this.cellsGrid.placeAt(k, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.TOP_MID));
      this.cellsGrid.placeAt(k, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.BOT_MID));
      this.cellsGrid.placeAt(0, k, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_LFT));
      this.cellsGrid.placeAt(config.cellsPerRoomSide - 1, k, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_RGT));
    }
    */
    // Middle:
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      for (let j = 0; j < config.cellsPerRoomSide; j++) {
        this.cellsGrid.placeAt(i, j, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, this.groundTilesIndices.CTR_MID))
      }
    }
  }

  addNellaMandelson (x, y) {
    const character = new Inmate({frames: [FRAME.NELLA_MANDELSON], isAlly: true, room: this, name: 'Nella Mandelson'})
    this.cellsGrid.placeAt(x, y, character)
    this.characters.push(character)
    return character
  }

  addEndWindow (x, y) {
    this.windowSprite = this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WINDOW_1)
    this.cellsGrid.placeAt(x, y, this.windowSprite)
    this.cellsGrid.placeAt(x, y, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.CURTAINS_1))
    return this
  }

  addAlly (x, y) {
    const frames = [
      selectOneInArray([0, 1]), // bases
      selectOneInArray([10, 14, 327, 381]), // clothes
      selectOneInArray([19, 21]) // hair
    ]
    const character = new Inmate({frames: frames, isAlly: true, room: this})
    this.cellsGrid.placeAt(x, y, character)
    this.characters.push(character)
    return this
  }

  addBaddy (x, y) {
    const character = new Inmate({frames: [selectOneInArray(FRAME.BADDIES)], isAlly: false, room: this})
    this.cellsGrid.placeAt(x, y, character)
    this.characters.push(character)
    return this
  }

  addGuard (x, y) {
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([0, 1])))
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([3])))
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([6])))
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([28])))
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([256])))
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeChar', selectOneInArray([49])))
    return this
  }

  addFurniture (x, y) {
    let furnitureArray = [
      FRAME.CHAIR_FRONT_1, FRAME.CHAIR_FRONT_2, FRAME.CHAIR_FRONT_3, FRAME.CHAIR_FRONT_4,
      FRAME.CHAIR_SIDE_LEFT_1, FRAME.CHAIR_SIDE_LEFT_2, FRAME.CHAIR_SIDE_LEFT_3, FRAME.CHAIR_SIDE_LEFT_4,
      FRAME.CHAIR_SIDE_RIGHT_1, FRAME.CHAIR_SIDE_RIGHT_2, FRAME.CHAIR_SIDE_RIGHT_3, FRAME.CHAIR_SIDE_RIGHT_4,
      FRAME.BED_SIDE_LEFT_1, FRAME.BED_SIDE_RIGHT_1, FRAME.BED_FRONT_1, FRAME.BED_BACK_1,
      FRAME.BED_SIDE_LEFT_2, FRAME.BED_SIDE_RIGHT_2, FRAME.BED_FRONT_2, FRAME.BED_BACK_2
    ]
    this.cellsGrid.placeAt(x, y, this.create(0, 0, 'roguelikeSheet', selectOneInArray(furnitureArray))) // all in one
    return this
  }

  addDecoCell (x, y) {
    let decoArray = [58, 59, 60, 61, 62, 63, 64, 65, 36, 7]
    this.addDeco(x, y, 'roguelikeDungeon', decoArray)
  }

  addDecoCorridor (x, y) {
    let decoArray = [7, 16, 17, 122, 286, 293]
    this.addDeco(x, y, 'roguelikeIndoor', decoArray)
  }

  addDeco (x, y, spriteSheet, indices) {
    var decoration = this.create(0, 0, spriteSheet, selectOneInArray(indices))
    decoration.alpha = 0.5
    this.cellsGrid.placeAt(x, y, decoration)
    return this
  }

  addSideMetalBars (...sideBars) {
    this.sideBars = sideBars
    sideBars.forEach(sideBar => {
      switch (sideBar) {
        case DIRECTION.UP:
          this._addTopSideMetalBar()
          break
        case DIRECTION.DOWN:
          this._addBottomSideMetalBar()
          break
        case DIRECTION.LEFT:
          this._addLeftSideMetalBar()
          break
        case DIRECTION.RIGHT:
          this._addRightSideMetalBar()
          break
      }
    })
    return this
  }

  _addTopSideMetalBar () {
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR)
      metalBar.anchor.setTo(0.4, 1)
      metalBar.angle = 90
      this.cellsGrid.placeAt(i, 0, metalBar)
    }
  }

  _addBottomSideMetalBar () {
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR)
      metalBar.anchor.setTo(0.5, 1)
      metalBar.angle = 90
      this.cellsGrid.placeAt(i, config.cellsPerRoomSide, metalBar)
    }
  }

  _addLeftSideMetalBar () {
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR)
      metalBar.anchor.setTo(0.4, 0)
      this.cellsGrid.placeAt(0, i, metalBar)
    }
  }

  _addRightSideMetalBar () {
    for (let i = 0; i < config.cellsPerRoomSide; i++) {
      const metalBar = this.create(0, 0, BaseRoom.METAL_BAR_SPRITE_SHEET, FRAME.METAL_BAR)
      metalBar.anchor.setTo(0.5, 0)
      this.cellsGrid.placeAt(config.cellsPerRoomSide, i, metalBar)
    }
  }

  addSideWalls (...sideWalls) {
    this.sideWalls = sideWalls
    sideWalls.forEach(sideWall => {
      switch (sideWall) {
        case DIRECTION.UP:
          this._addTopSideWall()
          break
        case DIRECTION.DOWN:
          this._addBottomSideWall()
          break
        case DIRECTION.LEFT:
          this._addLeftSideWall()
          break
        case DIRECTION.RIGHT:
          this._addRightSideWall()
          break
      }
    })
    return this
  }

  _addTopSideWall () {
    const yPos = 0
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.cellsGrid.placeAt(i, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_HORIZONTAL))
    }
    const endLeftSprite = this.hasLeftSideWall() ? FRAME.WALL_CORNER_TOP_LEFT : FRAME.WALL_DEADEND_LEFT
    this.cellsGrid.placeAt(0, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endLeftSprite))
    const endRightSprite = this.hasRightSideWall() ? FRAME.WALL_CORNER_TOP_RIGHT : FRAME.WALL_DEADEND_RIGHT
    this.cellsGrid.placeAt(config.cellsPerRoomSide - 1, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endRightSprite))
  }

  _addBottomSideWall () {
    const yPos = config.cellsPerRoomSide - 1
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.cellsGrid.placeAt(i, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_HORIZONTAL))
    }
    const endLeftSprite = this.hasLeftSideWall() ? FRAME.WALL_CORNER_BOT_LEFT : FRAME.WALL_DEADEND_LEFT
    this.cellsGrid.placeAt(0, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endLeftSprite))
    const endRightSprite = this.hasRightSideWall() ? FRAME.WALL_CORNER_BOT_RIGHT : FRAME.WALL_DEADEND_RIGHT
    this.cellsGrid.placeAt(config.cellsPerRoomSide - 1, yPos, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endRightSprite))
  }

  _addLeftSideWall () {
    const xPos = 0
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.cellsGrid.placeAt(xPos, i, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_VERTICAL))
    }
    const endTopSprite = this.hasTopSideWall() ? FRAME.WALL_CORNER_TOP_LEFT : FRAME.WALL_DEADEND_TOP
    this.cellsGrid.placeAt(xPos, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endTopSprite))
    const endBottomSprite = this.hasBottomSideWall() ? FRAME.WALL_CORNER_BOT_LEFT : FRAME.WALL_DEADEND_BOTTOM
    this.cellsGrid.placeAt(xPos, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endBottomSprite))
  }

  _addRightSideWall () {
    const xPos = config.cellsPerRoomSide - 1
    for (let i = 1; i < config.cellsPerRoomSide - 1; i++) {
      this.cellsGrid.placeAt(xPos, i, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, FRAME.WALL_MIDDLE_VERTICAL))
    }
    const endTopSprite = this.hasTopSideWall() ? FRAME.WALL_CORNER_TOP_RIGHT : FRAME.WALL_DEADEND_TOP
    this.cellsGrid.placeAt(xPos, 0, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endTopSprite))
    const endBottomSprite = this.hasBottomSideWall() ? FRAME.WALL_CORNER_BOT_RIGHT : FRAME.WALL_DEADEND_BOTTOM
    this.cellsGrid.placeAt(xPos, config.cellsPerRoomSide - 1, this.create(0, 0, BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET, endBottomSprite))
  }

  hasLeftSideWall () {
    return this.sideWalls.includes(DIRECTION.LEFT)
  }

  hasRightSideWall () {
    return this.sideWalls.includes(DIRECTION.RIGHT)
  }

  hasTopSideWall () {
    return this.sideWalls.includes(DIRECTION.UP)
  }

  hasBottomSideWall () {
    return this.sideWalls.includes(DIRECTION.DOWN)
  }
}

BaseRoom.WALL_AND_FLOOR_SPRITE_SHEET = 'roguelikeSheet'
BaseRoom.METAL_BAR_SPRITE_SHEET = 'roguelikeIndoor'


// Lucas: I tried to add those has pure NodeJS unit tests with the ava test runner,
// however the p2 PhaserJS dependency cannot by used in NodeJS (it uses `window` at import time)
window.testGetDirectionToRoom = () => { // Unit test runnable in browser
  let result = 'ok'
  const assertEqual = (a, b, ...args) => {
    if (a !== b) {
      console.error('Not equal', a, b, ...args)
      result = 'ko'
    }
  }
  const roomA = new BaseRoom(1, 1)
  roomA.gridPos.x = 0
  roomA.gridPos.y = 0;
  [
    [1, 0], [-1, 0], [0, 1], [0, -1], // orthogonal neighbors
    [1, 1], [-1, 1], [1, -1], [-1, -1], // diagonals
    [1, 2], [2, 1]
  ].forEach(([x, y]) => {
    const roomB = new BaseRoom(1, 1)
    roomB.gridPos.x = x
    roomB.gridPos.y = y
    assertEqual(roomA.getDirectionToRoom(roomB), oppositeDir(roomB.getDirectionToRoom(roomA)), {x, y})
  })
  return result
}
