import GameLevel from '../GameLevel'
import Guard from '../../sprites/characters/Guard'
import AlignGrid from "../../grid/AlignGrid";

export default class extends GameLevel {
    create() {
        super.create()

        this.mainGrid = new AlignGrid(5, 5);
        this.mainGrid.show();

        this.guard = new Guard({
            game: this.game,
            x: this.world.centerX,
            y: this.world.centerY
        })
        this.game.add.existing(this.guard)
    }

    update() {
        super.update()
        this.guard.update()
    }
}
