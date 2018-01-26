import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //

      this.load.spritesheet('roguelikeChar', './assets/images/roguelikeChar_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
      this.load.spritesheet('roguelikeDungeon', './assets/images/roguelikeDungeon_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
      this.load.spritesheet('roguelikeIndoor', './assets/images/roguelikeIndoor_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
      this.load.spritesheet('roguelikeSheet', './assets/images/roguelikeSheet_transparent.png', 16, 16, /*frameMax=*/-1, /*margin=*/0, /*space=*/1)
  }

  create () {
    this.state.start('Game')
  }
}
