import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";
import DIRECTION from "../../const/Direction";

export default class extends GameLevel {
    preload() {
        super.preload()
        this.nextLevel = 'Level1'

        // Starting room:
        this.currentRoom = this.createStartCell()
        this.levelGrid.addRoom(1, 1, this.currentRoom)
        this.levelGrid.addRoom(2, 1, this.createMiddleCell())
        this.levelGrid.addRoom(2, 2, this.createBottomCell())
        this.levelGrid.addRoom(3, 1, this.createEndCell())
    }

    createStartCell() {
        const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())
        room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.LEFT, DIRECTION.RIGHT)
        room.addNellaMandelson(3, 3)
        room.addExits('right')
        return room
    }

    createMiddleCell() {
        const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
        room.addSideWalls(DIRECTION.UP)
        room.addAlly(2, 3)
        room.addAlly(4, 4)
        room.addBaddy(3, 5)
        room.addExits('left', 'down', 'right')
        return room
    }

    createBottomCell() {
        const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
        room.addSideWalls(DIRECTION.LEFT, DIRECTION.RIGHT, DIRECTION.BOTTOM)
        room.addBaddy(3, 3)
        room.addExits('up')
        return room
    }

    createEndCell() {
        const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx());
        room.addSideWalls(DIRECTION.UP, DIRECTION.DOWN, DIRECTION.RIGHT)
        room.addExits('left')
        room.addEndWindow(6, 3)
        return room
    }
}
