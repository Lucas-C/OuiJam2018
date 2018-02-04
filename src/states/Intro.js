import Phaser from 'phaser'
import {centerGameObjects} from '../utils'

export default class extends Phaser.State {
  init () {
  }

  preload () {
    this.game.load.image('background', 'assets/images/wallpaper-jail.jpg')

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('roguelikeChar', './assets/images/roguelikeChar_transparent.png', 16, 16, /* frameMax= */647, /* margin= */0, /* space= */1)
    this.load.spritesheet('roguelikeDungeon', './assets/images/roguelikeDungeon_transparent.png', 16, 16, /* frameMax= */521, /* margin= */0, /* space= */1)
    this.load.spritesheet('roguelikeIndoor', './assets/images/roguelikeIndoor_transparent.png', 16, 16, /* frameMax= */503, /* margin= */0, /* space= */1)
    this.load.spritesheet('roguelikeSheet', './assets/images/roguelikeSheet_transparent.png', 16, 16, /* frameMax= */1824, /* margin= */0, /* space= */1)
    this.load.spritesheet('rpgportraits', './assets/images/rpgportraits.png', 32, 32, /* frameMax= */27, /* margin= */4, /* space= */4)

    this.load.image('portraitNellaMandelson', './assets/images/NellaMandelson2.png', 32, 32)
    this.load.image('line', './assets/images/line.png', 600, 2)
    this.load.image('warning', './assets/images/warning.png', 128, 128)
    this.load.image('skull1', './assets/images/skull1.png', 128, 128)
    this.load.image('skull2', './assets/images/skull2.png', 128, 128)
    this.load.image('skull3', './assets/images/skull3.png', 128, 128)

    this.game.load.audio('medievalPrison', ['assets/audio/medieval_prison.mp3'])
    this.game.load.audio('move1', ['assets/audio/move_1.mp3'])
    this.game.load.audio('move2', ['assets/audio/move_2.mp3'])
    this.game.load.audio('clock', ['assets/audio/clock.ogg'])
  }

  create () {
    // Musique
    var music = this.game.add.audio('medievalPrison')
    music.play()

    var bck = this.game.add.sprite(0, 0, 'background')
    bck.scale.setTo(1, 1)
    bck.width = 800
    bck.height = 800

    const titleText = 'THE KING MUST KNOW ! '
    const title = this.add.text(this.world.centerX, 0.2 * this.game.height, titleText, {
      font: '80px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8
    })
    title.padding.set(10, 16)
    title.anchor.setTo(0.5)

    var bars = this.game.add.sprite(this.world.centerX, 0.4 * this.game.height, 'roguelikeSheet', 203)
    bars.scale.setTo(8)
    bars.anchor.setTo(0.5)

    this.makeGuard(this.world.centerX - 150, 0.4 * this.game.height)
    this.makeGuard(this.world.centerX + 150, 0.4 * this.game.height)

    const gameDescText = 'You are Nella Mandelson, unjustly imprisoned.\nTo save thousands of innocent people, your letter must reach the king ! '
    const gameDesc = this.add.text(this.world.centerX, 0.6 * this.game.height, gameDescText, {
      font: '28px Bangers',
      fill: '#D86785',
      smoothed: false,
      align: 'center',
      stroke: '#000000',
      strokeThickness: 4
    })
    gameDesc.padding.set(10, 16)
    gameDesc.anchor.setTo(0.5)

    const bannerText = 'Press any key to continue '
    const banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
      font: '40px Bangers',
      fill: '#77BFA3',
      smoothed: false,
      align: 'center',
      stroke: '#000000',
      strokeThickness: 6
    })
    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
    banner.alpha = 0.1

    this.blinkText(banner)

    this.game.input.keyboard.onPressCallback = () => this.state.start('Level0')
  }

  blinkText (text) {
    this.game.add.tween(text).to({alpha: 1}, 2000, 'Linear', true)
  }

  makeGuard (baseX, baseY) {
    var charBase = this.game.add.sprite(baseX, baseY, 'roguelikeChar', 1)
    charBase.scale.setTo(6)
    charBase.anchor.setTo(0.5)
    var charPant = this.game.add.sprite(charBase.centerX - 6, charBase.centerY, 'roguelikeChar', 3)
    charPant.scale.setTo(6)
    charPant.anchor.setTo(0.5)
    var charArmor = this.game.add.sprite(charBase.centerX - 6, charBase.centerY, 'roguelikeChar', 6)
    charArmor.scale.setTo(6)
    charArmor.anchor.setTo(0.5)
    var charHelm = this.game.add.sprite(charBase.centerX - 6, charBase.centerY, 'roguelikeChar', 28)
    charHelm.scale.setTo(6)
    charHelm.anchor.setTo(0.5)
    var charShield = this.game.add.sprite(charBase.centerX - 6, charBase.centerY, 'roguelikeChar', 256)
    charShield.scale.setTo(6)
    charShield.anchor.setTo(0.5)
    var charWeapon = this.game.add.sprite(charBase.centerX - 6, charBase.centerY, 'roguelikeChar', 49)
    charWeapon.scale.setTo(6)
    charWeapon.anchor.setTo(0.5)
  }
}
