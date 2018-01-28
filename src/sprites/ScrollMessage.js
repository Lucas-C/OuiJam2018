import Phaser from 'phaser'
import FRAME from "../const/Frame";

export default class extends Phaser.Sprite {
  constructor() {
    super(game, /*x=*/0, /*y=*/0, /*key=*/'roguelikeSheet', /*frame=*/FRAME.SCROLL_2)
    this.scale.setTo(2)
    this.visible = false
    this.owner = null
  }

  sendTo(ally) {
    if (this.owner) {
      this.owner.hasScrollMsg = false
    }
    ally.hasScrollMsg = true
    this.owner = ally

    const destX = ally.worldPosition.x - 0.04 * ally.room.roomWidth
    const destY = ally.worldPosition.y - 0.04 * ally.room.roomHeight
    console.log('Sending scrollMsg to', ally)
    const transmissionTween = game.add.tween(this).to({x: destX, y: destY},
      /*duration=*/500, /*ease=*/Phaser.Easing.Cubic.InOut)
    transmissionTween.onComplete.add(() => this.visible = true) // so that we don't see Nella receive it
    if (ally.room.windowSprite) {
      const finalDestX = destX + (ally.room.windowSprite.world.x - destX) * 100
      const finalDestY = destY + (ally.room.windowSprite.world.y - destY) * 100
      transmissionTween.chain(game.add.tween(this).to({x: finalDestX, y: finalDestY},
        /*duration=*/1500, /*ease=*/Phaser.Easing.Cubic.InOut))
    }
    transmissionTween.start()
    var moveSound = game.add.audio(this.selectOneInArray(['move1', 'move2']));
    moveSound.volume += -0.9;
    moveSound.play();
  }

  selectOneInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
}
