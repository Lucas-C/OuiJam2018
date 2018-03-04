import GameGrid from './GameGrid'
import config from '../config'

export default class RoomGrid extends GameGrid {
  constructor ({parent}) {
    const colCount = config.cellsPerRoomSide
    const rowCount = config.cellsPerRoomSide
    const widthCell = config.spriteSize
    const heightCell = config.spriteSize
    super({colCount, rowCount, widthCell, heightCell, parent})
  }

  showForDebug () {
    super.showForDebug(config.debugColorRoomGrid, config.debugSizeRoomGrid)
  }
}
