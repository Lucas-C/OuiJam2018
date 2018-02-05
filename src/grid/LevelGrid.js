import GameGrid from './GameGrid'
import config from '../config'

export default class LevelGrid extends GameGrid {
  constructor (size, levelWidth, levelHeight, parent) {
    super(levelWidth / size, levelHeight / size, parent)
    this.size = size
    this.rooms = Array.from({length: size}, () => Array.from({length: size}))
    // console.log('LevelGrid with cellWidth/Height:', levelWidth / size, levelHeight / size)
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
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) {
      return null
    }
    return this.rooms[x] && this.rooms[x][y]
  }

  showForDebug () {
    super.showForDebug(config.debugColorMainGrid, config.debugSizeMainGrid)
  }
}
