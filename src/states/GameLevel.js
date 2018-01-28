/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import ScrollMessage from '../sprites/ScrollMessage'
import LevelGrid from "../grid/LevelGrid";
import DIRECTION from "../const/Direction";
import PrisonCell from "../sprites/rooms/PrisonCell";
import PrisonCorridor from "../sprites/rooms/PrisonCorridor";

export default class GameLevel extends Phaser.State {

  init() {
    this.roomsPerLevelSide = 5 // Can be overriden per level
  }

  getRoomWidthInPx() {
    return config.levelGridWidth / this.roomsPerLevelSide
  }

  getRoomHeightInPx() {
    return config.levelGridHeight / this.roomsPerLevelSide
  }

  preload() {
    game.world.setBounds(0, 0, config.worldWidth, config.worldHeight)
    //game.world.scale.setTo(1.1) // Camera zoom
    this.rootGroup = new Phaser.Group(game, /*parent=*/null, /*name=*/'rootGroup')

    this.levelGrid = new LevelGrid(this.roomsPerLevelSide, config.levelGridWidth, config.levelGridHeight, this.rootGroup);
    //this.levelGrid.showForDebug();

    this.nextLevel = null // By default we consider the level to be the last one
    this.currentRoom = null // Dummy, must be overriden by child level
  }

  create() {
    this.cursor = new Cursor(this.getRoomWidthInPx(), this.getRoomHeightInPx(), this.rootGroup)
    game.add.existing(this.cursor)

    this._createDialogFrame()

    const cursorKeys = game.input.keyboard.createCursorKeys()
    cursorKeys.left.onDown.add(() => this.moveCursor(DIRECTION.LEFT))
    cursorKeys.right.onDown.add(() => this.moveCursor(DIRECTION.RIGHT))
    cursorKeys.up.onDown.add(() => this.moveCursor(DIRECTION.UP))
    cursorKeys.down.onDown.add(() => this.moveCursor(DIRECTION.DOWN))

    this.scrollMsg = new ScrollMessage()
    game.add.existing(this.scrollMsg)

    if (this.currentRoom.onEnterPrecondition) {
      this.currentRoom.onEnterPrecondition()
    }
  }

