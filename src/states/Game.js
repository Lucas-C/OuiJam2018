/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import Guard from '../sprites/characters/Guard'
import AlignGrid from "../grid/AlignGrid";

export default class extends Phaser.State {
    init() {
    }

    preload() {
    }

    create() {
        this.game.world.setBounds(0, 0, 2000, 2000)
        this.cursorKeys = game.input.keyboard.createCursorKeys();

        this.mainGrid = new AlignGrid(5, 5);
        this.mainGrid.show();

        this.currentRoom = new Phaser.Point()

        this.cursor = new Cursor({game: this.game})
        this.game.add.existing(this.cursor)

        this.guard = new Guard({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY
        })
        this.game.add.existing(this.guard)
    }

    update() {
        this.cursorKeys.left.onDown.add(() => this.currentRoom.x -= 1 && console.log('LEFT'))
        this.cursorKeys.right.onDown.add(() => this.currentRoom.x += 1 && console.log('RIGHt'))
        this.cursorKeys.up.onDown.add(() => this.currentRoom.y -= 1 && console.log('UP'))
        this.cursorKeys.down.onDown.add(() => this.currentRoom.y += 1 && console.log('DOWN'))
        //console.log('currentRoom:', this.currentRoom)
        game.camera.y = this.currentRoom.x * config.getRoomSize();
        game.camera.y = this.currentRoom.y *config.getRoomSize();
        this.cursor.update()
        this.guard.update()
    }

    render() {
        if (__DEV__) {
            //this.game.debug.spriteInfo(this.guard, 32, 32)
        }
    }
}
