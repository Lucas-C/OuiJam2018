import DefaultRoom from "../sprites/rooms/DefaultRoom";

export default class Level1 {
    constructor(mainGrid) {
        this.cell1 = new DefaultRoom();
        mainGrid.placeAt(0, 0, this.cell1);

        this.cell2 = new DefaultRoom();
        mainGrid.placeAt(1, 1, this.cell2);
    }
}
