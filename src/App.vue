<script setup lang="ts">
import { computed, ref, useTemplateRef } from 'vue'
import GameField from './components/GameField.vue'

const currentPlayer = ref<'x' | 'o'>('x')
const gameField = useTemplateRef<InstanceType<typeof GameField>>('gameField')

const resultText = computed(() => {
  if (gameField?.value?.isXWin) {
    return 'X won'
  } else if (gameField.value?.isOWin) {
    return 'O won'
  } else if (gameField.value?.isDraw) {
    return 'Draw'
  }

  return ''
})
</script>

<template>
  <div>
    <p :class="$style.result">{{ resultText }}</p>

    <GameField ref="gameField" v-model="currentPlayer" :class="$style.gameField" />

    <button :class="$style.resetBtn" @click="gameField?.reset">reset</button>
  </div>
</template>

<style module lang="scss">
.result {
  margin: 0;
  color: #2b2436;
  text-align: center;
  font-size: 26px;
  font-family: sans-serif;
  min-height: 31px;
}

.result,
.gameField {
  margin-bottom: 50px;
}

.resetBtn {
  margin-left: auto;
  margin-right: auto;
  display: block;
  padding: 6px 12px;
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  background: transparent;
  font-size: 26px;
  text-transform: capitalize;
  color: #2b2436;
  cursor: pointer;
}
</style>