  moveCursor(inputDirection) {
    if (this.dialogFrame.visible) {
      this._hideMessage()
      if (this.isGameWon() || this.isGameLost()) {
        return
      }
    }
    const wantedMovement = this.cursor.getMovementByName(inputDirection);
    const direction = wantedMovement.directionName;
    console.log(`Input direction ${inputDirection}. Want to go ${direction}.`);
    if (!this.currentRoom.exits.includes(direction)) {
      console.log('Cannot go ' + direction + ' in current room')
      return
    }
    const [srcX, srcY] = [this.currentRoom.gridPosX, this.currentRoom.gridPosY]
    const [dstX, dstY] = [srcX + wantedMovement.deltaX, srcY + wantedMovement.deltaY]
    const newRoom = this.levelGrid.roomAtPos(dstX, dstY)
    if (newRoom) {
      if (newRoom.onEnterPrecondition && newRoom.onEnterPrecondition() === false) {
        console.log('newRoom.onEnterPrecondition exists and returned false => not entering it')
        return
      }
      this.currentRoom = newRoom;
      this.scrollMsg.moveTo(newRoom)
      console.log('Moved from', [srcX, srcY], 'to', [dstX, dstY])
      console.log('New room pos:', this.currentRoom.position)
      /*console.log('levelGrid 1st room world pos:', this.levelGrid.rooms[0][0].position)
       const sprite = this.levelGrid.rooms[0][0].topLeftCorner
       console.log('sprite world pos:', sprite.world)*/

      if (this.isGameLost()) {
        // Skull sign (it will disappear)
        var skullSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, this.selectOneInArray(['skull1','skull2','skull3']), Math.floor(Math.random() * 12));
        skullSign.scale.setTo(0.5);
        skullSign.anchor.setTo(0.5);
        skullSign.alpha = 0.5;

        this.cursor.kill();

      } else if (this.currentRoom.isDangerous()) {
        // Warning sign (it will desapear)
        var warnSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, 'warning');
        warnSign.scale.setTo(0.3);
        warnSign.anchor.setTo(0.5);
        warnSign.alpha = 0.5;
        game.add.tween(warnSign).to({alpha: 0}, 2000, "Linear", true);

        // shuffle the arrows and put them in RED
        this.cursor.randomizeMovements();

      } else {
        // reset arrows order and color
        this.cursor.resetOriginalMovements();
      }

    } else {
      console.log('Cannot move from', [srcX, srcY], 'to', [dstX, dstY])
    }
  }

  update() {
    super.update()
    this.cursor.moveTo(this.currentRoom.x, this.currentRoom.y);

    //game.camera.position = ...
    //game.camera.focusOnXY(200, 200)
    //game.camera.focusOn(this.cursor)

    if (this.scrollMsg.x === 0 && this.scrollMsg.y === 0) {
      // First scroll apparition, must be done after the sprites world positions have been updated
      this.scrollMsg.moveTo(this.currentRoom)
    }

    const successMsg = 'Good job !'
    const failureMsg = "It's all lost !\nThe message has been stolen by a fascist"
    if (this.isGameWon()) { // end cell
      if (!this.dialogFrame.visible && this.dialogFrame.text === successMsg) {
        this.cursor.resetOriginalMovements();
        this.state.start(this.nextLevel)
      } else {
        this.displayMessage(successMsg)
      }
    } else if (this.isGameLost()) {
      if (!this.dialogFrame.visible && this.dialogFrame.text === failureMsg) {
        this.cursor.resetOriginalMovements();
        this.state.start('Level0')
      } else {
        this.displayMessage(failureMsg)
      }
    }
  }

  isGameWon() {
    return this.currentRoom.windowSprite // end cell
  }

  isGameLost() {
    return this.currentRoom.baddies().length > this.currentRoom.allies().length
  }

  _createDialogFrame() {
    this.dialogFrame = this.add.text(config.gameWidth * .6, config.gameHeight * .1, '', {
      font: '36px VT323',
      fill: '#427a64',
      smoothed: false,
      align: 'center',
    })
    this.dialogFrame.scale.setTo(.9)
    this.dialogFrame.anchor.setTo(0.6)

    this.dialogPicture = this.add.sprite(config.gameWidth * .08, config.gameHeight * .08, 'portraitNellaMandelson');
    this.dialogPicture.scale.setTo(1.5);
    this.dialogPicture.anchor.setTo(0.5);

    this.dialogLine = this.add.sprite(config.gameWidth * .13, config.gameHeight * .13, 'line');

    this._hideMessage()

    this.game.input.keyboard.onPressCallback = () => {
      this._hideMessage()
    }
  }

  _hideMessage() {
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

  displayMessage(msg, extraSprite) {
    this.dialogFrame.text = msg
    // this.dialogFrame.fontSize = fontSize
    this.dialogFrame.lineSpacing = -15;
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

  render() {
    if (__DEV__) {
      //if (this.dialogExtraSprite) { game.debug.spriteInfo(this.dialogExtraSprite, 400, 600) }
      //game.debug.cameraInfo(game.camera, 32, 32)
    }
  }

  selectOneInArray(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  setLevelNumber(number) {
    let levelNumber = this.add.text(70, this.game.height / 2, 'LVL\n' + number + ' ', {
      font: '60px Bangers',
      fill: '#D86785',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    });
    levelNumber.lineSpacing = -15;
    levelNumber.anchor.setTo(0.5);
  }

  makePrisonCell(nbAllies, nbBaddies, withNelly=false) {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())

    let allPossibilities = [
      [1,1],[1,2],[1,3],[1,4],[1,5],
      [2,1],[2,2],[2,3],[2,4],[2,5],
      [3,1],[3,2],[3,4],[3,5],
      [4,1],[4,2],[4,3],[4,4],[4,5],
      [5,1],[5,2],[5,3],[5,4],[5,5]
    ];

    if (!withNelly) {
      allPossibilities.push([3,3]);
    }

    let randomPossibilities = this.shuffle(allPossibilities);
    let index = 0;

    // NELLY
    if (withNelly) {
      room.addNellaMandelson(3, 3);
    }

    // ALLIES
    for (var ally=0; ally<nbAllies; ally++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addAlly(coord[0], coord[1]);
    }

    // BADDIES
    for (var bad=0; bad<nbBaddies; bad++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addBaddy(coord[0], coord[1]);
    }

    // FURNITURES
    let nbFurnitures = Math.floor(Math.random() * 4) + 1;
    for (var fur=0; fur<nbFurnitures; fur++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addFurniture(coord[0], coord[1]);
    }

    // DECO
    let nbDeco = Math.floor(Math.random() * 6) + 2;
    for (var dec=0; dec<nbDeco; dec++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addDecoCell(coord[0], coord[1]);
    }

    return room
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  createCorridor() {
    const room = new PrisonCorridor(this.getRoomWidthInPx(), this.getRoomHeightInPx())

    let allPossibilities = [
      [1,1],[1,2],[1,3],[1,4],[1,5],
      [2,1],[2,2],[2,3],[2,4],[2,5],
      [3,1],[3,2],[3,3],[3,4],[3,5],
      [4,1],[4,2],[4,3],[4,4],[4,5],
      [5,1],[5,2],[5,3],[5,4],[5,5]
    ];

    let randomPossibilities = this.shuffle(allPossibilities);
    let index = 0;

    // GUARDS
    let nbGuards = Math.floor(Math.random() * 3) + 1; // 1 to 4 guards
    for (var i = 0; i < nbGuards; i++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addGuard(coord[0], coord[1]);
    }

    // DECO
    let nbDeco = Math.floor(Math.random() * 6) + 2;
    for (var dec=0; dec<nbDeco; dec++) {
      let coord = randomPossibilities[index];
      index = index+1
      room.addDecoCorridor(coord[0], coord[1]);
    }

    return room
  }
}
