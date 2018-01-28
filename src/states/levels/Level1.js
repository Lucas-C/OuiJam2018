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
    super.setLevelNumber(2)
    this.nextLevel = 'Level2'

    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.createTopCell_1())
    this.levelGrid.addRoom(1, 2, this.currentRoom)
    this.levelGrid.addRoom(1, 3, this.createBottomCell_1())

    this.levelGrid.addRoom(2, 1, this.createTopCell_2())
    this.levelGrid.addRoom(2, 2, this.createMiddleCell_2())
    this.levelGrid.addRoom(2, 3, this.createBottomCell_2())

    this.levelGrid.addRoom(3, 1, this.createTopCell_3())
    this.levelGrid.addRoom(3, 2, this.createMiddleCell_3())
    this.levelGrid.addRoom(3, 3, this.createBottomCell_3())

    this.levelGrid.addRoom(4, 1, this.createTopCell_4()) // exiting room
    this.levelGrid.addRoom(4, 2, this.createMiddleCell_4())
    this.levelGrid.addRoom(4, 3, this.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)
  }

  createStartCell() {
    const room = super.makePrisonCell(0, 0, true);
    room.addSideWalls(DIRECTION.LEFT)
    room.addExits(DIRECTION.RIGHT, DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.UP);
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell_1() {
    const room = super.makePrisonCell(2, 3);
    room.addSideWalls(DIRECTION.UP, DIRECTION.LEFT)
    room.addExits(DIRECTION.DOWN, DIRECTION.RIGHT)
    return room
  }

  createBottomCell_1() {
    const room = super.makePrisonCell(2, 1);
    room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT)
    room.addExits(DIRECTION.RIGHT)
    return room
  }

  createTopCell_2() {
    const room = super.makePrisonCell(2, 1);
    room.addSideWalls(DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN);
    return room
  }

  createMiddleCell_2() {
    const room = super.makePrisonCell(1, 0);
    room.addSideWalls(DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.UP);
    room.addExits(DIRECTION.LEFT, DIRECTION.DOWN, DIRECTION.UP)
    room.onEnterPrecondition = () => this.displayMessage('It seems you have understood :-D ')
    return room
  }

  createBottomCell_2() {
    const room = super.makePrisonCell(1, 0);
    room.addSideWalls(DIRECTION.DOWN, DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.UP);
    room.addExits(DIRECTION.LEFT, DIRECTION.UP)
    return room
  }

  createTopCell_3() {
    const room = super.makePrisonCell(2, 1);
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addExits(DIRECTION.LEFT, DIRECTION.DOWN)
    return room
  }

  createMiddleCell_3() {
    const room = super.makePrisonCell(1, 0);
    room.addSideMetalBars(DIRECTION.UP);
    room.addExits(DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN)
    return room
  }

  createBottomCell_3() {
    const room = super.makePrisonCell(1, 5);
    room.addSideWalls(DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.UP, DIRECTION.RIGHT);
    room.addExits(DIRECTION.UP)
    return room
  }

  createTopCell_4() {
    const room = super.makePrisonCell(1, 0);
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addExits(DIRECTION.DOWN)
    room.addEndWindow(3, 0)
    return room
  }

  createMiddleCell_4() {
    const room = super.makePrisonCell(2, 0);
    room.addSideWalls(DIRECTION.RIGHT);
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.UP, DIRECTION.DOWN);
    room.addExits(DIRECTION.UP, DIRECTION.LEFT)
    return room
  }

  update() {
    super.update()
  }
}
