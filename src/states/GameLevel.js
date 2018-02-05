/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import ScrollMessage from '../sprites/ScrollMessage'
import LevelGrid from '../grid/LevelGrid'
import DIRECTION from '../const/Direction'
import DeadTimer from '../sprites/DeadTimer'
import LevelHelper from './levels/LevelHelper'
import {selectOneInArray} from '../utils'

export default class GameLevel extends Phaser.State {
  init () {
    this.msgsAlreadyDisplayed = new Set()
    this.roomsPerLevelSide = 5 // Can be overridden per level
    this.deadTimer = new DeadTimer(this.game, this, () => {
      this._addSkullInCurrentRoom()
    })
  }

  getRoomWidthInPx () {
    return config.levelGridWidth / this.roomsPerLevelSide
  }

  getRoomHeightInPx () {
    return config.levelGridHeight / this.roomsPerLevelSide
  }

  preload () {
    this.game.world.setBounds(0, 0, config.worldWidth, config.worldHeight)
    // game.world.scale.setTo(1.1) // Camera zoom
    this.rootGroup = new Phaser.Group(this.game, /* parent= */null, /* name= */'rootGroup')

    this.levelGrid = new LevelGrid(this.roomsPerLevelSide, config.levelGridWidth, config.levelGridHeight, this.rootGroup)
    // this.levelGrid.showForDebug();

    this.helper = new LevelHelper(this);

    this.nextLevel = null // By default we consider the level to be the last one
    this.currentRoom = null // Dummy, must be overriden by child level
  }

  create () {
    this.cursor = new Cursor(this.getRoomWidthInPx(), this.getRoomHeightInPx(), this.rootGroup)
    this.game.add.existing(this.cursor)

    this._createDialogFrame()

    const cursorKeys = this.game.input.keyboard.createCursorKeys()
    cursorKeys.left.onDown.add(() => this.moveCursor(DIRECTION.LEFT))
    cursorKeys.right.onDown.add(() => this.moveCursor(DIRECTION.RIGHT))
    cursorKeys.up.onDown.add(() => this.moveCursor(DIRECTION.UP))
    cursorKeys.down.onDown.add(() => this.moveCursor(DIRECTION.DOWN))

    this.scrollMsg = new ScrollMessage()
    this.game.add.existing(this.scrollMsg)
    this.time.events.add(500, () => this.scrollMsg.sendTo(this.nellaMandelson))

    if (this.currentRoom.onEnterPrecondition) {
      this.currentRoom.onEnterPrecondition()
    }
  }

