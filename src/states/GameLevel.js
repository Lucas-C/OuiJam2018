/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import LevelGrid from "../grid/LevelGrid";

export default class extends Phaser.State {
    init() {}

    preload() {
      game.world.setBounds(0, 0, 2000, 2000)
      this.rootGroup = new Phaser.Group(game, /*parent=*/null, /*name=*/'rootGroup')

      this.levelGrid = new LevelGrid(config.cellsPerLine, config.levelGridWidth, config.levelGridHeight, this.rootGroup);
      //this.levelGrid.showForDebug();

      this.nextLevel = null // By default we consider the level to be the last one
      this.currentRoom = null // Dummy, must be overriden by child level
    }

    create() {
        this.cursor = new Cursor(this.rootGroup)
        game.add.existing(this.cursor)

        const cursorKeys = game.input.keyboard.createCursorKeys()
        cursorKeys.left.onDown.add(() => this.moveCursor(-1, 0))
        cursorKeys.right.onDown.add(() => this.moveCursor(1, 0))
        cursorKeys.up.onDown.add(() => this.moveCursor(0, -1))
        cursorKeys.down.onDown.add(() => this.moveCursor(0, 1))
    }

    moveCursor(deltaX, deltaY) {
      const [srcX, srcY] = [this.currentRoom.gridPosX, this.currentRoom.gridPosY]
      const [dstX, dstY] = [srcX + deltaX, srcY + deltaY]
      const newRoom = this.levelGrid.roomAtPos(dstX, dstY)
      if (newRoom) {
        this.currentRoom = newRoom
        console.log('Moved from', [srcX, srcY], 'to', [dstX, dstY])
        console.log('New room pos:', [this.currentRoom.x, this.currentRoom.y])
      } else {
        console.log('Cannot move from', [srcX, srcY], 'to', [dstX, dstY])
      }
    }

    update() {
        super.update()
        game.camera.x = this.currentRoom.x// - config.getGameWidth() / 2;
        game.camera.y = this.currentRoom.y// - config.getGameHeight() / 2;
        this.cursor.x = this.currentRoom.x
        this.cursor.y = this.currentRoom.y
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
            //game.debug.spriteInfo(this.guard, 32, 32)
        }
    }
}
