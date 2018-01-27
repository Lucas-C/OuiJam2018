import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'roguelikeChar', 433)
    if (!this.animations.frameData || this.animations.frameData.total <= 1) {
        throw new Error('Failure parsing spritesheet')
    }
    this.scale.setTo(config.characterSpriteScale)
    this.anchor.setTo(0.5)
  }

  update () {
  }
}
