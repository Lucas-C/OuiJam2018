import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Group {
  constructor({game}) {
    super(game, /*parent=*/null, /*name=*/'Cell')
    this.roomTiles = Array.from({ length: 5 }, () => Array.from({ length: 5 }))
    this.roomTiles[0][0] = this.create(-2.5*config.spriteSize, -2.5*config.spriteSize, 'roguelikeSheet', 1428)
    //left.scale.setTo(config.spriteScale)
    //left.anchor.setTo(0.5)
  }
}
