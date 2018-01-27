import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init () {}

  preload () {}

  create () {
      const titleText = 'Intro'
      const title = this.add.text(this.world.centerX, .3 * config.getGameHeight(), titleText, {
          font: '80px Bangers',
          fill: '#D86785',
          smoothed: false
      })
      title.padding.set(10, 16)
      title.anchor.setTo(0.5)

      const bannerText = 'Press any key to continue'
      const banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
          font: '40px Bangers',
          fill: '#77BFA3',
          smoothed: false
      })
      banner.padding.set(10, 16)
      banner.anchor.setTo(0.5)

      this.game.input.keyboard.onPressCallback = () => this.state.start('Level0')
  }
}
