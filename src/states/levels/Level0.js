import GameLevel from '../GameLevel'
import AlignGrid from "../../grid/AlignGrid";
import Cell from "../../sprites/cells/Cell";

export default class extends GameLevel {
    create() {
        super.create()
        this.nextLevel = 'Level1'

        this.mainGrid = new AlignGrid(5, 5);
        this.mainGrid.show();

        // Starting room:
        this.currentRoom = this.createStartCell()
        this.mainGrid.addCell(0, 0, this.currentRoom)
        this.mainGrid.addCell(1, 0, this.createMiddleCell())
        this.mainGrid.addCell(1, 1, this.createBottomCell())
        this.mainGrid.addCell(2, 0, this.createEndCell())
    }

    createStartCell() {
        const cell = new Cell({game: this.game})
        cell.addSideWallSprites('left', 'up', 'down')
        cell.addNellaMandelson(3, 3)
        cell.addExits('right')
        return cell
    }

    createMiddleCell() {
        const cell = new Cell({game: this.game})
        cell.addSideWallSprites('up')
        cell.addAlly(2, 3)
        cell.addAlly(4, 4)
        cell.addBaddy(3, 5)
        cell.addExits('left', 'down', 'right')
        return cell
    }

    createBottomCell() {
        const cell = new Cell({game: this.game})
        cell.addSideWallSprites('up', 'down')
        cell.addBaddy(3, 3)
        cell.addExits('up')
        return cell
    }

    createEndCell() {
        const cell = new Cell({game: this.game})
        cell.addSideWallSprites('right', 'up', 'down')
        cell.addExits('left')
        cell.addEndWindow(6, 3)
        return cell
    }
}
