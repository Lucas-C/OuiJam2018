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
        families: ['Bangers', 'VT323']
      },
      // The following should ideally allow us to load the font locally,
      // but webfontloader never attempt to fetch googlefonts.css :(
      /* custom: {
        families: ['Bangers', 'VT323'],
        url: ['googlefonts.css']
      }, */
      active: this.fontsLoaded,
      inactive: () => console.error('Fonts loading failed (5s timeout)')
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '32px Arial', fill: '#333', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Intro')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
