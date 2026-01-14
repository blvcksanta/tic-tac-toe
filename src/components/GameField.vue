<script setup lang="ts">
import { computed, ref } from 'vue'
import GameFieldCell from './GameFieldCell.vue'

const currentPlayer = defineModel<'x' | 'o'>({
  default: 'x',
})

const playingField = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
])

const isMovePossible = ref(true)

const mainDiagonal = computed(() => playingField.value.map((row, index) => row[index] ?? ''))

const reverseDiagonal = computed(() =>
  playingField.value.map((row, index) => row.at(-(index + 1)) ?? ''),
)

const columns = computed(() => {
  const result: string[][] = []

  for (let i = 0; i < playingField.value.length; i++) {
    result.push(playingField.value.map((row) => row[i] ?? ''))
  }

  return result
})

const isXWin = computed(() => isWinner('x'))
const isOWin = computed(() => isWinner('o'))
const isDraw = computed(() => {
  return (
    !isXWin.value && !isOWin.value && playingField.value.every((row) => row.every((item) => !!item))
  )
})

function setIcon(value: string): 'cross' | 'circle' | '' {
  return value === 'x' ? 'cross' : value === 'o' ? 'circle' : ''
}

async function makeMove(rowIndex: number, itemIndex: number) {
  playingField.value[rowIndex]![itemIndex] = currentPlayer.value
  // currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'

  if (isXWin.value || isOWin.value || isDraw.value) return

  const mainPlayer = currentPlayer.value
  const secondPlayer = mainPlayer === 'x' ? 'o' : 'x'

  const rrr = randomInteger(1, 10)
  const rowO = ytr(playingField.value, secondPlayer)
  const colO = ytr(columns.value, secondPlayer)
  const mdiO = zxc(mainDiagonal.value, secondPlayer)
  const rdiO = zxc(reverseDiagonal.value, secondPlayer)
  const rowX = ytr(playingField.value, mainPlayer)
  const colX = ytr(columns.value, mainPlayer)
  const mdiX = zxc(mainDiagonal.value, mainPlayer)
  const rdiX = zxc(reverseDiagonal.value, mainPlayer)

  isMovePossible.value = false

  await new Promise((resolve) => setTimeout(resolve, 300))

  isMovePossible.value = true

  if (rowO.length) {
    playingField.value[rowO[0]!]![rowO[1]!] = secondPlayer
    return
  }

  if (colO.length) {
    playingField.value[colO[1]!]![colO[0]!] = secondPlayer
    return
  }

  if (mdiO !== null) {
    playingField.value[mdiO]![mdiO] = secondPlayer
    return
  }

  if (rdiO !== null) {
    const asd = reverseDiagonal.value.length - 1 - rdiO

    playingField.value[rdiO]![asd] = secondPlayer
    return
  }

  if (rowX.length) {
    playingField.value[rowX[0]!]![rowX[1]!] = secondPlayer
    return
  }

  if (colX.length) {
    playingField.value[colX[1]!]![colX[0]!] = secondPlayer
    return
  }

  if (mdiX !== null) {
    playingField.value[mdiX]![mdiX] = secondPlayer
    return
  }

  if (rdiX !== null) {
    const asd = reverseDiagonal.value.length - 1 - rdiX

    playingField.value[rdiX]![asd] = secondPlayer
    return
  }

  if (rrr > 5 && !playingField.value[1]![1]) {
    playingField.value[1]![1] = secondPlayer
    return
  }

  const { randomRowIndex, randomItemIndex } = generateRandomIndex()
  playingField.value[randomRowIndex]![randomItemIndex] = secondPlayer
}

function ytr(matrix: string[][], target: 'x' | 'o') {
  return matrix
    .map((row, rowIndex) => {
      const has = row.filter((item) => item === target).length === 2
      const emptyCellIndex = row.findIndex((item) => !item)

      if (emptyCellIndex === -1 || !has) return []

      return [rowIndex, emptyCellIndex]
    })
    .flat()
}

function zxc(array: string[], target: 'x' | 'o') {
  const has = array.filter((item) => item === target).length === 2

  if (!has) return null

  const index = array.findIndex((item) => !item)

  return index === -1 ? null : index
}

function generateRandomIndex() {
  const randomRowIndex = randomInteger(0, 2)
  const randomItemIndex = randomInteger(0, 2)
  const isEmptyCell = !playingField.value[randomRowIndex]![randomItemIndex]

  if (!isEmptyCell) {
    return generateRandomIndex()
  }

  return { randomRowIndex, randomItemIndex }
}

function randomInteger(min: number, max: number) {
  const rand = min + Math.random() * (max + 1 - min)
  return Math.floor(rand)
}

function findMatchesInMatrix(matrix: string[][], target: 'x' | 'o') {
  return matrix.some((row) => row.every((elem) => elem === target))
}

function findMatchesInArray(arr: string[], target: 'x' | 'o') {
  return arr.every((elem) => elem === target)
}

function isWinner(target: 'x' | 'o') {
  return (
    findMatchesInMatrix(playingField.value, target) ||
    findMatchesInMatrix(columns.value, target) ||
    findMatchesInArray(mainDiagonal.value, target) ||
    findMatchesInArray(reverseDiagonal.value, target)
  )
}

function reset() {
  playingField.value = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
}

defineExpose({
  reset,
  isXWin,
  isOWin,
  isDraw,
})
</script>

<template>
  <div :class="$style.gameField">
    <div v-for="(row, rowIndex) in playingField" :key="rowIndex" :class="$style.row">
      <GameFieldCell
        v-for="(item, itemIndex) in row"
        :key="itemIndex"
        :icon="setIcon(item)"
        :disabled="isXWin || isOWin || !isMovePossible"
        :class="$style.cell"
        @click="makeMove(rowIndex, itemIndex)"
      />
    </div>
  </div>
</template>

<style module lang="scss">
$border: 2px solid #dcd7f0;

.gameField {
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0 0 15px 2px rgba(219, 208, 243, 0.5);
  background-color: #fff;
  // outline: 2px solid #dcd7f0;
  // outline-offset: -6px;
}

.row {
  line-height: 0;
  font-size: 0;
}

.row + .row {
  border-top: $border;
}

.cell {
  height: 80px;
  width: 80px;
}

.cell:first-child {
  border-left: 2px solid transparent;
}

.cell + .cell {
  border-left: $border;
}
</style>
