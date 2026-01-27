import { computed, ref } from 'vue'
import { promiseTimeout } from '@vueuse/core'
import { getRandomInteger } from '@/lib/utils'
import { SPAWN_ANIMATION_DURATION } from '@/config/constants'
import type { useGameSettings } from './useGameSettings'
import type { Line, Player, Coord } from '@/types/game.type'

export function useGameSoloMod(gameSettings: ReturnType<typeof useGameSettings>) {
  const { board, isGameEnd, firstPlayer, lines } = gameSettings

  const isMovePossible = ref(true)

  const secondPlayer = computed(() => (firstPlayer.value === 'x' ? 'o' : 'x'))

  function getRandomEmptyCell() {
    const emptyCells: Array<Coord> = []

    lines.value.forEach((line) => {
      const emptyCellIndex = line.cells.findIndex((item) => item === '')

      if (emptyCellIndex !== -1) emptyCells.push(line.coords[emptyCellIndex]!)
    })

    if (emptyCells.length === 0) {
      return
    }

    const randomIndex = getRandomInteger(0, emptyCells.length - 1)
    return emptyCells[randomIndex]
  }

  function takeCenter(): Coord | undefined {
    const randomInteger = getRandomInteger(1, 10)
    const centerIndex = Math.floor(board.value.length / 2)
    const hasValueInCenter = !!board.value[centerIndex]![centerIndex]

    if (randomInteger < 5 || hasValueInCenter) return

    return { row: centerIndex, col: centerIndex }
  }

  function findEmptyCellInAlmostFilledLine(line: Line, target: Player) {
    const hasMatches = line.cells.filter((item) => item === target).length === 2
    const emptyCellIndex = line.cells.findIndex((item) => !item)

    if (!hasMatches || emptyCellIndex === -1) return

    return line.coords[emptyCellIndex]
  }

  function findMoveInLines(lines: Line[], target: Player) {
    for (const line of lines) {
      const move = findEmptyCellInAlmostFilledLine(line, target)
      if (move) return move
    }
  }

  async function waitingAnimation() {
    isMovePossible.value = false
    await promiseTimeout(SPAWN_ANIMATION_DURATION)
    isMovePossible.value = true
  }

  async function getComputerMove() {
    if (isGameEnd.value) return

    await waitingAnimation()

    const move =
      findMoveInLines(lines.value, secondPlayer.value) ||
      findMoveInLines(lines.value, firstPlayer.value) ||
      takeCenter() ||
      getRandomEmptyCell()

    if (!move) return

    board.value[move.row]![move.col] = secondPlayer.value
  }

  return {
    isMovePossible,
    getComputerMove,
  }
}
