import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Group {
  constructor({ x = 0, y = 0, frames, spriteSheet, room, isAlly, name }) {
    super(game, room, name || 'Character')
    this.room = room
    this.isAlly = isAlly
    const self = this
    frames.forEach(frame => {
      const sprite = self.create(0, 0, spriteSheet, frame)
      if (!sprite.animations.frameData || sprite.animations.frameData.total <= 1) {
        throw new Error('Failure parsing spritesheet')
      }
      sprite.scale.setTo(room.grid.widthCell / config.spriteSize, room.grid.heightCell / config.spriteSize)
      sprite.anchor.setTo(0.5)
    })
    this.x = x
    this.y = y
    room.add(this)
  }

  move(newRoom, x, y) {
    const self = this
    if (this.isAlly) {

    }
    this.room.characters = this.room.characters.filter((e) => e !== self)
    this.move(newRoom)
    newRoom.characters.push(this)
    this.room = newRoom
  }
}
