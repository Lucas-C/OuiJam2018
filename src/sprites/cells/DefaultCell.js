import AlignGrid from '../../grid/AlignGrid'

export default class DefaultCell {
  constructor() {
    this.grid = new AlignGrid(5, 5);
    this.grid.show();
  }
}
