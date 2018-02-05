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
    this.levelGrid.addRoom(4, 3, this.helper.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.LEFT],
      withNelly: true,
      msgOnEntry: ['Quick, bring this message outside the prison ! ']
    })
  }

  createTopCell1 () {
    return this.helper.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.LEFT],
      nbAllies: 2,
      nbBaddies: 3
    })
  }

  createBottomCell1 () {
    return this.helper.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createTopCell2 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createMiddleCell2 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.RIGHT],
      nbAllies: 1,
      msgOnEntry: ['It seems you have understood :-D ']
    })
  }

  createBottomCell2 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.UP],
      sideWalls: [DIRECTION.DOWN, DIRECTION.RIGHT],
      nbAllies: 1
    })
  }

  createTopCell3 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createMiddleCell3 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      nbAllies: 1
    })
  }

  createBottomCell3 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.UP, DIRECTION.RIGHT],
      sideWalls: [DIRECTION.DOWN],
      nbAllies: 1,
      nbBaddies: 5
    })
  }

  createTopCell4 () {
    return this.helper.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      nbAllies: 1,
      endWindow: [3, 0]
    })
  }

  createMiddleCell4 () {
    return this.helper.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.UP, DIRECTION.DOWN],
      sideWalls: [DIRECTION.RIGHT],
      nbAllies: 2
    })
  }

  update () {
    super.update()
  }
}
