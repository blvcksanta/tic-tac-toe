<script setup lang="ts">
import OnePlayerIcon from '@/assets/icons/OnePlayer.svg?component'
import TwoPlayerIcon from '@/assets/icons/TwoPlayer.svg?component'
import GlobalIcon from '@/assets/icons/Global.svg?component'
import HouseIcon from '@/assets/icons/House.svg?component'
import RefreshIcon from '@/assets/icons/Refresh.svg?component'
import type { FunctionalComponent } from 'vue'

type Icons = 'one-player' | 'two-player' | 'global' | 'house' | 'refresh'

const {
  icon,
  size = 'default',
  iconClass,
} = defineProps<{
  icon?: Icons
  iconClass?: string | string[]
  size?: 'large' | 'default'
}>()

const emits = defineEmits<{
  click: []
}>()

const icons: Record<Icons, FunctionalComponent> = {
  'one-player': OnePlayerIcon,
  'two-player': TwoPlayerIcon,
  global: GlobalIcon,
  house: HouseIcon,
  refresh: RefreshIcon,
}
</script>

<template>
  <button :class="[$style.button, $style[`size-${size}`]]" @click="emits('click')">
    <component :is="icons[icon]" v-if="icon" :class="[$style.icon, iconClass]" />
    <slot />
  </button>
</template>

<style module lang="scss">
.button {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 100%;
  cursor: pointer;
  text-align: start;
  padding: 10px 24px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  line-height: 1;
  color: #4b5563;
  box-shadow: 0 0 15px 2px rgba(219, 208, 243, 0.5);
  background-color: #fff;
}

.size-large {
  min-height: 65px;

  .icon {
    width: 45px;
  }
}

.size-default {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 16px;

  .icon {
    width: 25px;
  }
}
</style>
