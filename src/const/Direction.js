export const DIRECTION = {
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left'
}

export const oppositeDir = (dir) => {
  switch (dir) {
    case DIRECTION.RIGHT:
      return DIRECTION.LEFT
    case DIRECTION.LEFT:
      return DIRECTION.RIGHT
    case DIRECTION.UP:
      return DIRECTION.DOWN
    case DIRECTION.DOWN:
      return DIRECTION.UP
    default:
      console.error('Invalid direction:', dir)
      throw new Error('Invalid direction')
  }
}

export default DIRECTION
