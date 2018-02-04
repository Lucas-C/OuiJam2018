import BaseRoom from './BaseRoom'

export default class PrisonCell extends BaseRoom {
  constructor (roomWidth, roomHeight) {
    super(roomWidth, roomHeight)
    this.setUniformBackground(0xCCCCCC)
  }
}
