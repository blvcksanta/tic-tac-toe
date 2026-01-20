import { computed, ref } from 'vue'
import type { useGameSettings } from './useGameSettings'

export function useGameSoloMod(gameSettings: ReturnType<typeof useGameSettings>) {
  const { playingField, isGameEnd, firstPlayer, columns, mainDiagonal, reverseDiagonal } =
    gameSettings

  const isMovePossible = ref(true)

  const secondPlayer = computed(() => (firstPlayer.value === 'x' ? 'o' : 'x'))

  function getRandomInteger(min: number, max: number) {
    const rand = min + Math.random() * (max + 1 - min)
    return Math.floor(rand)
  }

  function getEmptyCellIndex() {
    const emptyCells: Array<{ rowIndex: number; cellIndex: number }> = []

    playingField.value.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell === '') {
          emptyCells.push({ rowIndex, cellIndex })
        }
      })
    })

    if (emptyCells.length === 0) {
      return
    }

    const randomIndex = getRandomInteger(0, emptyCells.length - 1)
    return emptyCells[randomIndex]
  }

  function findEmptyCellInAlmostFilledLine(matrix: string[][], target: 'x' | 'o') {
    return matrix
      .map((row, rowIndex) => {
        const has = row.filter((item) => item === target).length === 2
        const emptyCellIndex = row.findIndex((item) => !item)

        if (emptyCellIndex === -1 || !has) return []

        return [rowIndex, emptyCellIndex]
      })
      .flat()
  }

  function findEmptyIndexInAlmostFilledDiagonal(array: string[], target: 'x' | 'o') {
    const has = array.filter((item) => item === target).length === 2

    if (!has) return null

    const index = array.findIndex((item) => !item)

    return index === -1 ? null : index
  }

  async function getComputerMove() {
    if (isGameEnd.value) return

    const randomInteger = getRandomInteger(1, 10)

    const rowO = findEmptyCellInAlmostFilledLine(playingField.value, secondPlayer.value)
    const colO = findEmptyCellInAlmostFilledLine(columns.value, secondPlayer.value)
    const mdiO = findEmptyIndexInAlmostFilledDiagonal(mainDiagonal.value, secondPlayer.value)
    const rdiO = findEmptyIndexInAlmostFilledDiagonal(reverseDiagonal.value, secondPlayer.value)

    const rowX = findEmptyCellInAlmostFilledLine(playingField.value, firstPlayer.value)
    const colX = findEmptyCellInAlmostFilledLine(columns.value, firstPlayer.value)
    const mdiX = findEmptyIndexInAlmostFilledDiagonal(mainDiagonal.value, firstPlayer.value)
    const rdiX = findEmptyIndexInAlmostFilledDiagonal(reverseDiagonal.value, firstPlayer.value)

    isMovePossible.value = false

    await new Promise((resolve) => setTimeout(resolve, 300))

    isMovePossible.value = true

    if (rowO.length) {
      playingField.value[rowO[0]!]![rowO[1]!] = secondPlayer.value
      return
    }

    if (colO.length) {
      playingField.value[colO[1]!]![colO[0]!] = secondPlayer.value
      return
    }

    if (mdiO !== null) {
      playingField.value[mdiO]![mdiO] = secondPlayer.value
      return
    }

    if (rdiO !== null) {
      const asd = reverseDiagonal.value.length - 1 - rdiO

      playingField.value[rdiO]![asd] = secondPlayer.value
      return
    }

    if (rowX.length) {
      playingField.value[rowX[0]!]![rowX[1]!] = secondPlayer.value
      return
    }

    if (colX.length) {
      playingField.value[colX[1]!]![colX[0]!] = secondPlayer.value
      return
    }

    if (mdiX !== null) {
      playingField.value[mdiX]![mdiX] = secondPlayer.value
      return
    }

    if (rdiX !== null) {
      const asd = reverseDiagonal.value.length - 1 - rdiX

      playingField.value[rdiX]![asd] = secondPlayer.value
      return
    }

    if (randomInteger > 5 && !playingField.value[1]![1]) {
      playingField.value[1]![1] = secondPlayer.value
      return
    }

    const qq = getEmptyCellIndex()

    if (qq) {
      playingField.value[qq.rowIndex]![qq.cellIndex] = secondPlayer.value
    }
  }

  return {
    isMovePossible,
    getComputerMove,
  }
}
