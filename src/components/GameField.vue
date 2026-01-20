<script setup lang="ts">
import GameFieldCell from './GameFieldCell.vue'
import { useGameSettings } from '@/composables/useGameSettings'
import { useGameSoloMod } from '@/composables/useGameSoloMod'

const { gameMode = 'one' } = defineProps<{
  gameMode?: 'one' | 'two' | 'online'
}>()

const gameSettings = useGameSettings()
const { getComputerMove, isMovePossible } = useGameSoloMod(gameSettings)

const {
  playingField,
  isXWin,
  isOWin,
  isDraw,
  isGameEnd,
  currentPlayer,
  firstPlayer,
  reset,
  changeFirstPlayer,
  changeCurrentPlayer,
} = gameSettings

const mode = {
  one: getComputerMove,
  two: changeCurrentPlayer,
  online: () => {},
}

function setIcon(value: string): 'cross' | 'circle' | '' {
  return value === 'x' ? 'cross' : value === 'o' ? 'circle' : ''
}

function makeMove(rowIndex: number, itemIndex: number) {
  playingField.value[rowIndex]![itemIndex] = currentPlayer.value
  mode[gameMode]()
}

defineExpose({
  reset: () => {
    reset()

    if (gameMode === 'one' && currentPlayer.value === 'o') {
      mode['one']()
    }
  },
  changeFirstPlayer: () => {
    changeFirstPlayer()

    if (firstPlayer.value === 'o') {
      mode['one']()
    }
  },
  isXWin,
  isOWin,
  isDraw,
  currentPlayer,
})
</script>

<template>
  <div :class="$style.gameField">
    <div v-for="(row, rowIndex) in playingField" :key="rowIndex" :class="$style.row">
      <GameFieldCell
        v-for="(item, itemIndex) in row"
        :key="itemIndex"
        :icon="setIcon(item)"
        :disabled="isGameEnd || !isMovePossible"
        :class="$style.cell"
        @click="makeMove(rowIndex, itemIndex)"
      />
    </div>
  </div>
</template>

<style module lang="scss">
$border: 2px solid #dcd7f0;

.gameField {
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 25px;
  box-shadow: 0 0 15px 2px rgba(219, 208, 243, 0.5);
  background-color: #fff;
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
