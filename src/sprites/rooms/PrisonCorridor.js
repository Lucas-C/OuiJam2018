import BaseRoom from "./BaseRoom";

import Frame from "../../const/Frame";

export default class PrisonCell extends BaseRoom {

  constructor(roomWidth, roomHeight) {
    super(roomWidth, roomHeight)
    this.groundTilesIndices = Frame.FLOOR_CORRIDOR;
    this.setGroundTiles()
  }
}