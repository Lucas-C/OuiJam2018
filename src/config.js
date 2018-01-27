export default {
  gameWidth: 800,
  gameHeight: 800,
  localStorageName: 'OuiJam2018',
  spriteScale: 2,
  spriteSize: 16,
  roomTilesSide: 5,
  getRoomSize() {
    return this.roomTilesSide * this.spriteSize * this.spriteScale
  },
  getGameWidth() {
    const docElement = document.documentElement
    return docElement.clientWidth > this.gameWidth ? this.gameWidth : docElement.clientWidth
  },
  getGameHeight() {
    const docElement = document.documentElement
    return docElement.clientHeight > this.gameHeight ? this.gameHeight : docElement.clientHeight
  },
  cellsPerLine: 5,
  cellsPerRoom: 7,
  mainGridWidth: 800,
  mainGridHeight: 800,
  debugColorMainGrid: 0xff0000,
  debugColorRoomGrid: 0x0077ff,
  debugSizeMainGrid: 4,
  debugSizeRoomGrid: 2
}
