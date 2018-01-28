import config from "../config";

export default class DeadTimer {
  constructor(game, itemInWhichToDraw, onTimerEnd) {
    this.game = game;
    this.itemInWhichToDraw = itemInWhichToDraw;
    this.id;
    this.remainingTime;
    this.remainingSecondsTxt;
    this.onTimerEnd = onTimerEnd;
    this.isEnded = false;
  }

  launch() {
    console.log('Start dead timer');
    this.remainingTime = config.deadTimerInSeconds;
    this._drawInfo();
    this.id = setInterval(() => this._decreaseTime(), 1000);
  }

  _decreaseTime() {
    console.log(`Remaining time for the dead timer : ${this.remainingTime}`);
    this.remainingTime -= 1;
    this._drawInfo();
    if (this.remainingTime <= 0) {
      this.isEnded = true;
      this.stop();
      this.onTimerEnd();
    }
  }

  stop() {
    console.log('Stop dead timer');
    this._clearInfo();
    clearInterval(this.id);
  }

  _clearInfo() {
    if (this.remainingSecondsTxt) {
      this.remainingSecondsTxt.kill();
    }
  }

  _drawInfo() {
    this._clearInfo();
    this.remainingSecondsTxt = this.itemInWhichToDraw.add.text(70, (this.game.height / 2) + (this.game.height / 4), 'HURRY \nUP! \n' + this.remainingTime + ' ', {
      font: '40px Bangers',
      fill: '#b65e26',
      smoothed: false,
      stroke: '#000000',
      strokeThickness: 8,
      align: 'center'
    });
    this.remainingSecondsTxt.lineSpacing = -15;
    this.remainingSecondsTxt.anchor.setTo(0.5);
  }
}
