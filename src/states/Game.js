/* globals __DEV__ */
import Phaser from 'phaser'
import Guard from '../sprites/Guard'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Phaser + ES6 + Webpack'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false
    })

    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)

    this.guard = new Guard({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
    })

    this.game.add.existing(this.guard)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.guard, 32, 32)
    }
  }
}
