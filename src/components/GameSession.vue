<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import GameField from './GameField.vue'
import VButton from './VButton.vue'
import GameWinnerText from './GameWinnerText.vue'
import GameScore from './GameScore.vue'

const emits = defineEmits<{
  stepBack: []
}>()

const gameFieldRef = useTemplateRef<InstanceType<typeof GameField>>('gameField')
const gameMode = ref<'one' | 'two' | 'online' | null>(null)

onMounted(() => {
  gameMode.value = sessionStorage.getItem('mode') as 'one' | 'two' | 'online'
})
</script>

<template>
  <div>
    <GameWinnerText
      :is-x-win="gameFieldRef?.isXWin"
      :is-o-win="gameFieldRef?.isOWin"
      :is-draw="gameFieldRef?.isDraw"
      :class="$style.winnerText"
    />

    <GameField ref="gameField" :game-mode="gameMode ?? undefined" :class="$style.gameField" />

    <div :class="$style.info">
      <GameScore
        theme="x"
        :is-winner="gameFieldRef?.isXWin"
        :current-player="gameFieldRef?.currentPlayer"
        :disabled="gameMode === 'two'"
        @click="gameFieldRef?.changeFirstPlayer"
      />

      <GameScore
        theme="o"
        :is-winner="gameFieldRef?.isOWin"
        :current-player="gameFieldRef?.currentPlayer"
        :disabled="gameMode === 'two'"
        @click="gameFieldRef?.changeFirstPlayer"
      />
    </div>

    <div :class="$style.control">
      <VButton
        icon="house"
        :icon-class="$style.customIcon"
        :class="$style.resetBtn"
        @click="emits('stepBack')"
      />

      <VButton
        icon="refresh"
        :icon-class="$style.customIcon"
        :class="$style.resetBtn"
        @click="gameFieldRef?.reset"
      />
    </div>
  </div>
</template>

<style module lang="scss">
.winnerText,
.gameField {
  margin-bottom: 25px;
}

.info,
.control {
  display: flex;
  justify-content: center;
  gap: 25px;
}

.info {
  padding: 0 18px;
  margin-bottom: 30px;
}

.resetBtn {
  width: auto;
  text-transform: capitalize;
  padding: 5px 15px;
}

.customIcon {
  fill: #8388a1;
}
</style>
