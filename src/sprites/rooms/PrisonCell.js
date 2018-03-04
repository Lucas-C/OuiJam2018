import BaseRoom from './BaseRoom'

export default class PrisonCell extends BaseRoom {
  constructor ({parent}) {
    super({parent: parent, name: 'PrisonCell'})
    this.setUniformBackground(0xCCCCCC)
  }
}
