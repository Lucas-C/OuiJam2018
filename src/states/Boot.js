import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#EDEEC9'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Bangers']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')

    this.load.spritesheet('roguelikeChar', './assets/images/roguelikeChar_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeDungeon', './assets/images/roguelikeDungeon_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeIndoor', './assets/images/roguelikeIndoor_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeSheet', './assets/images/roguelikeSheet_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
