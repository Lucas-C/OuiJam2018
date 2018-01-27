import BaseRoom from "./BaseRoom";

export default class PrisonCell extends BaseRoom {
    constructor() {
        super();

        const cell1 = this.create(0, 0, 'roguelikeSheet', 1428);
        const cell2 = this.create(0, 0, 'roguelikeSheet', 1428);
        this.grid.placeAt(0, 0, cell1);
        this.grid.placeAt(6, 6, cell2);
    }
}