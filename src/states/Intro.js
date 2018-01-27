import Phaser from 'phaser'
import config from '../config'

export default class extends Phaser.State {
  init() {
  }

  preload() {
    game.load.image('background', 'assets/images/to_change.jpg');
  }

  create() {
    var bck = game.add.sprite(0, 0, 'background');
    bck.scale.setTo(1, 1);

    const titleText = 'THE KING MUST KNOW ! '
    const title = this.add.text(this.world.centerX, .2 * config.getGameHeight(), titleText, {
      font: '80px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8
    })
    title.padding.set(10, 16)
    title.anchor.setTo(0.5)

    var bars = game.add.sprite(this.world.centerX, .4 * config.getGameHeight(), 'roguelikeSheet', 203);
    bars.scale.setTo(8);
    bars.anchor.setTo(0.5);

    this.makeGuard(this.world.centerX - 150, .4 * config.getGameHeight());
    this.makeGuard(this.world.centerX + 150, .4 * config.getGameHeight());

    const gameDescText = 'You are, Nelly Mandela, unjustly imprisoned.\nTo save thousands of innocent people, your letter must reach the king ! '
    const gameDesc = this.add.text(this.world.centerX, .6 * config.getGameHeight(), gameDescText, {
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
