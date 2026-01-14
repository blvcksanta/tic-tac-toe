<script setup lang="ts">
import VButton from './VButton.vue'

const emits = defineEmits<{
  selectMode: [mode: 'one' | 'two' | 'online']
}>()

function asd() {
  emits('selectMode', 'one')
}
</script>

<template>
  <div :class="$style.gameMenu">
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
  </div>
</template>

<style module lang="scss">
.gameMenu {
  transform: translateY(-40px);
}

.title {
  text-align: center;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 200;
  line-height: 1;
  margin: 0;
  color: #60a5fa;
  margin-bottom: 40px;

  span {
    color: #fca5a5;
  }
}

.menuButton + .menuButton {
  margin-top: 20px;
}
</style>
