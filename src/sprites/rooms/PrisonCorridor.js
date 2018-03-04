import BaseRoom from './BaseRoom'

import Frame from '../../const/Frame'

export default class PrisonCell extends BaseRoom {
  constructor ({parent}) {
    super({parent: parent, name: 'PrisonCorridor'})
    this.groundTilesIndices = Frame.FLOOR_CORRIDOR
    this.setGroundTiles()
  }
}
