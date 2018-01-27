import Phaser from 'phaser'
import config from '../config'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('roguelikeChar', './assets/images/roguelikeChar_transparent.png', 16, 16, /*frameMax=*/647, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeDungeon', './assets/images/roguelikeDungeon_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeIndoor', './assets/images/roguelikeIndoor_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeSheet', './assets/images/roguelikeSheet_transparent.png', 16, 16, /*frameMax=*/1824, /*margin=*/0, /*space=*/1)
  }

  create () {
      const titleText = 'Our GGJ game name !'
      const title = this.add.text(this.world.centerX, .3 * config.getGameHeight(), titleText, {
          font: '80px Bangers',
          fill: '#D86785',
          smoothed: false
      })
      title.padding.set(10, 16)
      title.anchor.setTo(0.5)

      const footerText = 'Press any key to continue'
      const banner = this.add.text(this.world.centerX, this.game.height - 80, footerText, {
          font: '40px Bangers',
          fill: '#77BFA3',
          smoothed: false
      })
      banner.padding.set(10, 16)
      banner.anchor.setTo(0.5)

      this.game.input.keyboard.onPressCallback = () => this.state.start('Intro')
  }
}
