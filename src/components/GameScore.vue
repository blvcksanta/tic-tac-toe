<script setup lang="ts">
import VButton from './VButton.vue'
import CrossIcon from '@/assets/icons/cross-min.svg?component'
import CircleIcon from '@/assets/icons/circle-min.svg?component'
import { ref, watchEffect } from 'vue'

const props = defineProps<{
  theme: 'x' | 'o'
  isWinner?: boolean
  currentPlayer?: 'x' | 'o'
  disabled?: boolean
}>()

const emits = defineEmits<{
  click: [value: 'x' | 'o']
}>()

const icons = {
  x: CrossIcon,
  o: CircleIcon,
}

const winCounter = ref(0)

watchEffect(() => {
  if (props.isWinner) {
    winCounter.value++
  }
})
</script>

<template>
  <VButton
    :disabled="currentPlayer === theme || disabled"
    :class="[$style.gameScore, currentPlayer === theme && $style[`outlineColor-${theme}`]]"
    @click="emits('click', theme)"
  >
    <template #icon>
      <component :is="icons[theme]" />
    </template>

    {{ winCounter }}
  </VButton>
</template>

<style module lang="scss">
.gameScore {
  gap: 10px;
  font-size: 24px;
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition: outline-color 0.2s ease;
  min-width: 90px;
}

.outlineColor-x {
  outline-color: #c1ccf9;
}

.outlineColor-o {
  outline-color: #fbd5c1;
}
</style>
