import Phaser from 'phaser'
import FRAME from '../const/Frame'
import {selectOneInArray} from '../utils'

export default class extends Phaser.Sprite {
  constructor () {
    super(window.game, /* x= */0, /* y= */0, /* key= */'roguelikeSheet', /* frame= */FRAME.SCROLL_2)
    this.scale.setTo(2)
    this.owner = null
  }

  scrollToCharDelta (room) {
    return {x: 0.04 * room.roomWidth, y: 0.04 * room.roomHeight}
  }

  giveToChar (ally) {
    if (this.owner) {
      this.owner.hasScrollMsg = false
    }
    this.owner = ally
    this.owner.hasScrollMsg = true
    this.owner.add(this)
    const scrollToCharDelta = this.scrollToCharDelta(this.owner.room)
    this.position.setTo(-scrollToCharDelta.x, -scrollToCharDelta.y)
  }

  canBeSentTo (destRoom) {
    if (!this.owner) {
      return true
    }
    return !this.owner.room.getPassingToRoom(destRoom).walls
  }

  sendTo (ally) {
    // TODO:
    // - fix end move position glitch
    // - fix sprite disappearing during movement
    const dest = this.owner.room.getDeltaToTileInRoom({room: ally.room, toTileGridPos: ally.gridPos, fromTileGridPos: this.owner.gridPos})
    const scrollToCharDelta = this.scrollToCharDelta(ally.room)
    console.log('Sending scrollMsg to', ally.name, dest)
    const transmissionTween = window.game.add.tween(this).to({
      x: dest.x - scrollToCharDelta.x, y: dest.y - scrollToCharDelta.y
    }, /* duration= */500, /* ease= */Phaser.Easing.Cubic.InOut)
    transmissionTween.onComplete.add(() => this.giveToChar(ally))
    if (ally.room.windowSprite) {
      const finalDestX = this.x + (ally.room.windowSprite.x - this.x) * 100
      const finalDestY = this.y + (ally.room.windowSprite.y - this.y) * 100
      transmissionTween.chain(window.game.add.tween(this).to({x: finalDestX, y: finalDestY},
        /* duration= */1500, /* ease= */Phaser.Easing.Cubic.InOut))
    }
    transmissionTween.start()
    var moveSound = window.game.add.audio(selectOneInArray(['move1', 'move2']))
    moveSound.volume += -0.9
    moveSound.play()
  }
}
