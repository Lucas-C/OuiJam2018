export default {
  gameWidth: 1120,
  gameHeight: 1120,
  worldWidth: 2 * 1120,
  worldHeight: 2 * 1120,
  localStorageName: 'OuiJam2018',
  levelBackgroundColor: '#edeec9',
  deadTimerInSeconds: 3,
  spriteSize: 16,
  cellsPerRoomSide: 7,
  roomSizeInPx: function () { return this.cellsPerRoomSide * this.spriteSize },
  topHUDHeight: function () { return this.gameHeight * 0.15 },
  leftHUDWidth: function () { return this.gameWidth * 0.15 },
  cameraBoundsMarginInPx: 50,
  debugColorMainGrid: 0xff0000,
  debugColorRoomGrid: 0x0077ff,
  debugSizeMainGrid: 4,
  debugSizeRoomGrid: 2
}
