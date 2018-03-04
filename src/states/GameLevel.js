/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import ScrollMessage from '../sprites/ScrollMessage'
import PrisonCorridor from '../sprites/rooms/PrisonCorridor'
import LevelGrid from '../grid/LevelGrid'
import DIRECTION from '../const/Direction'
import DeadTimer from '../sprites/DeadTimer'
import LevelHelper from './levels/LevelHelper'
import {selectOneInArray} from '../utils'

export default class GameLevel extends Phaser.State {
  init () {
    this.stage.backgroundColor = config.levelBackgroundColor
    this.msgsAlreadyDisplayed = new Set()
    this.colCount = 5 // Can be overridden per level
    this.rowCount = 5 // Can be overridden per level
    this.deadTimer = new DeadTimer(this.game, this, () => {
      this._addSkullInCurrentRoom()
    })
  }

  preload () {
    this.game.world.setBounds(0, 0, config.worldWidth, config.worldHeight)
    this.rootGroup = new Phaser.Group(this.game, /* parent= */undefined, /* name= */'rootGroup')
    const gameScale = Math.max(config.gameWidth, config.gameHeight) / (config.roomSizeInPx() * 4)
    console.log('(camera zoom) Setting rootGroup scale to', gameScale)
    this.rootGroup.scale.setTo(gameScale)

    // Adding HUD **after** so it is **over** the level
    this.hud = new Phaser.Group(this.game, /* parent= */undefined, /* name= */'HUD')
    this.hud.fixedToCamera = true

    this.levelGrid = new LevelGrid({colCount: this.colCount, rowCount: this.rowCount, parent: this.rootGroup})
    // this.levelGrid.showForDebug();

    this.helper = new LevelHelper(this)

    this.nextLevel = null // By default we consider the level to be the last one
    this.currentRoom = null // Dummy, must be overriden by child level
  }

  create () {
    this.cursor = new Cursor({parent: this.rootGroup})
    this.game.world.add(this.cursor)
    this.rootGroup.add(this.cursor)
    this.cursor.moveTo(this.nellaMandelson.room.x, this.nellaMandelson.room.y)

    this.game.camera.bounds = new Phaser.Rectangle(
      /* x= */this.game.world.bounds.x - config.cameraBoundsMarginInPx - config.leftHUDWidth(),
      /* y= */this.game.world.bounds.y - config.cameraBoundsMarginInPx - config.topHUDHeight(),
      /* width= */this.game.world.bounds.width + config.cameraBoundsMarginInPx * 2 + config.leftHUDWidth(),
      /* height= */this.game.world.bounds.height + config.cameraBoundsMarginInPx * 2 + config.topHUDHeight()
    )
    this.game.camera.follow(this.cursor, Phaser.Camera.FOLLOW_LOCKON, 0.12, 0.12)

    this._initHUD()

    const cursorKeys = this.game.input.keyboard.createCursorKeys()
    cursorKeys.left.onDown.add(() => this.moveCursor(DIRECTION.LEFT))
    cursorKeys.right.onDown.add(() => this.moveCursor(DIRECTION.RIGHT))
    cursorKeys.up.onDown.add(() => this.moveCursor(DIRECTION.UP))
    cursorKeys.down.onDown.add(() => this.moveCursor(DIRECTION.DOWN))

    this.scrollMsg = new ScrollMessage()
    this.game.world.add(this.scrollMsg)
    this.scrollMsg.giveToChar(this.nellaMandelson)

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
    const newRoom = this.currentRoom.getRoomInDirection(wantedMovement)
    if (!newRoom) {
      console.log('No room exists in direction required')
      return
    }
    if (newRoom instanceof PrisonCorridor) {
      console.log('Cannot pass scroll message to a guards corridor !')
      return
    }
    if (!this.scrollMsg.canBeSentTo(newRoom)) {
      console.log('Cannot send scroll msg : a wall is blocking')
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
    console.log('New room pos:', this.currentRoom.position)

    this.cursor.moveTo(this.currentRoom.x, this.currentRoom.y)

    if (this.isGameLost()) {
      this._addSkullInCurrentRoom()
    } else if (this.currentRoom.isDangerous()) {
      // Warning sign (it will desapear)
      var warnSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, 'warning')
      this.rootGroup.add(warnSign)
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
    this.rootGroup.add(skullSign)
    skullSign.scale.setTo(0.5)
    skullSign.anchor.setTo(0.5)
    skullSign.alpha = 0.5

    this.cursor.kill()
  }

  update () {
    super.update()

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

  _initHUD () {
    var color = Phaser.Color.hexToColor(config.levelBackgroundColor) // '#ff0000') // RED color for debugging
    var verticalColoredRectBitmap = this.game.add.bitmapData(config.leftHUDWidth(), config.gameHeight).fill(color.r, color.g, color.b)
    this.hud.create(0, 0, verticalColoredRectBitmap)
    var horizontalColoredRectBitmap = this.game.add.bitmapData(config.gameWidth, config.topHUDHeight()).fill(color.r, color.g, color.b)
    this.hud.create(0, 0, horizontalColoredRectBitmap)

    this._createDialogFrame()
  }

  _createDialogFrame () {
    this.dialogFrame = this.hud.add(new Phaser.Text(this.game, config.gameWidth * 0.6, config.gameHeight * 0.1, '', {
      font: '36px VT323',
      fill: '#427a64',
      smoothed: false,
      align: 'center'
    }))
    this.dialogFrame.scale.setTo(0.9)
    this.dialogFrame.anchor.setTo(0.6)

    this.dialogLine = this.hud.create(config.gameWidth * 0.6, config.gameHeight * 0.13, 'line')
    this.dialogLine.anchor.setTo(0.6)

    this.dialogPicture = this.hud.create(config.gameWidth * 0.08, config.gameHeight * 0.08, 'portraitNellaMandelson')
    this.dialogPicture.scale.setTo(1.5)
    this.dialogPicture.anchor.setTo(0.5)

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
      this.dialogExtraSprite = this.hud.create(percentX * config.gameWidth, percentY * config.gameHeight, spriteSheet, indices[0])
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
      this.game.debug.font = '32px Courier'
      this.game.debug.lineHeight = 32
      // this.game.debug.spriteInfo(this.nellaMandelson.sprites[0], 0, .7* this.game.height)
      // this.game.debug.spriteInfo(this.scrollMsg, this.game.width / 2, .85 * this.game.height)
      // this.game.debug.cameraInfo(game.camera, this.game.width / 2, .45 * this.game.height)
    }
  }

  setLevelNumber (number) {
    let levelNumber = this.hud.add(new Phaser.Text(this.game, 70, this.game.height / 2, 'LVL\n' + number + ' ', {
      font: '60px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    }))
    levelNumber.anchor.setTo(0.5)
    levelNumber.lineSpacing = -15
  }
}
