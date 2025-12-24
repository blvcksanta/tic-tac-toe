<script setup lang="ts">
import { computed, ref } from 'vue'
import GameFieldCell from '@/components/GameFieldCell.vue'

const currentPlayer = defineModel<'x' | 'o'>({
  default: 'x',
})

const playingField = ref([
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
])

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

function makeMove(rowIndex: number, itemIndex: number) {
  playingField.value[rowIndex]![itemIndex] = currentPlayer.value
  // currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'

  if (isXWin.value || isOWin.value || isDraw.value) return

  const rrr = randomInteger(1, 10)
  const rowO = ytr(playingField.value, 'o')
  const colO = ytr(columns.value, 'o')
  const mdiO = zxc(mainDiagonal.value, 'o')
  const rdiO = zxc(reverseDiagonal.value, 'o')
  const rowX = ytr(playingField.value, 'x')
  const colX = ytr(columns.value, 'x')
  const mdiX = zxc(mainDiagonal.value, 'x')
  const rdiX = zxc(reverseDiagonal.value, 'x')

  if (rowO.length) {
    playingField.value[rowO[0]!]![rowO[1]!] = 'o'
    return
  }

  if (colO.length) {
    playingField.value[colO[1]!]![colO[0]!] = 'o'
    return
  }

  if (mdiO !== null) {
    playingField.value[mdiO]![mdiO] = 'o'
    return
  }

  if (rdiO !== null) {
    const asd = reverseDiagonal.value.length - 1 - rdiO

    playingField.value[rdiO]![asd] = 'o'
    return
  }

  if (rowX.length) {
    playingField.value[rowX[0]!]![rowX[1]!] = 'o'
    return
  }

  if (colX.length) {
    playingField.value[colX[1]!]![colX[0]!] = 'o'
    return
  }

  if (mdiX !== null) {
    playingField.value[mdiX]![mdiX] = 'o'
    return
  }

  if (rdiX !== null) {
    const asd = reverseDiagonal.value.length - 1 - rdiX

    playingField.value[rdiX]![asd] = 'o'
    return
  }

  if (rrr > 5 && !playingField.value[1]![1]) {
    playingField.value[1]![1] = 'o'
    return
  }

  const { randomRowIndex, randomItemIndex } = generateRandomIndex()
  playingField.value[randomRowIndex]![randomItemIndex] = 'o'
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
  <div>
    <div v-for="(row, rowIndex) in playingField" :key="rowIndex" :class="$style.row">
      <GameFieldCell
        v-for="(item, itemIndex) in row"
        :key="itemIndex"
        :icon="setIcon(item)"
        :disabled="isXWin || isOWin"
        :class="$style.cell"
        @click="makeMove(rowIndex, itemIndex)"
      />
    </div>
  </div>
</template>

<style module lang="scss">
$border: 6px solid rgba(255, 255, 255, 0.5);

.row {
  line-height: 0;
}

.cell + .cell {
  border-left: $border;
}

.row + .row {
  border-top: $border;
}
</style>
