import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";
import PrisonCorridor from "../../sprites/rooms/PrisonCorridor";
import DIRECTION from "../../const/Direction";

export default class extends GameLevel {
  init() {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload() {
    super.preload()
    super.setLevelNumber(1)
    this.nextLevel = 'Level1'

    // Starting room:
    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.currentRoom)
    this.levelGrid.addRoom(1, 2, this.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(2, 1, this.createTopCell_2())
    this.levelGrid.addRoom(2, 2, this.createCorridor())
    this.levelGrid.addRoom(2, 3, this.createCorridor()).addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)

    this.levelGrid.addRoom(3, 1, this.createTopCell_3())
    this.levelGrid.addRoom(3, 2, this.createMiddleCell_3())
    this.levelGrid.addRoom(3, 3, this.createCorridor()).addSideWalls(DIRECTION.DOWN)

    this.levelGrid.addRoom(4, 1, this.createEndCell())
    this.levelGrid.addRoom(4, 2, this.createCorridor()).addSideWalls(DIRECTION.RIGHT)
    this.levelGrid.addRoom(4, 3, this.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell() {
    const room = super.prepareRoom(0, 0, true);
    room.addSideMetalBars( DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.LEFT, DIRECTION.UP)
    room.addExits('right')
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell_2() {
    const room = super.prepareRoom(0, 0);
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP)
    room.addExits('left', 'right')
    room.onEnterPrecondition = () => this.displayMessage('Do not enter cells where there are\nless friendly inmates than fascist ones ! ')
    return room
  }

  createTopCell_3() {
    const room = super.prepareRoom(2, 1);
    room.addSideMetalBars(DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP)
    room.addExits('left', 'down', 'right')
    room.onEnterPrecondition = () => this.displayMessage('In a cell with at least one fascist,\nthe stress will make you loose your way ! ')
    return room
  }

  createMiddleCell_3() {
    const room = super.prepareRoom(0, 1);
    room.addSideMetalBars( DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN);
    room.addExits('up')
    return room
  }

  createEndCell() {
    const room = super.prepareRoom(1, 0);
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addExits('left')
    room.addEndWindow(6, 3)
    return room
  }
}
