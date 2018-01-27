import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";

export default class extends GameLevel {
    preload() {
        super.preload()
        this.nextLevel = 'Level1'

        // Starting room:
        this.currentRoom = this.createStartCell()
        this.levelGrid.addRoom(0, 0, this.currentRoom)
        this.levelGrid.addRoom(1, 0, this.createMiddleCell())
        this.levelGrid.addRoom(1, 1, this.createBottomCell())
        this.levelGrid.addRoom(2, 0, this.createEndCell())
    }

    createStartCell() {
        const room = new PrisonCell()
        room.addSideWallSprites('left', 'up', 'down')
        room.addNellaMandelson(3, 3)
        room.addExits('right')
        return room
    }

    createMiddleCell() {
        const room = new PrisonCell();
        room.addSideWallSprites('up')
        room.addAlly(2, 3)
        room.addAlly(4, 4)
        room.addBaddy(3, 5)
        room.addExits('left', 'down', 'right')
        return room
    }

    createBottomCell() {
        const room = new PrisonCell();
        room.addSideWallSprites('up', 'down')
        room.addBaddy(3, 3)
        room.addExits('up')
        return room
    }

    createEndCell() {
        const room = new PrisonCell();
        room.addSideWallSprites('right', 'up', 'down')
        room.addExits('left')
        room.addEndWindow(6, 3)
        return room
    }
}
