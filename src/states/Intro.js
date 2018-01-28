import Phaser from 'phaser'
import config from '../config'
import {centerGameObjects} from "../utils";

export default class extends Phaser.State {
  init() {
  }

  preload() {
    game.load.image('background', 'assets/images/wallpaper-jail.jpg');

    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('roguelikeChar', './assets/images/roguelikeChar_transparent.png', 16, 16, /*frameMax=*/647, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeDungeon', './assets/images/roguelikeDungeon_transparent.png', 16, 16, /*frameMax=*/521, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeIndoor', './assets/images/roguelikeIndoor_transparent.png', 16, 16, /*frameMax=*/503, /*margin=*/0, /*space=*/1)
    this.load.spritesheet('roguelikeSheet', './assets/images/roguelikeSheet_transparent.png', 16, 16, /*frameMax=*/1824, /*margin=*/0, /*space=*/1)
    this.load.image('portraitNM1', './assets/images/nm1.png', 32, 32);
    this.load.image('portraitNM2', './assets/images/nm2.png', 32, 32);
    this.load.image('line', './assets/images/line.png', 600, 2);
    this.load.image('warning', './assets/images/warning.png', 128, 128);
    this.load.image('skull', './assets/images/skull.png', 128, 128);

    game.load.audio('medievalPrison', ['assets/audio/medieval_prison.mp3']);
    game.load.audio('move1', ['assets/audio/move_1.mp3']);
    game.load.audio('move2', ['assets/audio/move_2.mp3']);
  }

  create() {
    // Musique
    var music = game.add.audio('medievalPrison');
    music.play();

    var bck = game.add.sprite(0, 0, 'background');
    bck.scale.setTo(1, 1);
    bck.width = 800;
    bck.height = 800;

    const titleText = 'THE KING MUST KNOW ! '
    const title = this.add.text(this.world.centerX, .2 * game.height, titleText, {
      font: '80px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8
    })
    title.padding.set(10, 16)
    title.anchor.setTo(0.5)

    var bars = game.add.sprite(this.world.centerX, .4 * game.height, 'roguelikeSheet', 203);
    bars.scale.setTo(8);
    bars.anchor.setTo(0.5);

    this.makeGuard(this.world.centerX - 150, .4 * game.height);
    this.makeGuard(this.world.centerX + 150, .4 * game.height);

    const gameDescText = 'You are Nella Mandelson, unjustly imprisoned.\nTo save thousands of innocent people, your letter must reach the king ! '
    const gameDesc = this.add.text(this.world.centerX, .6 * game.height, gameDescText, {
      font: '28px Bangers',
      fill: '#D86785',
      smoothed: false,
      align: "center",
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
      align: "center",
      stroke: '#000000',
      strokeThickness: 6
    })
    banner.padding.set(10, 16)
    banner.anchor.setTo(0.5)
    banner.alpha = 0.1;

    this.blinkText(banner);

    this.game.input.keyboard.onPressCallback = () => this.state.start('Level0')
  }

  blinkText(text) {
    game.add.tween(text).to({alpha: 1}, 2000, "Linear", true);
  }


  makeGuard(baseX, baseY) {
    var char_base = game.add.sprite(baseX, baseY, 'roguelikeChar', 1);
    char_base.scale.setTo(6);
    char_base.anchor.setTo(0.5);
    var char_pant = game.add.sprite(char_base.centerX - 6, char_base.centerY, 'roguelikeChar', 3);
    char_pant.scale.setTo(6);
    char_pant.anchor.setTo(0.5);
    var char_armor = game.add.sprite(char_base.centerX - 6, char_base.centerY, 'roguelikeChar', 6);
    char_armor.scale.setTo(6);
    char_armor.anchor.setTo(0.5);
    var char_helm = game.add.sprite(char_base.centerX - 6, char_base.centerY, 'roguelikeChar', 28);
    char_helm.scale.setTo(6);
    char_helm.anchor.setTo(0.5);
    var char_shield = game.add.sprite(char_base.centerX - 6, char_base.centerY, 'roguelikeChar', 256);
    char_shield.scale.setTo(6);
    char_shield.anchor.setTo(0.5);
    var char_weapon = game.add.sprite(char_base.centerX - 6, char_base.centerY, 'roguelikeChar', 49);
    char_weapon.scale.setTo(6);
    char_weapon.anchor.setTo(0.5);
  }
}