  moveCursor (inputDirection) {
    if (this.dialogFrame.visible) {
      this._hideMessage()
      if (this.isGameWon() || this.isGameLost()) {
        return
      }
    }
    const wantedMovement = this.cursor.getMovementByName(inputDirection)
    const direction = wantedMovement.directionName
    console.log(`Input direction ${inputDirection}. Want to go ${direction}.`)
    if (!this.currentRoom.exits.includes(direction)) {
      console.log('Cannot go ' + direction + ' in current room')
      return
    }
    const [srcX, srcY] = [this.currentRoom.gridPosX, this.currentRoom.gridPosY]
    const [dstX, dstY] = [srcX + wantedMovement.deltaX, srcY + wantedMovement.deltaY]
    const newRoom = this.levelGrid.roomAtPos(dstX, dstY)
    if (!newRoom) {
      console.log('Cannot move from', [srcX, srcY], 'to', [dstX, dstY])
      return
    }
    if (newRoom.onEnterPrecondition && newRoom.onEnterPrecondition() === false) {
      console.log('newRoom.onEnterPrecondition exists and returned false => not entering it')
      return
    }
    if (this.scrollMsg.owner.room === this.currentRoom && this.scrollMsg.owner.canMoveTo(newRoom)) {
      this.scrollMsg.owner.moveTo(newRoom)
    } else if (newRoom.allies()[0]) {
      this.scrollMsg.sendTo(newRoom.allies()[0])
    }
    this.currentRoom = newRoom
    this.deadTimer.stop()
    console.log('Moved from', [srcX, srcY], 'to', [dstX, dstY])
    console.log('New room pos:', this.currentRoom.position)
    /* console.log('levelGrid 1st room world pos:', this.levelGrid.rooms[0][0].position)
     const sprite = this.levelGrid.rooms[0][0].topLeftCorner
     console.log('sprite world pos:', sprite.world) */

    if (this.isGameLost()) {
      this._addSkullInCurrentRoom()
    } else if (this.currentRoom.isDangerous()) {
      // Warning sign (it will desapear)
      var warnSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, 'warning')
      warnSign.scale.setTo(0.3)
      warnSign.anchor.setTo(0.5)
      warnSign.alpha = 0.5
      this.game.add.tween(warnSign).to({alpha: 0}, 2000, 'Linear', true)
      // shuffle the arrows and put them in RED
      this.cursor.randomizeMovements()
      this.deadTimer.launch()
    } else {
      // reset arrows order and color
      this.cursor.resetOriginalMovements()
    }
  }

  _addSkullInCurrentRoom () {
    // Skull sign (it will disappear)
    var skullSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, selectOneInArray(['skull1', 'skull2', 'skull3']), Math.floor(Math.random() * 12))
    skullSign.scale.setTo(0.5)
    skullSign.anchor.setTo(0.5)
    skullSign.alpha = 0.5

    this.cursor.kill()
  }

  update () {
    super.update()
    this.cursor.moveTo(this.currentRoom.x, this.currentRoom.y)

    // game.camera.position = ...
    // game.camera.focusOnXY(200, 200)
    // game.camera.focusOn(this.cursor)

    if (this.isGameWon()) { // end cell
      this.onGameWon()
    } else if (this.isGameLost()) {
      this.onGameLost()
    }
  }

  isGameWon () {
    return this.currentRoom.windowSprite // end cell
  }

  onGameWon () {
    const successMsg = 'Good job !'
    if (!this.dialogFrame.visible && this.dialogFrame.text === successMsg) {
      this.cursor.resetOriginalMovements()
      this.state.start(this.nextLevel)
    } else {
      this.displayMessage(successMsg)
    }
  }

  isGameLost () {
    return this.currentRoom.baddies().length > this.currentRoom.allies().length || this.deadTimer.isEnded
  }

  onGameLost () {
    const tooSlowFail = 'Too slow !\nA fascist in this cell stole your message '
    const badCellFail = 'Bad decision !\nThe message has been stolen by a fascist '
    if (!this.dialogFrame.visible && (this.dialogFrame.text === tooSlowFail || this.dialogFrame.text === badCellFail)) {
      this.cursor.resetOriginalMovements()
      this.state.start('Level0')
    } else {
      if (this.deadTimer.isEnded) {
        this.displayMessage(tooSlowFail)
      } else {
        this.displayMessage(badCellFail)
      }
    }
  }

  _createDialogFrame () {
    this.dialogFrame = this.add.text(config.gameWidth * 0.6, config.gameHeight * 0.1, '', {
      font: '36px VT323',
      fill: '#427a64',
      smoothed: false,
      align: 'center'
    })
    this.dialogFrame.scale.setTo(0.9)
    this.dialogFrame.anchor.setTo(0.6)

    this.dialogPicture = this.add.sprite(config.gameWidth * 0.08, config.gameHeight * 0.08, 'portraitNellaMandelson')
    this.dialogPicture.scale.setTo(1.5)
    this.dialogPicture.anchor.setTo(0.5)

    this.dialogLine = this.add.sprite(config.gameWidth * 0.13, config.gameHeight * 0.13, 'line')

    this._hideMessage()

    this.game.input.keyboard.onPressCallback = () => {
      this._hideMessage()
    }
  }

  _hideMessage () {
    this.dialogFrame.visible = false
    this.dialogPicture.visible = false
    this.dialogLine.visible = false
    if (this.dialogExtraSprite) {
      this.dialogExtraSprite.visible = false
    }
    if (this.dialogExtraSpriteInterval) {
      clearInterval(this.dialogExtraSpriteInterval)
    }
  }

  displayMessage (msg, extraSprite) {
    if (this.msgsAlreadyDisplayed.has(msg)) { return }
    this.msgsAlreadyDisplayed.add(msg)

    this.dialogFrame.text = msg
    // this.dialogFrame.fontSize = fontSize
    this.dialogFrame.lineSpacing = -15
    this.dialogFrame.visible = true
    this.dialogPicture.visible = true
    this.dialogLine.visible = true
    if (extraSprite) {
      const {spriteSheet, indices, angles, percentX, percentY, scale} = extraSprite
      if (this.dialogExtraSprite) {
        this.dialogExtraSprite.destroy()
      }
      this.dialogExtraSprite = this.add.sprite(percentX * config.gameWidth, percentY * config.gameHeight, spriteSheet, indices[0])
      this.dialogExtraSprite.angle = (angles && angles[0]) || 0
      this.dialogExtraSprite.scale.setTo(scale)
      this.dialogExtraSprite.anchor.setTo(0.5)
      if (indices.length > 1) {
        if (this.dialogExtraSpriteInterval) {
          clearInterval(this.dialogExtraSpriteInterval)
        }
        let i = 0
        this.dialogExtraSpriteInterval = setInterval(() => {
          i++
          this.dialogExtraSprite.frame = indices[i % indices.length]
          if (angles) {
            this.dialogExtraSprite.angle = angles[i % angles.length]
          }
        }, 500)
      }
    }
  }

  render () {
    if (__DEV__) {
      // if (this.dialogExtraSprite) { game.debug.spriteInfo(this.dialogExtraSprite, 400, 600) }
      // game.debug.cameraInfo(game.camera, 32, 32)
    }
  }

  setLevelNumber (number) {
    let levelNumber = this.add.text(70, this.game.height / 2, 'LVL\n' + number + ' ', {
      font: '60px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    })
    levelNumber.lineSpacing = -15
    levelNumber.anchor.setTo(0.5)
  }
}
