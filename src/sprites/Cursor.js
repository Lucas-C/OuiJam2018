import Phaser from 'phaser'

import config from '../config'

export default class extends Phaser.Group {
  constructor ({ game }) {
    super(game, /*parent=*/null, /*name=*/'cursor')
    const roomSize = config.getRoomSize() // in pixels

    this.fixedToCamera = true
    this.cameraOffset.setTo(config.getGameWidth() / 2 - roomSize / 2, config.getGameHeight() / 2 - roomSize / 2)

    const left = this.create(0, roomSize / 2, 'roguelikeSheet', 1650)
    left.scale.setTo(config.spriteScale)
    left.anchor.setTo(0.5)
    const right = this.create(roomSize, roomSize / 2, 'roguelikeSheet', 1651)
    right.scale.setTo(config.spriteScale)
    right.anchor.setTo(0.5)
    const up = this.create(roomSize / 2, 0, 'roguelikeSheet', 1650)
    up.angle = 90
    up.scale.setTo(config.spriteScale)
    up.anchor.setTo(0.5)
    const down = this.create(roomSize / 2, roomSize, 'roguelikeSheet', 1651)
    down.angle = 90
    down.scale.setTo(config.spriteScale)
    down.anchor.setTo(0.5)
  }

  update () {
  }
}
