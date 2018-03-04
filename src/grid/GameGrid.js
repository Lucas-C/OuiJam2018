import Phaser from 'phaser'

export default class GameGrid extends Phaser.Group {
  constructor ({colCount, rowCount, widthCell, heightCell, parent}) {
    super(window.game, /* parent= */parent, 'GameGrid')
    this.colCount = colCount
    this.rowCount = rowCount
    this.widthCell = widthCell
    this.heightCell = heightCell
  }

  placeAt (newGridPosX, newGridPosY, obj) {
    obj.gridPos = {x: newGridPosX, y: newGridPosY}
    obj.x = this.widthCell * obj.gridPos.x
    obj.y = this.heightCell * obj.gridPos.y
    // if (newGridPosX === 0 && newGridPosY === 0) this.topLeftCorner = obj
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
