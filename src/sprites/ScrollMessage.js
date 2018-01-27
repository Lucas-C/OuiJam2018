import Phaser from 'phaser'
import FRAME from "../const/Frame";

export default class extends Phaser.Sprite {
  constructor() {
    super(game, /*x=*/0, /*y=*/0, /*key=*/'roguelikeSheet', /*frame=*/FRAME.SCROLL_2)
    this.scale.setTo(2)
    this.visible = false
  }

  moveTo(newRoom) {
    if (newRoom.allies[0]) {
      const destX = newRoom.allies[0].world.x + 0.04 * newRoom.roomWidth
      const destY = newRoom.allies[0].world.y + 0.04 * newRoom.roomHeight
      const transmissionTween = game.add.tween(this).to({x: destX, y: destY},
        /*duration=*/500, /*ease=*/Phaser.Easing.Cubic.InOut)
      transmissionTween.onComplete.add(() => this.visible = true) // so that we don't see Nella receive it
      if (newRoom.windowSprite) {
        const finalDestX = destX + (newRoom.windowSprite.world.x - destX) * 100
        const finalDestY = destY + (newRoom.windowSprite.world.y - destY) * 100
        transmissionTween.chain(game.add.tween(this).to({x: finalDestX, y: finalDestY},
          /*duration=*/1500, /*ease=*/Phaser.Easing.Cubic.InOut))
      }
      transmissionTween.start()
      var moveSound = game.add.audio(this.selectOneInArray(['move1','move2']));
      moveSound.play();
    }
  }

  selectOneInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
