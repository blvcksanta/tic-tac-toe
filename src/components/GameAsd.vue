<script setup lang="ts">
import { computed, ref, useTemplateRef, watchEffect } from 'vue'
import GameField from './GameField.vue'
import VButton from './VButton.vue'

const emits = defineEmits<{
  stepBack: []
}>()

const gameField = useTemplateRef<InstanceType<typeof GameField>>('gameField')
const currentPlayer = ref<'x' | 'o'>('x')
const xWinCount = ref(0)
const oWinCount = ref(0)

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

watchEffect(() => {
  if (gameField.value?.isXWin) {
    xWinCount.value++
  } else if (gameField.value?.isOWin) {
    oWinCount.value++
  }
})
</script>

<template>
  <div :class="$style.asd">
    <p :class="$style.result">{{ resultText }}</p>

    <GameField ref="gameField" v-model="currentPlayer" :class="$style.gameField" />

    <p>X wins: {{ xWinCount }}</p>
    <p>O wins: {{ oWinCount }}</p>

    <div :class="$style.qwe">
      <VButton
        icon="house"
        :icon-class="$style.customIcon"
        :class="$style.resetBtn"
        @click="emits('stepBack')"
      />
      <VButton
        icon="refresh"
        :icon-class="$style.customIcon"
        :class="$style.resetBtn"
        @click="gameField?.reset"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.asd {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.qwe {
  display: flex;
  gap: 25px;
}

.resetBtn {
  width: auto;
  text-transform: capitalize;
  padding: 5px 15px;
}

.customIcon {
  fill: #8388a1;
}
</style>
