/* globals __DEV__ */
import Phaser from 'phaser'
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

        // Starting room:
        this.currentRoom = new Phaser.Point()
    }

    update() {
        super.update()
        const levelWon = false
        const levellost = false
        if (levelWon) {
            // TODO: Show a test message beforehand
            this.state.start('Level1')
        } else if (levellost) {
        // TODO: Show a test message beforehand
            this.state.start('Level0')
        }
    }
}
