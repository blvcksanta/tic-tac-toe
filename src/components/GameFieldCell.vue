<script setup lang="ts">
import { computed } from 'vue'
import { SPAWN_ANIMATION_DURATION } from '@/config/constants'

const props = defineProps<{
  icon?: 'cross' | 'circle' | '' | null
  disabled?: boolean
}>()

const emits = defineEmits<{
  click: []
}>()

const isDisabled = computed(() => props.disabled || !!props.icon)
</script>

<template>
  <button
    :disabled="isDisabled"
    :style="{
      '--spawn-animation-duration': `${SPAWN_ANIMATION_DURATION / 1000}s`,
    }"
    :class="[$style.cell, icon && $style[icon]]"
    @click="emits('click')"
  />
</template>

<style module lang="scss">
%icon {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 80%;
  animation: spawn var(--spawn-animation-duration) ease-in-out forwards;
}

.cell {
  cursor: pointer;
  padding: 0;
  border: none;
  box-sizing: content-box;
  background-color: transparent;

  &:disabled {
    cursor: default;
    background-color: transparent;
  }
}

.cross {
  position: relative;

  &::before {
    @extend %icon;

    background-image: url(../assets/icons/cross-min.svg);
  }
}

.circle {
  position: relative;

  &::before {
    @extend %icon;

    background-image: url(../assets/icons/circle-min.svg);
  }
}

@keyframes spawn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
