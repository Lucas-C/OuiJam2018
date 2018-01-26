import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'roguelikeSheet', 3)
    if (!this.animations.frameData || this.animations.frameData.total <= 1) {
        throw new Error('Failure parsing spritesheet')
    }
    this.anchor.setTo(0.5)
  }

  update () {
  }
}
