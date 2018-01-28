import Character from './Character'

export default class extends Character {
  constructor({ x, y, frames, room, isAlly }) {
    super({x, y, spriteSheet:'roguelikeChar', frames, room, isAlly, name: 'Inmate'})
  }
}
