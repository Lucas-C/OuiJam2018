import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";
import Guard from '../../sprites/characters/Guard'
import DIRECTION from "../../const/Direction";
import PrisonCorridor from "../../sprites/rooms/PrisonCorridor";

export default class extends GameLevel {

  init() {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload() {
    super.preload()
    super.setLevelNumber(3)
    this.nextLevel = 'Credits'

    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.createCellTop_1())
    this.levelGrid.addRoom(1, 2, this.createCellMiddleHigh_1())
    this.levelGrid.addRoom(1, 3, this.createCellMiddleLow_1())
    this.levelGrid.addRoom(1, 4, this.currentRoom)

    this.levelGrid.addRoom(2, 1, this.createCellTop_2())
    this.levelGrid.addRoom(2, 2, this.createCorridor())
    this.levelGrid.addRoom(2, 3, this.createCorridor())
    this.levelGrid.addRoom(2, 4, this.createCellBottom_2())

    this.levelGrid.addRoom(3, 1, this.createCellTop_3())
    this.levelGrid.addRoom(3, 2, this.createCellMiddleHigh_3())
    this.levelGrid.addRoom(3, 3, this.createCellMiddleLow_3())
    this.levelGrid.addRoom(3, 4, this.createCellBottom_3())

    this.levelGrid.addRoom(4, 1, this.createCorridor())
    this.levelGrid.addRoom(4, 2, this.createCellMiddleHigh_4())
    this.levelGrid.addRoom(4, 3, this.createCorridor())
    this.levelGrid.addRoom(4, 4, this.createCellBottom_4())

    this.levelGrid.addRoom(5, 1, this.createCellTop_5())
    this.levelGrid.addRoom(5, 2, this.createCellMiddleHigh_5())
    this.levelGrid.addRoom(5, 3, this.createCellMiddleLow_5())
    this.levelGrid.addRoom(5, 4, this.createCellBottom_5())
  }

  createStartCell() {
    const room = super.prepareRoom(0, 0, true);
    room.addSideWalls(DIRECTION.LEFT, DIRECTION.DOWN)
    room.addExits(DIRECTION.UP, DIRECTION.RIGHT)
    return room
  }

  createCellTop_1() {
    const room = super.prepareRoom(2, 1);
    room.addSideWalls(DIRECTION.UP, DIRECTION.LEFT);
    room.addExits(DIRECTION.DOWN, DIRECTION.RIGHT)
    return room
  }

  createCellMiddleHigh_1() {
    const room = super.prepareRoom(1, 0);
    room.addSideWalls(DIRECTION.LEFT)
    room.addSideMetalBars(DIRECTION.RIGHT)
    room.addExits(DIRECTION.DOWN, DIRECTION.UP)
    return room
  }

  createCellMiddleLow_1() {
    const room = super.prepareRoom(3, 0);
    room.addSideWalls(DIRECTION.LEFT)
    room.addSideMetalBars(DIRECTION.RIGHT)
    room.addExits(DIRECTION.DOWN, DIRECTION.UP)
    return room
  }

  createCellTop_2() {
    const room = super.prepareRoom(0, 0);
    room.addSideWalls(DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.DOWN)
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT)
    return room
  }

  createCellBottom_2() {
    const room = super.prepareRoom(4, 5);
    room.addSideWalls(DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.UP)
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT)
    return room
  }

  createCellTop_3() {
    const room = super.prepareRoom(2, 0);
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addExits(DIRECTION.LEFT, DIRECTION.DOWN)
    return room
  }

  createCellMiddleHigh_3() {
    const room = super.prepareRoom(3, 1);
    room.addSideMetalBars(DIRECTION.LEFT)
    room.addExits(DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN)
    return room
  }

  createCellMiddleLow_3() {
    const room = super.prepareRoom(1, 0);
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.RIGHT)
    room.addExits(DIRECTION.UP, DIRECTION.DOWN)
    return room
  }

  createCellBottom_3() {
    const room = super.prepareRoom(2, 0);
    room.addSideMetalBars(DIRECTION.DOWN)
    room.addExits(DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.LEFT)
    return room
  }

  createCellMiddleHigh_4() {
    const room = super.prepareRoom(3, 1);
    room.addSideWalls(DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.DOWN)
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT)
    return room
  }

  createCellBottom_4() {
    const room = super.prepareRoom(4, 0);
    room.addSideWalls(DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.UP)
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT)
    return room
  }

  // Exit
  createCellTop_5() {
    const room = super.prepareRoom(2, 0);
    room.addSideWalls(DIRECTION.UP, DIRECTION.LEFT, DIRECTION.RIGHT)
    room.addExits(DIRECTION.DOWNT)
    room.addEndWindow(3, 0)
    return room
  }

  createCellMiddleHigh_5() {
    const room = super.prepareRoom(3, 1);
    room.addSideWalls(DIRECTION.RIGHT)
    room.addExits(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT)
    room.onEnterPrecondition = () => this.displayMessage('I am proud of you =^-^= ')
    return room
  }

  createCellMiddleLow_5() {
    const room = super.prepareRoom(2, 3);
    room.addSideWalls(DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.LEFT)
    room.addExits(DIRECTION.UP, DIRECTION.DOWN)
    return room
  }

  createCellBottom_5() {
    const room = super.prepareRoom(2, 0);
    room.addSideWalls(DIRECTION.DOWN, DIRECTION.RIGHT)
    room.addExits(DIRECTION.LEFT, DIRECTION.UP)
    return room
  }

  update() {
    super.update()
  }
}
