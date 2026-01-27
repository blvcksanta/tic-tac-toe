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
  disabled = false,
} = defineProps<{
  icon?: Icons
  iconClass?: string | string[]
  size?: 'large' | 'default'
  disabled?: boolean
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
  <button
    :disabled="disabled"
    :class="[$style.button, $style[`size-${size}`]]"
    @click="emits('click')"
  >
    <span v-if="icon || $slots.icon" :class="$style.iconWrap">
      <slot name="icon">
        <component :is="icons[icon]" v-if="icon" :class="iconClass" />
      </slot>
    </span>

    <slot />
  </button>
</template>

<style module lang="scss">
.button {
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  padding: 10px 24px;
  border: none;
  border-radius: 16px;
  font-size: 18px;
  line-height: 1;
  color: #4b5563;
  box-shadow: 0 0 10px 1px rgba(219, 208, 243, 0.5);
  background-color: #fff;

  &:hover {
    box-shadow: 0 0 10px 1px rgb(219, 208, 243);
  }

  &:active {
    box-shadow: inset 0 0 10px 1px rgb(219, 208, 243);
  }

  &:disabled {
    &:hover {
      box-shadow: 0 0 10px 1px rgba(219, 208, 243, 0.5);
    }

    &:active {
      box-shadow: 0 0 10px 1px rgba(219, 208, 243, 0.5);
    }
  }
}

.iconWrap {
  font-size: 0;
  line-height: 0;
}

.size-large {
  min-height: 65px;

  .iconWrap {
    width: 45px;
  }
}

.size-default {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 16px;

  .iconWrap {
    width: 25px;
  }
}
</style>
