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
  currentPlayer.value = currentPlayer.value === 'x' ? 'o' : 'x'
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
