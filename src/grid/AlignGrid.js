import Phaser from 'phaser'

export default class AlignGrid extends Phaser.Group {
    constructor(cols = 3, rows = 3, par = null) {
        super(game);
        //if not parent is passed then use the game
        if (par == null) {
            par = game;
        }
        //cw cell width is the parent width divided by the number of columns
        this.cw = par.width / cols;
        //ch cell height is the parent height divided the number of rows
        this.ch = par.height / rows;
        //promote to a class variable
        this.par = par;
    }
    //place an object in relation to the grid
    placeAt(xx, yy, obj) {
        //calculate the center of the cell
        //by adding half of the height and width
        //to the x and y of the coordinates
        var x2 = this.cw * xx + this.cw / 2;
        var y2 = this.ch * yy + this.ch / 2;
        obj.x = x2;
        obj.y = y2;
    }
    //mostly for planning and debugging this will
    //create a visual representation of the grid
    show() {
        this.graphics = game.add.graphics();
        this.graphics.lineStyle(4, 0xff0000, 1);
        //
        //
        for (var i = 0; i < this.par.width; i += this.cw) {
            this.graphics.moveTo(i, 0);
            this.graphics.lineTo(i, this.par.height);
        }
        for (var i = 0; i < this.par.height; i += this.ch) {
            this.graphics.moveTo(0, i);
            this.graphics.lineTo(this.par.width, i);
        }
    }
}
