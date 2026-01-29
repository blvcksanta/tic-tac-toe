<script setup lang="ts">
import { computed, ref } from 'vue'
import VButton from './VButton.vue'
import VModal from './VModal.vue'
import VRadio from './VRadio.vue'
import { useI18n } from 'vue-i18n'
import { LANGUAGES } from '@/assets/i18n'
import type { Language } from '@/assets/i18n/i18n.type'
import type { LanguageTemplate } from '@/assets/i18n/i18n.type'
import type { GameMode } from '@/types/game.type'

const emits = defineEmits<{
  selectMode: [mode: GameMode]
}>()

const { t, locale } = useI18n<[LanguageTemplate], Language>({ useScope: 'global' })

const isShowModal = ref(false)

const title = computed(() => {
  const title = t('title').split(' ')

  return {
    firstPart: title.slice(0, title.length - 1).join(' '),
    lastPart: title.at(-1),
  }
})

function openModal() {
  isShowModal.value = true
}

function closeModal() {
  isShowModal.value = false
}

function changeLanguage(lang: Language) {
  closeModal()
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <div>
    <h1 :class="$style.title">
      {{ title.firstPart }}
      <span>{{ title.lastPart }}</span>
    </h1>
    <VButton
      icon="one-player"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'one')"
    >
      {{ t('gameModes.one') }}
    </VButton>
    <VButton
      icon="two-player"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'two')"
    >
      {{ t('gameModes.two') }}
    </VButton>
    <VButton
      icon="global"
      size="large"
      :class="$style.menuButton"
      @click="emits('selectMode', 'online')"
    >
      {{ t('gameModes.online') }}
    </VButton>

    <VButton :class="$style.languageBtn" @click="openModal"> {{ t('localeButton') }} </VButton>

    <VModal v-model="isShowModal">
      <div :class="$style.radioWrap">
        <VRadio
          v-for="(label, value) in LANGUAGES"
          :value="value"
          :key="value"
          :checked="value === locale"
          :class="$style.radio"
          @click="changeLanguage"
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
