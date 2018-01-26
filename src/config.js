export default {
  gameWidth: 800,
  gameHeight: 800,
  localStorageName: 'OuiJam2018',
  spriteScale: 2,
  getRoomSize() {
    return 5 * 16 * this.spriteScale
  },
  getGameWidth() {
    const docElement = document.documentElement
    return docElement.clientWidth > this.gameWidth ? this.gameWidth : docElement.clientWidth
  },
  getGameHeight() {
    const docElement = document.documentElement
    return docElement.clientHeight > this.gameHeight ? this.gameHeight : docElement.clientHeight
  }
}
