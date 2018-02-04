import GameLevel from '../GameLevel'
import DIRECTION from '../../const/Direction'

export default class extends GameLevel {
  init () {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload () {
    super.preload()
    super.setLevelNumber(3)
    this.nextLevel = 'Credits'

    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.createCellTop1())
    this.levelGrid.addRoom(1, 2, this.createCellMiddleHigh1())
    this.levelGrid.addRoom(1, 3, this.createCellMiddleLow1())
    this.levelGrid.addRoom(1, 4, this.currentRoom)

    this.levelGrid.addRoom(2, 1, this.createCellTop2())
    this.levelGrid.addRoom(2, 2, this.createCorridor())
    this.levelGrid.addRoom(2, 3, this.createCorridor())
    this.levelGrid.addRoom(2, 4, this.createCellBottom2())

    this.levelGrid.addRoom(3, 1, this.createCellTop3())
    this.levelGrid.addRoom(3, 2, this.createCellMiddleHigh3())
    this.levelGrid.addRoom(3, 3, this.createCellMiddleLow3())
    this.levelGrid.addRoom(3, 4, this.createCellBottom3())

    this.levelGrid.addRoom(4, 1, this.createCorridor())
    this.levelGrid.addRoom(4, 2, this.createCellMiddleHigh4())
    this.levelGrid.addRoom(4, 3, this.createCorridor())
    this.levelGrid.addRoom(4, 4, this.createCellBottom4())

    this.levelGrid.addRoom(5, 1, this.createCellTop5())
    this.levelGrid.addRoom(5, 2, this.createCellMiddleHigh5())
    this.levelGrid.addRoom(5, 3, this.createCellMiddleLow5())
    this.levelGrid.addRoom(5, 4, this.createCellBottom5())
  }

  createStartCell () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP, DIRECTION.RIGHT],
      sideWalls: [DIRECTION.LEFT, DIRECTION.DOWN],
      exits: [DIRECTION.UP, DIRECTION.RIGHT],
      withNelly: true
    })
  }

  createCellTop1 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.LEFT],
      exits: [DIRECTION.DOWN, DIRECTION.RIGHT],
      nbAllies: 2,
      nbBaddies: 1
    })
  }

  createCellMiddleHigh1 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.RIGHT, DIRECTION.UP],
      sideWalls: [DIRECTION.LEFT],
      exits: [DIRECTION.DOWN, DIRECTION.UP],
      nbAllies: 1
    })
  }

  createCellMiddleLow1 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.RIGHT, DIRECTION.UP],
      sideWalls: [DIRECTION.LEFT],
      exits: [DIRECTION.DOWN, DIRECTION.UP],
      nbAllies: 3
    })
  }

  createCellTop2 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN, DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP],
      exits: [DIRECTION.LEFT, DIRECTION.RIGHT]
    })
  }

  createCellBottom2 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.DOWN],
      exits: [DIRECTION.LEFT, DIRECTION.RIGHT],
      nbAllies: 4,
      nbBaddies: 5
    })
  }

  createCellTop3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT],
      sideWalls: [DIRECTION.UP, DIRECTION.RIGHT],
      exits: [DIRECTION.LEFT, DIRECTION.DOWN],
      nbAllies: 2
    })
  }

  createCellMiddleHigh3 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.LEFTP],
      exits: [DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN],
      nbAllies: 3,
      nbBaddies: 1
    })
  }

  createCellMiddleLow3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.RIGHT],
      exits: [DIRECTION.UP, DIRECTION.DOWN],
      nbAllies: 1
    })
  }

  createCellBottom3 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.DOWN, DIRECTION.UP, DIRECTION.RIGHT],
      sideWalls: [DIRECTION.DOWN],
      exits: [DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.LEFT],
      nbAllies: 2
    })
  }

  createCellMiddleHigh4 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.LEFT, DIRECTION.DOWN],
      sideWalls: [DIRECTION.UP],
      exits: [DIRECTION.LEFT, DIRECTION.RIGHT],
      nbAllies: 3,
      nbBaddies: 1
    })
  }

  createCellBottom4 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.DOWN],
      exits: [DIRECTION.LEFT, DIRECTION.RIGHT],
      nbAllies: 4
    })
  }

  // Exit
  createCellTop5 () {
    return super.makePrisonCell({
      sideWalls: [DIRECTION.UP, DIRECTION.LEFT, DIRECTION.RIGHT],
      exits: [DIRECTION.DOWN],
      nbAllies: 3,
      endWindow: [3, 0]
    })
  }

  createCellMiddleHigh5 () {
    const room = super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP, DIRECTION.LEFT],
      sideWalls: [DIRECTION.RIGHT],
      exits: [DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT],
      nbAllies: 3,
      nbBaddies: 1
    })
    room.onEnterPrecondition = () => this.displayMessage('I am proud of you =^-^= ')
    return room
  }

  createCellMiddleLow5 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP, DIRECTION.LEFT],
      sideWalls: [DIRECTION.RIGHT],
      exits: [DIRECTION.UP, DIRECTION.DOWN],
      nbAllies: 2,
      nbBaddies: 3
    })
  }

  createCellBottom5 () {
    return super.makePrisonCell({
      sideMetalBars: [DIRECTION.UP],
      sideWalls: [DIRECTION.DOWN, DIRECTION.RIGHT],
      exits: [DIRECTION.LEFT, DIRECTION.UP],
      nbAllies: 2
    })
  }

  update () {
    super.update()
  }
}
