/* globals __DEV__ */
import Phaser from 'phaser'
import Cursor from '../sprites/Cursor'
import Inmat from '../sprites/characters/Inmate'
import Guard from '../sprites/characters/Guard'
import DefaultCell from '../sprites/cells/DefaultCell'
import AlignGrid from "../grid/AlignGrid";

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.mainGrid = new AlignGrid(5, 5);
    this.mainGrid.show();

    this.cursor = new Cursor({game: this.game})
    this.game.add.existing(this.cursor)

    this.guard = new Guard({
        game: this.game,
        x: this.world.centerX,
        y: this.world.centerY
    })
    this.game.add.existing(this.guard)
  }

  update () {
      this.cursor.update()
      this.guard.update()
  }

  render () {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.guard, 32, 32)
    }
  }
}
