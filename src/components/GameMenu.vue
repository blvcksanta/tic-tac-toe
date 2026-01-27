<script setup lang="ts">
import { computed, ref } from 'vue'
import VButton from './VButton.vue'
import VModal from './VModal.vue'
import VRadio from './VRadio.vue'
import type { GameMode } from '@/types/game.type'

const emits = defineEmits<{
  selectMode: [mode: GameMode]
}>()

const LANGUAGES = {
  en: 'English',
  ru: 'Русский',
}

const currentLanguage = ref<'en' | 'ru'>('en')

const isShowModal = ref(false)

const languageButtonText = computed(() => LANGUAGES[currentLanguage.value])

function openModal() {
  isShowModal.value = true
}
</script>

<template>
  <div>
    <h1 :class="$style.title">Tic Tac <span>Toe</span></h1>
    <VButton
      icon="one-player"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'one')"
    >
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

    <VButton :class="$style.languageBtn" @click="openModal"> {{ languageButtonText }} </VButton>

    <VModal v-model="isShowModal">
      <div :class="$style.radioWrap">
        <VRadio
          v-model="currentLanguage"
          v-for="(label, value) in LANGUAGES"
          :value="value"
          :key="value"
          :checked="currentLanguage === value"
          :class="$style.radio"
        >
          {{ label }}
        </VRadio>
      </div>
    </VModal>
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

.radioWrap {
  min-width: 150px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.radio {
  text-align: center;
}
</style>
