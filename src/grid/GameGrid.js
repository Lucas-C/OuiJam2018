import Phaser from 'phaser'

export default class GameGrid extends Phaser.Group {
  constructor (size, widthCell, heightCell, parent) {
    super(window.game, /* parent= */parent, 'GameGrid')
    this.size = size
    this.widthCell = widthCell
    this.heightCell = heightCell
  }

  placeAt (newGridPosX, newGridPosY, obj) {
    obj.gridPosX = newGridPosX
    obj.gridPosY = newGridPosY
    obj.x = this.widthCell * obj.gridPosX
    obj.y = this.heightCell * obj.gridPosY
  }

  showForDebug (lineColor = 0xff0000, lineSize = 4) {
    this.graphics = window.game.add.graphics()
    this.graphics.lineStyle(lineSize, lineColor, 1)
    for (var i = 0; i < this.game.width; i += this.widthCell) {
      this.graphics.moveTo(i, 0)
      this.graphics.lineTo(i, this.game.height)
    }
    for (var j = 0; j < this.game.height; j += this.heightCell) {
      this.graphics.moveTo(0, j)
      this.graphics.lineTo(this.game.width, j)
    }
  }
}
