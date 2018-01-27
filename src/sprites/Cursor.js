import Phaser from 'phaser'

import config from '../config'

export default class extends Phaser.Group {
  constructor ({ game }) {
    super(game, /*parent=*/null, /*name=*/'cursor')
    const halfRoomSize = config.getRoomSize() / 2 // in pixels

    this.fixedToCamera = true
    this.cameraOffset.setTo(config.getGameWidth() / 2 - halfRoomSize, config.getGameHeight() / 2 - halfRoomSize)

    this.leftArrow = this.create(-halfRoomSize, 0, 'roguelikeSheet', 1650)
    this.leftArrow.scale.setTo(config.spriteScale)
    this.leftArrow.anchor.setTo(0.5)
    this.rightArrow = this.create(halfRoomSize, 0, 'roguelikeSheet', 1651)
    this.rightArrow.scale.setTo(config.spriteScale)
    this.rightArrow.anchor.setTo(0.5)
    this.upArrow = this.create(0, -halfRoomSize, 'roguelikeSheet', 1650)
    this.upArrow.angle = 90
    this.upArrow.scale.setTo(config.spriteScale)
    this.upArrow.anchor.setTo(0.5)
    this.downArrow = this.create(0, halfRoomSize, 'roguelikeSheet', 1651)
    this.downArrow.angle = 90
    this.downArrow.scale.setTo(config.spriteScale)
    this.downArrow.anchor.setTo(0.5)
  }

  upArrowdate () {
  }
}
