/* globals __DEV__ */
import Phaser from 'phaser'
import Guard from '../sprites/characters/Guard'
import DefaultCell from '../sprites/cells/DefaultCell'
import AlignGrid from "../grid/AlignGrid";

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.mainGrid = new AlignGrid(5, 5);
    this.mainGrid.show();

    this.guard = new Guard({
        game: this.game,
        x: this.world.centerX,
        y: this.world.centerY
    })
    this.game.add.existing(this.guard)
  }

  update () {
      this.guard.update()
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.guard, 32, 32)
    }
  }
}
