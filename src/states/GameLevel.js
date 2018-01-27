/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import LevelGrid from "../grid/LevelGrid";

export default class extends Phaser.State {
  init() {
    this.roomsPerLevelSide = 5 // Can be overriden per level
  }

  getRoomWidthInPx() {
    return config.levelGridWidth / this.roomsPerLevelSide
  }

  getRoomHeightInPx() {
    return config.levelGridHeight / this.roomsPerLevelSide
  }

  preload() {
    game.world.setBounds(0, 0, config.worldWidth, config.worldHeight)
    //game.world.scale.setTo(1.1) // Camera zoom
    this.rootGroup = new Phaser.Group(game, /*parent=*/null, /*name=*/'rootGroup')
    console.log('rootGroup pos', this.rootGroup.x, this.rootGroup.y)

    this.levelGrid = new LevelGrid(this.roomsPerLevelSide, config.levelGridWidth, config.levelGridHeight, this.rootGroup);
    //this.levelGrid.showForDebug();

    this.nextLevel = null // By default we consider the level to be the last one
    this.currentRoom = null // Dummy, must be overriden by child level
  }

  create() {
    this.cursor = new Cursor(this.getRoomWidthInPx(), this.getRoomHeightInPx(), this.rootGroup)
    game.add.existing(this.cursor)

    const cursorKeys = game.input.keyboard.createCursorKeys()
    cursorKeys.left.onDown.add(() => this.moveCursor('left', -1, 0))
    cursorKeys.right.onDown.add(() => this.moveCursor('right', 1, 0))
    cursorKeys.up.onDown.add(() => this.moveCursor('up', 0, -1))
    cursorKeys.down.onDown.add(() => this.moveCursor('down', 0, 1))
  }

  moveCursor(direction, deltaX, deltaY) {
    if (!this.currentRoom.exits.includes(direction)) {
      console.log('Cannot go ' + direction + ' in current room')
      return
    }
    const [srcX, srcY] = [this.currentRoom.gridPosX, this.currentRoom.gridPosY]
    const [dstX, dstY] = [srcX + deltaX, srcY + deltaY]
    const newRoom = this.levelGrid.roomAtPos(dstX, dstY)
    if (newRoom) {
      this.currentRoom = newRoom
      console.log('Moved from', [srcX, srcY], 'to', [dstX, dstY])
      console.log('New room pos:', this.currentRoom.position)
      console.log('cursor pos:', this.cursor.position)
      console.log('levelGrid world pos:', this.levelGrid.position)
      /*console.log('levelGrid 1st room world pos:', this.levelGrid.rooms[0][0].position)
       const sprite = this.levelGrid.rooms[0][0].topLeftCorner
       console.log('sprite world pos:', sprite.world)*/
    } else {
      console.log('Cannot move from', [srcX, srcY], 'to', [dstX, dstY])
    }
  }

  update() {
    super.update()
    this.cursor.x = this.currentRoom.x
    this.cursor.y = this.currentRoom.y
    //game.camera.focusOnXY(200, 200)
    //game.camera.focusOn(this.cursor)
    if (this.currentRoom.isEndCell) {
      // TODO: Show a test message beforehand
      this.state.start(this.nextLevel)
    } else if (this.currentRoom.baddiesCount > this.currentRoom.alliesCount) {
      // TODO: Show a test message beforehand
      this.state.start('Level0')
    }
  }

  render() {
    if (__DEV__) {
      //game.debug.spriteInfo(, 32, 32)
      //game.debug.cameraInfo(game.camera, 32, 32)
    }
  }
}
