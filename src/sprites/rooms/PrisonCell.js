import BaseRoom from "./BaseRoom";

import Frame from "../../const/Frame";

export default class PrisonCell extends BaseRoom {

  constructor() {
    super()
    this.groundTilesIndices = Frame.FLOOR_CELL_BASIC;
    this.setGroundTiles()
  }
}