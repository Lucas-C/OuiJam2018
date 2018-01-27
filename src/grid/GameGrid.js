import Phaser from 'phaser'

export default class GameGrid extends Phaser.Group {
    constructor(size = 5, gridWidthCell = game.width, gridHeightCell = game.height) {
        super(game);
        this.widthCell = gridWidthCell / size;
        this.heightCell = gridHeightCell / size;
    }

    placeAt(xx, yy, obj) {
        var x2 = this.widthCell * xx;
        var y2 = this.heightCell * yy;
        obj.x = x2;
        obj.y = y2;
    }

    addCell(x, y, cell) {
        console.log('addCell', x, y, cell)
    }

    cellPosAt(x, y) {
        console.log('cellPosAt', x, y)
        return null
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
