import Character from './Character'

export default class extends Character {
  constructor({ x, y, frames, room }) {
    super({x, y, spriteSheet:'roguelikeChar', frames, room, isAlly: false, name: 'Guard'})
  }
}
