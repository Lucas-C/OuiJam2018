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
    super.setLevelNumber(0)
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
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())
    room.addSideMetalBars( DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.LEFT, DIRECTION.UP)
    room.addNellaMandelson(3, 3)
    room.addFurniture(1, 2)
    room.addFurniture(5, 5)
    room.addExits('right')
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell_2() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP)
    room.addFurniture(2, 3)
    room.addFurniture(5, 4)
    room.addExits('left', 'right')
    room.onEnterPrecondition = () => this.displayMessage('Do not enter cells where there are\nless friendly inmates than fascist ones ! ')
    return room
  }

  createTopCell_3() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideMetalBars(DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP)
    room.addAlly(2, 3)
    room.addAlly(4, 4)
    room.addBaddy(3, 5)
    room.addFurniture(5, 1)
    room.addExits('left', 'down', 'right')
    room.onEnterPrecondition = () => this.displayMessage('In a cell with at least one fascist,\nthe stress will make you loose your way ! ')
    return room
  }

  createMiddleCell_3() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideMetalBars( DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN);
    room.addBaddy(3, 3)
    room.addFurniture(1, 5)
    room.addFurniture(4, 5)
    room.addFurniture(5, 1)
    room.addExits('up')
    return room
  }

  createEndCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.DOWN);
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addFurniture(2, 4)
    room.addFurniture(3, 1)
    room.addExits('left')
    room.addAlly(5, 3)
    room.addEndWindow(6, 3)
    return room
  }

  createCorridor() {
    const room = new PrisonCorridor(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    let nbGuards = Math.floor(Math.random() * 3) + 1; // 1 to 4 guards
    for (var i = 0; i < nbGuards; i++) {
      var posX = Math.floor(Math.random() * 5) + 1;
      var posY = Math.floor(Math.random() * 5) + 1;
      room.addGuard(posX, posY);
    }
    return room
  }
}
