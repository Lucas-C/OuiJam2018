import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor (roomWidth, roomHeight, parent) {
    super(game, /*parent=*/parent, /*name=*/'cursor')

    //this.fixedToCamera = true
    //this.cameraOffset.setTo(game.width / 2 - roomWidth / 2,
    //                        game.height / 2 - roomHeight / 2)

    this.leftArrow = this.addArrow(0, roomHeight / 2, 1650)
    this.rightArrow = this.addArrow(roomWidth, roomHeight / 2, 1651)
    this.upArrow = this.addArrow(roomWidth / 2, 0, 1650, 90)
    this.downArrow = this.addArrow(roomWidth / 2, roomHeight, 1651, 90)
  }

  addArrow(x, y, spriteSheetIndex, angle) {
    const sprite = this.create(x, y, 'roguelikeSheet', spriteSheetIndex)
    sprite.scale.setTo(2)
    sprite.anchor.setTo(0.5)
    if (angle) {
      sprite.angle = angle
    }
    return sprite
  }
}
