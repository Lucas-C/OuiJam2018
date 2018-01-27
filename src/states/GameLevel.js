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

    this.dialogFrame = this._createDialogFrame()

    const cursorKeys = game.input.keyboard.createCursorKeys()
    cursorKeys.left.onDown.add(() => this.moveCursor('left', -1, 0))
    cursorKeys.right.onDown.add(() => this.moveCursor('right', 1, 0))
    cursorKeys.up.onDown.add(() => this.moveCursor('up', 0, -1))
    cursorKeys.down.onDown.add(() => this.moveCursor('down', 0, 1))

    if (this.currentRoom.onEnterPrecondition) {
      this.currentRoom.onEnterPrecondition()
    }
  }

  moveCursor(direction, deltaX, deltaY) {
    this.dialogFrame.visible = false
    if (!this.currentRoom.exits.includes(direction)) {
      console.log('Cannot go ' + direction + ' in current room')
      return
    }
    const [srcX, srcY] = [this.currentRoom.gridPosX, this.currentRoom.gridPosY]
    const [dstX, dstY] = [srcX + deltaX, srcY + deltaY]
    const newRoom = this.levelGrid.roomAtPos(dstX, dstY)
    if (newRoom) {
      if (newRoom.onEnterPrecondition && newRoom.onEnterPrecondition() === false) {
        console.log('newRoom.onEnterPrecondition exists and returned false => not entering it')
        return
      }
      this.currentRoom = newRoom
      console.log('Moved from', [srcX, srcY], 'to', [dstX, dstY])
      console.log('New room pos:', this.currentRoom.position)
      console.log('cursor pos:', this.cursor.position)
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

    const successMsg = 'Good job !'
    const failureMsg = "It's all lost !\nThe message bearer has been backstabbed by a fascist"
    if (this.currentRoom.isEndCell) {
      if (!this.dialogFrame.visible && this.dialogFrame.text === successMsg) {
        this.state.start(this.nextLevel)
      } else {
        this.displayMessage(successMsg)
      }
    } else if (this.currentRoom.baddiesCount > this.currentRoom.alliesCount) {
      if (!this.dialogFrame.visible && this.dialogFrame.text === failureMsg) {
        this.state.start('Level0')
      } else {
        this.displayMessage(failureMsg)
      }
    }
  }

  _createDialogFrame() {
    const dialogFrame = this.add.text(config.gameWidth / 2, config.gameHeight * .08, '', {
      font: '36px VT323',
      fill: '#427a64',
      smoothed: false,
      align: "center",
    })
    dialogFrame.lineSpacing = 0
    dialogFrame.anchor.setTo(0.5)
    dialogFrame.visible = false
    this.game.input.keyboard.onPressCallback = () => dialogFrame.visible = false
    return dialogFrame
  }

  displayMessage(msg) {
    this.dialogFrame.text = msg
    this.dialogFrame.visible = true
  }

  render() {
    if (__DEV__) {
      //game.debug.spriteInfo(this.dialogFrame, 400, 600)
      //game.debug.cameraInfo(game.camera, 32, 32)
    }
  }
}
