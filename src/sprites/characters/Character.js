import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Group {
  constructor ({ x = 0, y = 0, frames, spriteSheet, room, isAlly, name }) {
    super(window.game, room, name || 'Character')
    this.room = room
    this.isAlly = isAlly
    this.hasScrollMsg = false
    const self = this
    frames.forEach(frame => {
      const sprite = self.create(0, 0, spriteSheet, frame)
      if (!sprite.animations.frameData || sprite.animations.frameData.total <= 1) {
        throw new Error('Failure parsing spritesheet')
      }
      console.log('Scaling to', room.cellsGrid.widthCell / config.spriteSize, room.cellsGrid.heightCell / config.spriteSize)
      sprite.scale.setTo(room.cellsGrid.widthCell / config.spriteSize, room.cellsGrid.heightCell / config.spriteSize)
      sprite.anchor.setTo(0.5)
    })
    this.x = x
    this.y = y
    room.add(this)
  }

  canMoveTo (destRoom) {
    return false // TODO: remove once method below is implemented
    // const passing = this.room.getPassingToRoom(destRoom)
    // return !passing.walls && !passing.bars
  }

  moveTo (newRoom, x, y) { // TODO: add tween + handle scrollMsg movement too
    const self = this
    this.room.characters = this.room.characters.filter((e) => e !== self)
    /* TODO: implement moving this Group + sprites to another room
    this.move(newRoom)
    newRoom.cellsGrid.placeAt(x || Math.floor(Math.random() * newRoom.size), y || Math.floor(Math.random() * newRoom.size), this)
    */
    newRoom.characters.push(this)
    this.room = newRoom
  }
}
