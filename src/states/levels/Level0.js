import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";
import DIRECTION from "../../const/Direction";

export default class extends GameLevel {
  init() {
    super.init()
    this.roomsPerLevelSide = 6
  }

  preload() {
    super.preload()
    this.nextLevel = 'Level1'

    // Starting room:
    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, this.currentRoom)
    this.levelGrid.addRoom(2, 1, this.createMiddleCell_1())
    this.levelGrid.addRoom(3, 1, this.createMiddleCell_2())
    this.levelGrid.addRoom(3, 2, this.createBottomCell())
    this.levelGrid.addRoom(4, 1, this.createEndCell())
  }

  createStartCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())
    room.addSideWalls(DIRECTION.LEFT, DIRECTION.UP, DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.RIGHT);
    room.addNellaMandelson(3, 3)
    room.addFurniture(1, 2)
    room.addFurniture(5, 5)
    room.addExits('right')
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createMiddleCell_1() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addFurniture(2, 3)
    room.addFurniture(5, 4)
    room.addExits('left', 'right')
    room.onEnterPrecondition = () => this.displayMessage('Do not enter cells where there are\nless friendly inmates than fascist ones ! ')
    return room
  }

  createMiddleCell_2() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.RIGHT, DIRECTION.DOWN);
    room.addAlly(2, 3)
    room.addAlly(4, 4)
    room.addBaddy(3, 5)
    room.addFurniture(5, 1)
    room.addExits('left', 'down', 'right')
    room.onEnterPrecondition = () => this.displayMessage('In a cell with at least one fascist,\nthe stress will make you loose your way ! ')
    return room
  }

  createBottomCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.UP);
    room.addBaddy(3, 3)
    room.addFurniture(1, 5)
    room.addFurniture(4, 5)
    room.addFurniture(5, 1)
    room.addExits('up')
    return room
  }

  createEndCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.RIGHT)
    room.addFurniture(2, 4)
    room.addFurniture(3, 1)
    room.addExits('left')
    room.addEndWindow(6, 3)
    return room
  }
}
