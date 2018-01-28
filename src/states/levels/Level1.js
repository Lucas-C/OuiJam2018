import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";
import Guard from '../../sprites/characters/Guard'
import DIRECTION from "../../const/Direction";
import PrisonCorridor from "../../sprites/rooms/PrisonCorridor";

export default class extends GameLevel {

  preload() {
    super.preload()
    super.setLevelNumber(1)
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

    this.levelGrid.addRoom(4, 1, this.createTopCell_4())
    this.levelGrid.addRoom(4, 2, this.createMiddleCell_4())
    this.levelGrid.addRoom(4, 3, this.createCorridor()).addSideWalls(DIRECTION.RIGHT, DIRECTION.DOWN)

    // this.guard = new Guard({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY
    // })
    // this.game.add.existing(this.guard)
  }

  createStartCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())
    room.addSideWalls(DIRECTION.LEFT)
    room.addExits(DIRECTION.RIGHT, DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.UP);
    room.addNellaMandelson(3, 3)
    room.addFurniture(1, 2)
    room.addFurniture(5, 5)
    room.onEnterPrecondition = () => this.displayMessage('Quick, bring this message outside the prison ! ')
    return room
  }

  createTopCell_1() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.LEFT)
    room.addExits(DIRECTION.DOWN, DIRECTION.RIGHT)
    room
      .addBaddy(2, 2)
      .addBaddy(4, 1)
      .addBaddy(2, 1)
      .addAlly(5, 1)
      .addAlly(2, 3)
      .addFurniture(2, 3)
      .addFurniture(5, 4)
    return room
  }

  createBottomCell_1() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT)

    room.addExits(DIRECTION.RIGHT)
    room
      .addBaddy(5, 4)
      .addAlly(1, 4)
      .addAlly(3, 3)
      .addFurniture(2, 5)
      .addFurniture(4, 1)
      .addFurniture(5, 2)
    return room
  }

  createTopCell_2() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addExits(DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.DOWN);
    room
      .addBaddy(3, 1)
      .addAlly(2, 3)
      .addAlly(5, 5)
      .addFurniture(1, 3)
      .addFurniture(4, 2)
      .addFurniture(3, 2)
    return room
  }

  createMiddleCell_2() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.UP);
    room.addExits(DIRECTION.LEFT, DIRECTION.DOWN, DIRECTION.UP)
    room
      .addAlly(1, 2)
      .addFurniture(2, 2)
      .addFurniture(5, 1)
    room.onEnterPrecondition = () => this.displayMessage('It seems you have understood :-D ')
    return room
  }

  createBottomCell_2() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.DOWN, DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.LEFT, DIRECTION.UP);
    room.addExits(DIRECTION.LEFT, DIRECTION.UP)
    room
      .addAlly(4, 5)
      .addFurniture(3, 3)
      .addFurniture(1, 5)
      .addFurniture(1, 2)
    return room
  }

  createTopCell_3() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addExits(DIRECTION.LEFT, DIRECTION.DOWN)
    room
      .addBaddy(3, 2)
      .addAlly(1, 1)
      .addAlly(2, 1)
      .addFurniture(4, 5)
    return room
  }

  createMiddleCell_3() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideMetalBars(DIRECTION.UP);
    room.addExits(DIRECTION.UP, DIRECTION.RIGHT, DIRECTION.DOWN)
    room
      .addAlly(5, 4)
      .addFurniture(3, 5)
      .addFurniture(1, 3)
    return room
  }

  createBottomCell_3() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.DOWN)
    room.addSideMetalBars(DIRECTION.UP, DIRECTION.RIGHT);
    room.addExits(DIRECTION.UP)
    room
      .addBaddy(1, 1)
      .addBaddy(1, 2)
      .addBaddy(1, 3)
      .addBaddy(1, 4)
      .addBaddy(1, 5)
      .addAlly(5, 4)
      .addFurniture(3, 5)
      .addFurniture(4, 1)
    return room
  }

  createTopCell_4() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.UP, DIRECTION.RIGHT)
    room.addExits(DIRECTION.DOWN)
    room
      .addFurniture(2, 2)
      .addFurniture(5, 1)
    return room
  }

  createMiddleCell_4() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
    room.addSideWalls(DIRECTION.RIGHT);
    room.addSideMetalBars(DIRECTION.UP, DIRECTION.DOWN);
    room.addSideMetalBars(DIRECTION.LEFT);
    room.addExits(DIRECTION.UP, DIRECTION.LEFT)
    room
      .addAlly(1, 1)
      .addAlly(2, 4)
      .addFurniture(2, 3)
      .addFurniture(5, 4)
      .addFurniture(5, 3)
    return room
  }

  update() {
    super.update()
    //this.guard.update()
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
