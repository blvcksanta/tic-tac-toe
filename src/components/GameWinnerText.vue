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
  <p :class="[$style.winnerText, winnerText && $style.showAnimation]">{{ winnerText }}</p>
</template>

<style module lang="scss">
.winnerText {
  margin: 0;
  color: #2b2436;
  text-align: center;
  font-size: 26px;
  min-height: 35px;
  font-weight: 600;
}

.showAnimation {
  animation: show 0.3s ease-out;
}

@keyframes show {
  0% {
    transform: translateY(-15px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
