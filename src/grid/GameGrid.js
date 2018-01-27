import Phaser from 'phaser'

export default class GameGrid extends Phaser.Group {
    constructor(widthCell, heightCell, parent) {
        super(game, /*parent=*/parent, 'GameGrid');
        this.widthCell = widthCell
        this.heightCell = heightCell
    }

  placeAt(xx, yy, obj, offsetx=0, offsety=0) {
        console.log('offsetx', offsetx, 'offsety', offsety);
    obj.gridPosX = xx;
    obj.gridPosY = yy;
    obj.x = (this.widthCell * xx)+offsetx;
    obj.y = (this.heightCell * yy)+offsety;
  }


    showForDebug(lineColor = 0xff0000, lineSize = 4) {
        this.graphics = game.add.graphics();
        this.graphics.lineStyle(lineSize, lineColor, 1);
        for (var i = 0; i < this.game.width; i += this.widthCell) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.game.height);
        }
        for (var i = 0; i < this.game.height; i += this.heightCell) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.game.width, i);
        }
    }
}
