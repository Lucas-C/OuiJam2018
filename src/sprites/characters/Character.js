import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Group {
  constructor ({ frames, spriteSheet, room, isAlly, name }) {
    super(window.game, room, name || 'Character')
    this.room = room
    this.isAlly = isAlly
    this.hasScrollMsg = false
    const self = this
    this.sprites = frames.map(frame => {
      const sprite = self.create(0, 0, spriteSheet, frame)
      if (!sprite.animations.frameData || sprite.animations.frameData.total <= 1) {
        throw new Error('Failure parsing spritesheet')
      }
      console.log('Scaling Character sprite to', room.cellsGrid.widthCell / config.spriteSize, room.cellsGrid.heightCell / config.spriteSize)
      sprite.scale.setTo(room.cellsGrid.widthCell / config.spriteSize, room.cellsGrid.heightCell / config.spriteSize)
      sprite.anchor.setTo(0.5)
      return sprite
    })
    room.add(this)
  }

  canMoveTo (destRoom) {
    const passing = this.room.getPassingToRoom(destRoom)
    return !passing.walls && !passing.bars
  }

  moveTo (newRoom, x, y) {
    // TODO:
    // - fix sprite disappearing during movement
    // - fix character erasing existing character in dest cell
    const newGridPos = {
      x: x || (1 + Math.floor(Math.random() * (newRoom.parentLevelGrid.size - 2))),
      y: y || (1 + Math.floor(Math.random() * (newRoom.parentLevelGrid.size - 2)))
    }
    const dest = this.room.getDeltaToTileInRoom({room: newRoom, toTileGridPos: newGridPos})
    const self = this
    window.game.add.tween(this).to({x: dest.x, y: dest.y},
      /* duration= */500, /* ease= */Phaser.Easing.Cubic.InOut, /* autoStart= */ true)
      .onComplete.add(() => {
        self.room.characters = self.room.characters.filter((e) => e !== self)
        newRoom.add(self)
        newRoom.cellsGrid.placeAt(newGridPos.x, newGridPos.y, self)
        newRoom.characters.push(self)
        self.room = newRoom
      })
  }
}
