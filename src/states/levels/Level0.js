import GameLevel from '../GameLevel'
import Cursor from '../../sprites/Cursor'
import DIRECTION from '../../const/Direction'
import FRAME from '../../const/Frame'

export default class extends GameLevel {
  init () {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload () {
    super.preload()
    super.setLevelNumber(1)
    this.nextLevel = 'Level1'

    // Starting room:
    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.currentRoom)
    this.levelGrid.addRoom(1, 2, this.helper.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(2, 1, this.createTopCell2())
    this.levelGrid.addRoom(2, 2, this.helper.createCorridor())
    this.levelGrid.addRoom(2, 3, this.helper.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(3, 1, this.createTopCell3())
    this.levelGrid.addRoom(3, 2, this.createMiddleCell3())
    this.levelGrid.addRoom(3, 3, this.helper.createCorridor()).addSideWalls(DIRECTION.DOWN)

    this.levelGrid.addRoom(4, 1, this.createEndCell())
    this.levelGrid.addRoom(4, 2, this.helper.createCorridor()).addSideWalls(DIRECTION.RIGHT)
    this.levelGrid.addRoom(4, 3, this.helper.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell () {
    const room = this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN],
      sideWalls: [DIRECTION.LEFT, DIRECTION.UP],
      exits: ['right'],
      withNelly: true
    })
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell2 () {
    const room = this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP],
      exits: ['left', 'right']
    })
    room.onEnterPrecondition = () => this.displayMessage('Do not enter cells where there are\nless friendly inmates than fascist ones : ',
                                                         {spriteSheet: 'roguelikeChar', indices: FRAME.BADDIES, percentX: 0.9, percentY: 0.1, scale: 3})
    return room
  }

  createTopCell3 () {
    const room = this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP],
      exits: ['left', 'down', 'right'],
      nbAllies: 2,
      nbBaddies: 1
    })
    const arrowIndices = Object.values(Cursor.ICON_MOVEMENT_PANIK).map(dir => dir.iconFrame)
    const arrowAngles = Object.values(Cursor.ICON_MOVEMENT_PANIK).map(dir => dir.iconRotation)
    room.onEnterPrecondition = () => this.displayMessage('In a cell with at least one fascist,\nthe stress will make you loose your way ! ',
                                                         {spriteSheet: 'roguelikeSheet', indices: arrowIndices, angles: arrowAngles, percentX: 0.9, percentY: 0.1, scale: 3})
    return room
  }

  createMiddleCell3 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN],
      exits: ['up'],
      nbBaddies: 1
    })
  }

  createEndCell () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      exits: ['left'],
      nbAllies: 1,
      endWindow: [6, 3]
    })
  }
}
