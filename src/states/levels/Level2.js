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
    this.nextLevel = 'Level3'

    this.currentRoom = this.createStartCell()
    this.levelGrid.addRoom(1, 1, super.prepareRoom(4, 2))
    this.levelGrid.addRoom(1, 2, this.currentRoom)
  }

  createStartCell() {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())
    room.addSideWalls(DIRECTION.LEFT)
    room.addExits(DIRECTION.RIGHT, DIRECTION.UP)
    room.addSideMetalBars(DIRECTION.UP);
    room.addNellaMandelson(3, 3)
    room.addFurniture(1, 2)
    room.addFurniture(5, 5)
    return room
  }

  update() {
    super.update()
  }
}
