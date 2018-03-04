import GameLevel from '../GameLevel'
import Cursor from '../../sprites/Cursor'
import DIRECTION from '../../const/Direction'
import FRAME from '../../const/Frame'

export default class extends GameLevel {
  init () {
    super.init()
    this.colCount = 4
    this.rowCount = 3
  }

  preload () {
    super.preload()
    super.setLevelNumber(1)
    this.nextLevel = 'Level1'

    // Starting room:
    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(0, 0, this.currentRoom)
    this.levelGrid.addRoom(0, 1, this.helper.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(1, 0, this.createTopCell2())
    this.levelGrid.addRoom(1, 1, this.helper.createCorridor())
    this.levelGrid.addRoom(1, 2, this.helper.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(2, 0, this.createTopCell3())
    this.levelGrid.addRoom(2, 1, this.createMiddleCell3())
    this.levelGrid.addRoom(2, 2, this.helper.createCorridor()).addSideWalls(DIRECTION.DOWN)

    this.levelGrid.addRoom(3, 0, this.createEndCell())
    this.levelGrid.addRoom(3, 1, this.helper.createCorridor()).addSideWalls(DIRECTION.RIGHT)
    this.levelGrid.addRoom(3, 2, this.helper.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN],
      sideWalls: [DIRECTION.LEFT, DIRECTION.UP],
      withNelly: true,
      msgOnEntry: ['Quick, bring this message outside the prison ! ']
    })
  }

  createTopCell2 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP],
      msgOnEntry: ['Do not enter cells where there are\nless friendly inmates than fascist ones : ',
                   {spriteSheet: 'roguelikeChar', indices: FRAME.BADDIES, percentX: 0.9, percentY: 0.1, scale: 3}]
    })
  }

  createTopCell3 () {
    const arrowIndices = Object.values(Cursor.ICON_MOVEMENT_PANIK).map(dir => dir.iconFrame)
    const arrowAngles = Object.values(Cursor.ICON_MOVEMENT_PANIK).map(dir => dir.iconRotation)
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP],
      nbAllies: 2,
      nbBaddies: 1,
      msgOnEntry: ['In a cell with at least one fascist,\nthe stress will make you loose your way ! ',
                   {spriteSheet: 'roguelikeSheet', indices: arrowIndices, angles: arrowAngles, percentX: 0.9, percentY: 0.1, scale: 3}]
    })
  }

  createMiddleCell3 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN],
      nbBaddies: 1
    })
  }

  createEndCell () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      nbAllies: 1,
      endWindow: [6, 3]
    })
  }
}
