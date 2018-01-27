import Phaser from 'phaser'

import config from '../../config'

export default class extends Phaser.Group {
  constructor({game}) {
    super(game, /*parent=*/null, /*name=*/'Cell')
    this.exits = ['right', 'up', 'down', 'left']
    this.roomTiles = Array.from({length: 5}, () => Array.from({length: 5}))
    this.roomTiles[0][0] = this.create(-2.5 * config.spriteSize, -2.5 * config.spriteSize, 'roguelikeSheet', 1428)
    //left.scale.setTo(config.spriteScale)
    //left.anchor.setTo(0.5)
  }

  /**********
   * Getters
   *********/
  exits() {
    return this.exits
  }
  alliesCount() {
    return 0
  }
  baddiesCount() {
    return 0
  }

  /**********
   * Setters
   *********/
  addExits(...exits) {
    this.exits = exits
  }
  addNellaMandelson(x, y) {
    console.log('addNellaMandelson', x, y)
  }
  addEndWindow(x, y) {
    console.log('addEndWindow', x, y)
  }
  addAlly(x, y) {
    console.log('addAlly', x, y)
  }
  addBaddy(x, y) {
    console.log('addBaddy', x, y)
  }
  addFurniture(x, y, spriteIndex) {
    console.log('addFurniture', x, y, spriteIndex)
  }
  addSideWallSprites(side) {
    console.log('addSideWallSprites', side)
  }
  addSideBarSprites(side) {
    console.log('addSideBarSprites', side)
  }
}
