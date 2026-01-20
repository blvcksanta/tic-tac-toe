<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isXWin?: boolean
  isOWin?: boolean
  isDraw?: boolean
}>()

const winnerText = computed(() => {
  if (props.isXWin) {
    return 'X won'
  }

  if (props.isOWin) {
    return 'O won'
  }

  if (props.isDraw) {
    return 'Draw'
  }

  return ''
})
</script>

<template>
  <p :class="$style.winnerText">{{ winnerText }}</p>
</template>

<style module lang="scss">
.winnerText {
  margin: 0;
  color: #2b2436;
  text-align: center;
  font-size: 26px;
  font-family: sans-serif;
  min-height: 31px;
}
</style>
