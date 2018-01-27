import GameLevel from '../GameLevel'
import Guard from '../../sprites/characters/Guard'

export default class extends GameLevel {
  preload() {
    super.preload()
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
