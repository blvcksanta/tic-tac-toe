<script setup lang="ts">
import { computed } from 'vue'

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
    :class="[$style.cell, icon && $style[icon]]"
    @click="emits('click')"
  />
</template>

<style module lang="scss">
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
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../assets/icons/cross-min.svg) no-repeat center / 80%;
    animation: fadeIn 0.25s ease-in-out forwards;
  }
}

.circle {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(../assets/icons/circle-min.svg) no-repeat center / 80%;
    animation: fadeIn 0.3s ease-in-out forwards;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
