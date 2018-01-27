import GameLevel from '../GameLevel'
import PrisonCell from "../../sprites/rooms/PrisonCell";

export default class extends GameLevel {
    create() {
        super.create()
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
        const cell = new PrisonCell();
        cell.addSideWallSprites('up')
        cell.addAlly(2, 3)
        cell.addAlly(4, 4)
        cell.addBaddy(3, 5)
        cell.addExits('left', 'down', 'right')
        return cell
    }

    createBottomCell() {
        const cell = new PrisonCell();
        cell.addSideWallSprites('up', 'down')
        cell.addBaddy(3, 3)
        cell.addExits('up')
        return cell
    }

    createEndCell() {
        const cell = new PrisonCell();
        cell.addSideWallSprites('right', 'up', 'down')
        cell.addExits('left')
        cell.addEndWindow(6, 3)
        return cell
    }
}
