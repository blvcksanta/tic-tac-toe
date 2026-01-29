<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { LanguageTemplate } from '@/assets/i18n/i18n.type'

const props = defineProps<{
  isXWin?: boolean
  isOWin?: boolean
  isDraw?: boolean
}>()

const { t } = useI18n<[LanguageTemplate]>({ useScope: 'global' })

const winnerText = computed(() => {
  if (props.isXWin) {
    return t('winnerText.x')
  }

  if (props.isOWin) {
    return t('winnerText.o')
  }

  if (props.isDraw) {
    return t('winnerText.draw')
  }

  return ''
})
</script>

<template>
  <p :class="[$style.winnerText, winnerText && $style.showAnimation]">{{ winnerText }}</p>
</template>

<style module lang="scss">
.winnerText {
  margin: 0;
  color: #2b2436;
  text-align: center;
  font-size: 26px;
  min-height: 35px;
  font-weight: 600;
}

.showAnimation {
  animation: show 0.3s ease-out;
}

@keyframes show {
  0% {
    transform: translateY(-15px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
