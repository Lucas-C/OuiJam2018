/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import LevelGrid from "../grid/LevelGrid";

export default class extends Phaser.State {
    init() {}

    preload() {}

    create() {
        this.game.world.setBounds(0, 0, 2000, 2000)

        this.nextLevel = null // By default we consider the level to be the last one
        this.levelGrid = new LevelGrid(config.cellsPerLine, config.levelGridWidth, config.levelGridHeight);
        this.levelGrid.showForDebug();
        this.currentRoom = null // Dummy, must be overriden by child level

        this.cursor = new Cursor({game: this.game})
        this.game.add.existing(this.cursor)

        const cursorKeys = game.input.keyboard.createCursorKeys();
        cursorKeys.left.onDown.add(() => this.currentRoom.x -= 1)
        cursorKeys.right.onDown.add(() => this.currentRoom.x += 1)
        cursorKeys.up.onDown.add(() => this.currentRoom.y -= 1)
        cursorKeys.down.onDown.add(() => this.currentRoom.y += 1)
    }

    update() {
        super.update()
        //console.log('currentRoom:', this.currentRoom)
        game.camera.x = this.currentRoom.x * config.getRoomSize();
        game.camera.y = this.currentRoom.y *config.getRoomSize();
        this.cursor.update()
        if (this.currentRoom.isEndCell) {
            // TODO: Show a test message beforehand
            this.state.start(this.nextLevel)
        } else if (this.currentRoom.baddiesCount() > this.currentRoom.alliesCount()) {
            // TODO: Show a test message beforehand
            this.state.start('Level0')
        }
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.guard, 32, 32)
        }
    }
}
