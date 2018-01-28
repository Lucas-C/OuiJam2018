import Phaser from 'phaser'
import config from '../config'
import {centerGameObjects} from "../utils";

export default class extends Phaser.State {
  init() {}

  preload() {}

  create() {
    game.stage.backgroundColor = 'black'

    const kingPic = this.add.sprite(config.gameWidth / 2, .17 * config.gameHeight, 'rpgportraits', 8)
    kingPic.anchor.setTo(0.5)
    kingPic.scale.setTo(4)

    this.addLine({text: 'CREDITS', yPercentPos: .34, fontSize: 54})

    this.addLine({text: 'GRAPHICS / PROGRAMMING / GAME DESIGN', yPercentPos: .45, color: '#39B7CD'})
    this.addLine({text: 'Lucas Cimon', yPercentPos: .5})
    this.addLine({text: 'Henri Crouzet', yPercentPos: .55})
    this.addLine({text: 'Loïc Mazé', yPercentPos: .6})

    this.addLine({text: 'MUSIC', yPercentPos: .7, color: '#39B7CD'})
    this.addLine({text: 'Lucas Fleurance', yPercentPos: .75})
  }

  addLine({text, yPercentPos, fontSize = 36, color = 'white'}) {
    this.add.text(config.gameWidth / 2, yPercentPos * config.gameHeight, text, {
      font: fontSize + 'px VT323',
      fill: color,
      smoothed: false,
      align: 'center'
    }).anchor.setTo(0.5)
  }
}
