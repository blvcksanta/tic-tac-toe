<script setup lang="ts">
import { provide, ref } from 'vue'
import GameMenu from '@/components/GameMenu.vue'
import GameSession from '@/components/GameSession.vue'
import type { GameMode } from '@/types/game.type'

const components = {
  menu: GameMenu,
  session: GameSession,
}

const currentComponent = ref<keyof typeof components>('menu')
const gameMode = ref<GameMode>('one')

function onSelectMode(mode: GameMode) {
  gameMode.value = mode
  currentComponent.value = 'session'
}

function onStepBack() {
  currentComponent.value = 'menu'
}

provide('mode', gameMode)
</script>

<template>
  <div :class="$style.app">
    <Transition
      mode="out-in"
      :enter-active-class="$style.fadeEnterActive"
      :leave-active-class="$style.fadeLeaveActive"
      :enter-from-class="currentComponent === 'menu' ? $style.fadeLeaveTo : $style.fadeEnterFrom"
      :leave-to-class="currentComponent === 'menu' ? $style.fadeEnterFrom : $style.fadeLeaveTo"
    >
      <component
        :is="components[currentComponent]"
        @select-mode="onSelectMode"
        @step-back="onStepBack"
      />
    </Transition>
  </div>
</template>

<style module lang="scss">
.app {
  padding: 0 35px;
  max-width: 375px;
  margin: 0 auto;
}

.fadeEnterActive,
.fadeLeaveActive {
  transition: all 0.4s ease;
}

.fadeEnterFrom {
  transform: translateX(50px);
  opacity: 0;
}

.fadeLeaveTo {
  transform: translateX(-50px);
  opacity: 0;
}
</style>
