/* globals __DEV__ */
import PrisonCell from '../../sprites/rooms/PrisonCell'
import PrisonCorridor from '../../sprites/rooms/PrisonCorridor'
import {selectOneInArray, shuffle} from '../../utils'

export default class LevelHelper {
  constructor(game) {
    this.game = game
  }

  makePrisonCell({nbAllies = 0, nbBaddies = 0, sideMetalBars, sideWalls, exits, withNelly = false, endWindow}) {
    const room = new PrisonCell(this.game.getRoomWidthInPx(), this.game.getRoomHeightInPx())

    if (sideMetalBars) {
      room.addSideMetalBars(...sideMetalBars)
    }
    if (sideWalls) {
      room.addSideWalls(...sideWalls)
    }
    if (exits) {
      room.addExits(...exits)
    }

    let allPossibilities = [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
      [3, 1], [3, 2], [3, 4], [3, 5],
      [4, 1], [4, 2], [4, 3], [4, 4], [4, 5],
      [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]
    ]

    if (!withNelly) {
      allPossibilities.push([3, 3])
    }

    let randomPossibilities = shuffle(allPossibilities)
    let index = 0

    // NELLY
    if (withNelly) {
      this.game.nellaMandelson = room.addNellaMandelson(3, 3)
    }

    // FURNITURES
    let nbFurnitures = Math.floor(Math.random() * 4) + 1
    for (var fur = 0; fur < nbFurnitures; fur++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addFurniture(coord[0], coord[1])
    }

    // DECO
    let nbDeco = Math.floor(Math.random() * 6) + 2
    for (var dec = 0; dec < nbDeco; dec++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addDecoCell(coord[0], coord[1])
    }

    // ALLIES
    for (var ally = 0; ally < nbAllies; ally++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addAlly(coord[0], coord[1])
    }

    // BADDIES
    for (var bad = 0; bad < nbBaddies; bad++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addBaddy(coord[0], coord[1])
    }

    if (endWindow) {
      room.addEndWindow(...endWindow)
    }

    return room
  }

  createCorridor() {
    const room = new PrisonCorridor(this.game.getRoomWidthInPx(), this.game.getRoomHeightInPx())

    let allPossibilities = [
      [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
      [3, 1], [3, 2], [3, 3], [3, 4], [3, 5],
      [4, 1], [4, 2], [4, 3], [4, 4], [4, 5],
      [5, 1], [5, 2], [5, 3], [5, 4], [5, 5]
    ]

    let randomPossibilities = shuffle(allPossibilities)
    let index = 0

    // GUARDS
    let nbGuards = Math.floor(Math.random() * 3) + 1 // 1 to 4 guards
    for (var i = 0; i < nbGuards; i++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addGuard(coord[0], coord[1])
    }

    // DECO
    let nbDeco = Math.floor(Math.random() * 6) + 2
    for (var dec = 0; dec < nbDeco; dec++) {
      let coord = randomPossibilities[index]
      index = index + 1
      room.addDecoCorridor(coord[0], coord[1])
    }

    return room
  }
}
