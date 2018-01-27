import Phaser from 'phaser'

import BaseRoom from './rooms/BaseRoom'

export default class extends Phaser.Group {
  constructor (parent) {
    super(game, /*parent=*/parent, /*name=*/'cursor')

    this.fixedToCamera = true
    this.cameraOffset.setTo(game.width / 2 - BaseRoom.getWidth() / 2,
                            game.height / 2 - BaseRoom.getHeight() / 2)

    this.leftArrow = this.addArrow(0, 0.5, 1650)
    this.rightArrow = this.addArrow(1, 0.5, 1651)
    this.upArrow = this.addArrow(0.5, 0, 1650, 90)
    this.downArrow = this.addArrow(0.5, 1, 1651, 90)
  }

  addArrow(x, y, spriteSheetIndex, angle) {
    const sprite = this.create(x * BaseRoom.getWidth(), y * BaseRoom.getHeight(), 'roguelikeSheet', spriteSheetIndex)
    sprite.scale.setTo(2)
    sprite.anchor.setTo(0.5)
    if (angle) {
      sprite.angle = angle
    }
    return sprite
  }
}
