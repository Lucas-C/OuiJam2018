/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import Cursor from '../sprites/Cursor'
import ScrollMessage from '../sprites/ScrollMessage'
import LevelGrid from "../grid/LevelGrid";
import DIRECTION from "../const/Direction";
import Frame from "../const/Frame";
import PrisonCell from "../sprites/rooms/PrisonCell";

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


    this.dialogPicture = this.add.sprite(60, 60, this.selectOneInArray(['portraitNM1', 'portraitNM2']));
    this.dialogPicture.scale.setTo(2.5);
    this.dialogPicture.anchor.setTo(0.5);

    this.dialogLine = this.add.sprite(90, 90, 'line');
    this.dialogLine.scale.setTo(1);

    this.dialogFrame = this._createDialogFrame()

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
      this.dialogFrame.visible = false
      this.dialogPicture.visible = false
      this.dialogLine.visible = false
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

      if (this.currentRoom.isDoomed()) {
        // Skull sign (it will desapear)
        var skullSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, 'skull');
        skullSign.scale.setTo(0.8);
        skullSign.anchor.setTo(0.5);
        skullSign.alpha = 0.7;

        this.cursor.kill();

      } else if (this.currentRoom.isDangerous()) {
        // Warning sign (it will desapear)
        var warnSign = this.game.add.sprite(this.currentRoom.centerX, this.currentRoom.centerY, 'warning');
        warnSign.scale.setTo(0.8);
        warnSign.anchor.setTo(0.5);
        warnSign.alpha = 0.3;
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
    //game.camera.focusOnXY(200, 200)
    //game.camera.focusOn(this.cursor)

    if (this.scrollMsg.x === 0 && this.scrollMsg.y === 0) {
      // First scroll apparition, must be done after the sprites world positions have been updated
      this.scrollMsg.moveTo(this.currentRoom)
    }

    const successMsg = 'Good job !'
    const failureMsg = "It's all lost !\nThe message bearer has been backstabbed by a fascist"
    if (this.currentRoom.windowSprite) {
      if (!this.dialogFrame.visible && this.dialogFrame.text === successMsg) {
        this.cursor.resetOriginalMovements();
        this.state.start(this.nextLevel)
      } else {
        this.displayMessage(successMsg)
      }
    } else if (this.currentRoom.baddies.length > this.currentRoom.allies.length) {
      if (!this.dialogFrame.visible && this.dialogFrame.text === failureMsg) {
        this.cursor.resetOriginalMovements();
        this.state.start('Level0')
      } else {
        this.displayMessage(failureMsg)
      }
    }
  }

  _createDialogFrame() {
    const dialogFrame = this.add.text((config.gameWidth / 2) + 40, config.gameHeight * .08, '', {
      font: '36px VT323',
      fill: '#427a64',
      smoothed: false,
      align: "center",
    })
    dialogFrame.lineSpacing = 0
    dialogFrame.anchor.setTo(0.5)
    dialogFrame.visible = false

    this.game.input.keyboard.onPressCallback = () => {
      dialogFrame.visible = false
      this.dialogPicture.visible = false
      this.dialogLine.visible = false
    }
    return dialogFrame
  }

  displayMessage(msg) {
    this.dialogFrame.text = msg
    // this.dialogFrame.fontSize = fontSize
    this.dialogFrame.lineSpacing = -15;
    this.dialogFrame.visible = true
    this.dialogPicture.visible = true
    this.dialogLine.visible = true
  }

  render() {
    if (__DEV__) {
      //game.debug.spriteInfo(this.dialogFrame, 400, 600)
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

  prepareRoom(nbAllies, nbBaddies) {
    const room = new PrisonCell(this.getRoomWidthInPx(), this.getRoomHeightInPx())

    let allPossibilities = [
      [1,1],[1,2],[1,3],[1,4],[1,5],
      [2,1],[2,2],[2,3],[2,4],[2,5],
      [3,1],[3,2],[3,3],[3,4],[3,5],
      [4,1],[4,2],[4,3],[4,4],[4,5],
      [5,1],[5,2],[5,3],[5,4],[5,5]
    ];

    let randomPossibilities = this.shuffle(allPossibilities);
    let index = 0;

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
}
