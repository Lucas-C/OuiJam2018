import Phaser from 'phaser'

import config from '../config'

export default class extends Phaser.Group {
    constructor() {
        super(game)
    }
    //place an object in relation to the grid
    placeAt(xx, yy, obj) {
        //calculate the center of the cell
        //by adding half of the height and width
        //to the x and y of the coordinates
        var x2 = config.getRoomSize() * xx + config.getRoomSize() / 2
        var y2 = config.getRoomSize() * yy + config.getRoomSize() / 2
        obj.x = x2
        obj.y = y2
    }
    //mostly for planning and debugging this will
    //create a visual representation of the grid
    show() {
        this.graphics = this.game.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, 1)
        //
        //
        for (var i = 0; i < this.game.world.width; i += config.getRoomSize()) {
            this.graphics.moveTo(i, 0)
            this.graphics.lineTo(i, this.game.world.height)
        }
        for (var i = 0; i < this.game.world.height; i += config.getRoomSize()) {
            this.graphics.moveTo(0, i)
            this.graphics.lineTo(this.game.world.width, i)
        }
    }
}
