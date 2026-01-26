import { computed, ref } from 'vue'
import type { Cell, Line, Player } from '@/types/game.type'

export function useGameSettings() {
  const firstPlayer = ref<Player>('x')
  const currentPlayer = ref<Player>(firstPlayer.value)

  const board = ref<Cell[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])

  const rowLines = computed((): Line[] =>
    board.value.map((row, rowIndex) => ({
      cells: row,
      coords: row.map((_, col) => ({ row: rowIndex, col })),
    })),
  )

  const columnLines = computed((): Line[] => {
    return Array.from({ length: board.value.length }, (_, col) => ({
      cells: board.value.map((row) => row[col]!),
      coords: board.value.map((_, row) => ({ row, col })),
    }))
  })

  const diagonalLines = computed((): Line[] => [
    {
      cells: board.value.map((row, rowIndex) => row[rowIndex]!),
      coords: board.value.map((_, index) => ({ row: index, col: index })),
    },
    {
      cells: board.value.map((row, rowIndex) => row[board.value.length - 1 - rowIndex]!),
      coords: board.value.map((_, index) => ({ row: index, col: board.value.length - 1 - index })),
    },
  ])

  const lines = computed(() => [...rowLines.value, ...columnLines.value, ...diagonalLines.value])

  const isXWin = computed(() => findMatchesInLine('x'))
  const isOWin = computed(() => findMatchesInLine('o'))
  const isDraw = computed(() => board.value.every((row) => row.every((item) => !!item)))
  const isGameEnd = computed(() => isXWin.value || isOWin.value || isDraw.value)

  const winningCoords = computed(() => {
    return lines.value.find(
      (line) =>
        line.cells.every((item) => item === 'x') || line.cells.every((item) => item === 'o'),
    )?.coords
  })

  function findMatchesInLine(target: Player) {
    return lines.value.some((line) => line.cells.every((item) => item === target))
  }

  function reset() {
    currentPlayer.value = firstPlayer.value
    board.value = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]
  }

  function changeFirstPlayer() {
    firstPlayer.value = firstPlayer.value === 'x' ? 'o' : 'x'
    reset()
  }

  function changeCurrentPlayer() {
    currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
  }

  return {
    currentPlayer,
    firstPlayer,
    board,
    isXWin,
    isOWin,
    isDraw,
    isGameEnd,
    lines,
    winningCoords,
    reset,
    changeFirstPlayer,
    changeCurrentPlayer,
  }
}
