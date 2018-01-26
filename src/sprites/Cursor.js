import Phaser from 'phaser'

import config from '../config'


export default class extends Phaser.Group {
  constructor ({ game }) {
    super(game, /*parent=*/null, /*name=*/'cursor')
      this.fixedToCamera = true
      this.cameraOffset.setTo(config.getGameWidth() / 2, config.getGameHeight() / 2)

      const scale = 2
      const roomSize = 80 // in pixels

      const left = this.create(0, roomSize / 2, 'roguelikeSheet', 1650)
      left.scale.setTo(scale)
      left.anchor.setTo(0.5)
      const right = this.create(roomSize, roomSize / 2, 'roguelikeSheet', 1651)
      right.scale.setTo(scale)
      right.anchor.setTo(0.5)
      const up = this.create(roomSize / 2, 0, 'roguelikeSheet', 1650)
      up.angle = 90
      up.scale.setTo(scale)
      up.anchor.setTo(0.5)
      const down = this.create(roomSize / 2, roomSize, 'roguelikeSheet', 1651)
      down.angle = 90
      down.scale.setTo(scale)
      down.anchor.setTo(0.5)
  }

  update () {
  }
}
