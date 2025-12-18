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
    :class="[$style.btn, icon && $style[icon]]"
    @click="emits('click')"
  />
</template>

<style module lang="scss">
$line-with: 10px;

%asd {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: $line-with;
  height: 100%;

  border-radius: calc($line-with / 2);
}

.btn {
  cursor: pointer;
  padding: 0;
  border: none;
  width: 100px;
  height: 100px;
  box-sizing: content-box;
  background-color: transparent;

  &:disabled {
    cursor: default;
    background-color: transparent;
  }
}

.cross {
  position: relative;

  &::after {
    @extend %asd;
    transform: translateX(-50%) rotate(45deg);
    background: #7d71a3;
  }

  &::before {
    @extend %asd;
    transform: translateX(-50%) rotate(-45deg);
    background: #7d71a3;
  }
}

.circle {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;
    border: $line-with solid #f3746d;
  }
}
</style>
