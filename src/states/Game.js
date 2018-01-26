/* globals __DEV__ */
import Phaser from 'phaser'
import Guard from '../sprites/characters/Guard'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.guard = new Guard({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
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
