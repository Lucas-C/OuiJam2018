import GameGrid from './GameGrid'
import config from '../config'

export default class LevelGrid extends GameGrid {
  constructor ({colCount, rowCount, parent}) {
    const widthCell = config.roomSizeInPx()
    const heightCell = config.roomSizeInPx()
    super({colCount, rowCount, widthCell, heightCell, parent})
    this.rooms = Array.from({length: colCount}, () => Array.from({length: rowCount}))
    // console.log('LevelGrid with cellWidth/Height:', widthCell, heightCell)
    // Lucas: clearly does not work :(
    // this.x = game.world.centerX - levelWidth / 2
    // this.y = game.world.centerY - levelHeight / 2
    // console.log('LevelGrid pos', this.x, this.y)
  }

  addRoom (x, y, room) {
    this.rooms[x][y] = room
    this.placeAt(x, y, room)
    room.parentLevelGrid = this
    // Lucas: if we do this, everything breaks :(
    // this.add(room)
    return room
  }

  roomAtPos (x, y) {
    if (x < 0 || x >= this.colCount || y < 0 || y >= this.rowCount) {
      return null
    }
    return this.rooms[x] && this.rooms[x][y]
  }

  showForDebug () {
    super.showForDebug(config.debugColorMainGrid, config.debugSizeMainGrid)
  }
}
