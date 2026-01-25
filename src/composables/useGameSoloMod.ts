import { computed, ref } from 'vue'
import { getRandomInteger } from '@/lib/utils'
import type { useGameSettings } from './useGameSettings'
import type { Line, Player, Coord } from '@/types/game.type'

export function useGameSoloMod(gameSettings: ReturnType<typeof useGameSettings>) {
  const { board, isGameEnd, firstPlayer, lines } = gameSettings

  const isMovePossible = ref(true)

  const secondPlayer = computed(() => (firstPlayer.value === 'x' ? 'o' : 'x'))

  function getRandomEmptyCell() {
    const emptyCells: Array<Coord> = []

    board.value.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === '') {
          emptyCells.push({ row: rowIndex, col: cellIndex })
        }
      })
    })

    if (emptyCells.length === 0) {
      return
    }

    const randomIndex = getRandomInteger(0, emptyCells.length - 1)
    return emptyCells[randomIndex]
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
    await new Promise((resolve) => setTimeout(resolve, 300))
    isMovePossible.value = true
  }

  async function getComputerMove() {
    if (isGameEnd.value) return

    await waitingAnimation()

    // Выиграть или перекрыть

    const move =
      findMoveInLines(lines.value, secondPlayer.value) ||
      findMoveInLines(lines.value, firstPlayer.value)

    if (move) {
      board.value[move.row]![move.col] = secondPlayer.value
      return
    }

    // Забрать центр с вероятностью 50%

    const randomInteger = getRandomInteger(1, 10)
    const centerIndex = Math.floor(board.value.length / 2)

    if (randomInteger > 5 && !board.value[centerIndex]![centerIndex]) {
      board.value[centerIndex]![centerIndex] = secondPlayer.value
      return
    }

    // Забрать случайную свободную ячейку

    const randomEmptyCell = getRandomEmptyCell()

    if (randomEmptyCell) {
      board.value[randomEmptyCell.row]![randomEmptyCell.col] = secondPlayer.value
    }
  }

  return {
    isMovePossible,
    getComputerMove,
  }
}
