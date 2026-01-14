<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import GameAsd from '@/components/GameAsd.vue'
import { ref } from 'vue'

const currentComponent = ref<'menu' | 'asd'>('menu')

const components = {
  menu: GameMenu,
  asd: GameAsd,
}

function onSelectMode() {
  currentComponent.value = 'asd'
}

function onStepBack() {
  currentComponent.value = 'menu'
}
</script>

<template>
  <div :class="$style.app">
    <component
      :is="components[currentComponent]"
      @select-mode="onSelectMode"
      @step-back="onStepBack"
    />
  </div>
</template>

<style module lang="scss">
.app {
  padding: 0 35px;
}
</style>
