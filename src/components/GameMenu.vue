<script setup lang="ts">
import VButton from './VButton.vue'
import type { GameMode } from '@/types/game.type'

const emits = defineEmits<{
  selectMode: [mode: GameMode]
}>()

function asd() {
  emits('selectMode', 'one')
}
</script>

<template>
  <div>
    <h1 :class="$style.title">Tic Tac <span>Toe</span></h1>
    <VButton icon="one-player" size="large" :class="$style.menuButton" @click="asd">
      One player
    </VButton>
    <VButton
      icon="two-player"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'two')"
    >
      Two player
    </VButton>
    <VButton
      icon="global"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'online')"
    >
      Online
    </VButton>

    <VButton :class="$style.languageBtn"> English </VButton>
  </div>
</template>

<style module lang="scss">
.title {
  text-align: center;
  font-size: 36px;
  font-weight: 600;
  line-height: 1;
  margin: 0;
  color: #60a5fa;
  margin-bottom: 40px;

  span {
    color: #fca5a5;
  }
}

.menuButton {
  width: 100%;
}

.menuButton + .menuButton {
  margin-top: 20px;
}

.languageBtn {
  margin: 0 auto;
  margin-top: 50px;
}
</style>
