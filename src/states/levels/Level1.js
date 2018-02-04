import GameLevel from '../GameLevel'
import DIRECTION from '../../const/Direction'

export default class extends GameLevel {
  init () {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload () {
    super.preload()
    super.setLevelNumber(2)
    this.nextLevel = 'Level2'

    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.createTopCell1())
    this.levelGrid.addRoom(1, 2, this.currentRoom)
    this.levelGrid.addRoom(1, 3, this.createBottomCell1())

    this.levelGrid.addRoom(2, 1, this.createTopCell2())
    this.levelGrid.addRoom(2, 2, this.createMiddleCell2())
    this.levelGrid.addRoom(2, 3, this.createBottomCell2())

    this.levelGrid.addRoom(3, 1, this.createTopCell3())
    this.levelGrid.addRoom(3, 2, this.createMiddleCell3())
    this.levelGrid.addRoom(3, 3, this.createBottomCell3())

    this.levelGrid.addRoom(4, 1, this.createTopCell4()) // exiting room
    this.levelGrid.addRoom(4, 2, this.createMiddleCell4())
    this.levelGrid.addRoom(4, 3, this.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell () {
    const room = super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.LEFT],
      exits: [DIRECTION.RIGHT, DIRECTION.UP],
      withNelly: true
    })
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell1 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.LEFT],
      exits: [DIRECTION.DOWN, DIRECTION.RIGHT],
      nbAllies: 2,
      nbBaddies: 3
    })
  }

  createBottomCell1 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT],
      exits: [DIRECTION.RIGHT],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createTopCell2 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP],
      exits: [DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createMiddleCell2 () {
    const room = super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.RIGHT],
      exits: [DIRECTION.LEFT, DIRECTION.DOWN, DIRECTION.UP],
      nbAllies: 1
    })
    room.onEnterPrecondition = () => this.displayMessage('It seems you have understood :-D ')
    return room
  }

  createBottomCell2 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.UP],
      sideWalls: [DIRECTION.DOWN, DIRECTION.RIGHT],
      exits: [DIRECTION.LEFT, DIRECTION.UP],
      nbAllies: 1
    })
  }

  createTopCell3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      exits: [DIRECTION.LEFT, DIRECTION.DOWN],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createMiddleCell3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      exits: [DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN],
      nbAllies: 1
    })
  }

  createBottomCell3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP, DIRECTION.RIGHT],
      sideWalls: [DIRECTION.DOWN],
      exits: [DIRECTION.UP],
      nbAllies: 1,
      nbBaddies: 5
    })
  }

  createTopCell4 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      exits: [DIRECTION.DOWN],
      nbAllies: 1,
      endWindow: [3, 0]
    })
  }

  createMiddleCell4 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.UP, DIRECTION.DOWN],
      sideWalls: [DIRECTION.RIGHT],
      exits: [DIRECTION.UP, DIRECTION.LEFT],
      nbAllies: 2
    })
  }

  update () {
    super.update()
  }
}
