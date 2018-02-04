import Phaser from 'phaser'
import DIRECTION from '../const/Direction'
import FRAME from '../const/Frame'

export default class Cursor extends Phaser.Group {
  constructor (roomWidth, roomHeight, parent) {
    super(window.game, /* parent= */parent, /* name= */'cursor')

    // this.fixedToCamera = true
    // this.cameraOffset.setTo(game.width / 2 - roomWidth / 2,
    //                        game.height / 2 - roomHeight / 2)

    this.currentMovements = this._cloneObject(Cursor.ORIGINAL_MOVEMENT)
    this.roomWidth = roomWidth
    this.roomHeight = roomHeight
    this._draw()
  }

  _cloneObject (object) {
    return JSON.parse(JSON.stringify(object))
  }

  _draw () {
    this.leftArrow = this._addArrow(0, this.roomHeight / 2, this.currentMovements.LEFT.icon.iconFrame, this.currentMovements.LEFT.icon.iconRotation)
    this.rightArrow = this._addArrow(this.roomWidth, this.roomHeight / 2, this.currentMovements.RIGHT.icon.iconFrame, this.currentMovements.RIGHT.icon.iconRotation)
    this.upArrow = this._addArrow(this.roomWidth / 2, 0, this.currentMovements.UP.icon.iconFrame, this.currentMovements.UP.icon.iconRotation)
    this.downArrow = this._addArrow(this.roomWidth / 2, this.roomHeight, this.currentMovements.DOWN.icon.iconFrame, this.currentMovements.DOWN.icon.iconRotation)
  }

  _reDraw () {
    this.leftArrow.kill()
    this.rightArrow.kill()
    this.upArrow.kill()
    this.downArrow.kill()
    this._draw()
  }

  _addArrow (x, y, spriteSheetIndex, angle) {
    const sprite = this.create(x, y, 'roguelikeSheet', spriteSheetIndex)
    sprite.scale.setTo(2)
    sprite.anchor.setTo(0.5)
    if (angle) {
      sprite.angle = angle
    }
    return sprite
  }

  randomizeMovements () {
    console.log('randomize movements')
    const shuffledMovements = this._getRandomMovementsList()
    this.currentMovements.UP = this._cloneObject(Cursor.ORIGINAL_MOVEMENT[shuffledMovements[0]])
    this.currentMovements.RIGHT = this._cloneObject(Cursor.ORIGINAL_MOVEMENT[shuffledMovements[1]])
    this.currentMovements.DOWN = this._cloneObject(Cursor.ORIGINAL_MOVEMENT[shuffledMovements[2]])
    this.currentMovements.LEFT = this._cloneObject(Cursor.ORIGINAL_MOVEMENT[shuffledMovements[3]])

    this.currentMovements[shuffledMovements[0]].icon = Cursor.ICON_MOVEMENT_PANIK.UP
    this.currentMovements[shuffledMovements[1]].icon = Cursor.ICON_MOVEMENT_PANIK.RIGHT
    this.currentMovements[shuffledMovements[2]].icon = Cursor.ICON_MOVEMENT_PANIK.DOWN
    this.currentMovements[shuffledMovements[3]].icon = Cursor.ICON_MOVEMENT_PANIK.LEFT
    this._reDraw()
  }

  _getRandomMovementsList () {
    const shuffledMovements = Object.keys(Cursor.ORIGINAL_MOVEMENT)
    for (let i = shuffledMovements.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledMovements[i], shuffledMovements[j]] = [shuffledMovements[j], shuffledMovements[i]]
    }
    return shuffledMovements
  }

  resetOriginalMovements () {
    this.currentMovements = this._cloneObject(Cursor.ORIGINAL_MOVEMENT)
    this._reDraw()
  }

  getMovementByName (movementName) {
    let foundMouvement
    Object.keys(this.currentMovements).forEach(currentMovementId => {
      if (currentMovementId === movementName.toUpperCase()) {
        foundMouvement = this.currentMovements[currentMovementId]
      }
    })
    return foundMouvement
  }

  moveTo (x, y) {
    this.x = x
    this.y = y
  }
}

Cursor.ICON_MOVEMENT = {
  LEFT: {
    directionName: DIRECTION.LEFT,
    iconFrame: FRAME.ARROW_BLUE_BIG_LEFT,
    iconRotation: 0
  },
  RIGHT: {
    directionName: DIRECTION.RIGHT,
    iconFrame: FRAME.ARROW_BLUE_BIG_RIGHT,
    iconRotation: 0
  },
  UP: {
    directionName: DIRECTION.UP,
    iconFrame: FRAME.ARROW_BLUE_BIG_LEFT,
    iconRotation: 90
  },
  DOWN: {
    directionName: DIRECTION.DOWN,
    iconFrame: FRAME.ARROW_BLUE_BIG_RIGHT,
    iconRotation: 90
  }
}

Cursor.ICON_MOVEMENT_PANIK = {
  LEFT: {
    directionName: DIRECTION.LEFT,
    iconFrame: FRAME.ARROW_RED_BIG_LEFT,
    iconRotation: 0
  },
  RIGHT: {
    directionName: DIRECTION.RIGHT,
    iconFrame: FRAME.ARROW_RED_BIG_RIGHT,
    iconRotation: 0
  },
  UP: {
    directionName: DIRECTION.UP,
    iconFrame: FRAME.ARROW_RED_BIG_LEFT,
    iconRotation: 90
  },
  DOWN: {
    directionName: DIRECTION.DOWN,
    iconFrame: FRAME.ARROW_RED_BIG_RIGHT,
    iconRotation: 90
  }
}

Cursor.ORIGINAL_MOVEMENT = {
  LEFT: {
    directionName: DIRECTION.LEFT,
    deltaX: -1,
    deltaY: 0,
    icon: Cursor.ICON_MOVEMENT.LEFT
  },
  RIGHT: {
    directionName: DIRECTION.RIGHT,
    deltaX: 1,
    deltaY: 0,
    icon: Cursor.ICON_MOVEMENT.RIGHT
  },
  UP: {
    directionName: DIRECTION.UP,
    deltaX: 0,
    deltaY: -1,
    icon: Cursor.ICON_MOVEMENT.UP
  },
  DOWN: {
    directionName: DIRECTION.DOWN,
    deltaX: 0,
    deltaY: 1,
    icon: Cursor.ICON_MOVEMENT.DOWN
  }
}
