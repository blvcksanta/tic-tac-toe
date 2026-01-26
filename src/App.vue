<script setup lang="ts">
import GameMenu from '@/components/GameMenu.vue'
import GameSession from '@/components/GameSession.vue'
import { ref } from 'vue'

const currentComponent = ref<keyof typeof components>('menu')

const components = {
  menu: GameMenu,
  session: GameSession,
}

function onSelectMode(mode: 'one' | 'two' | 'online') {
  sessionStorage.setItem('mode', mode)
  currentComponent.value = 'session'
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
  max-width: 375px;
  margin: 0 auto;
}
</style>
