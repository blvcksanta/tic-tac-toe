<script setup lang="ts" generic="T extends string">
import { computed, ref } from 'vue'

const { checked = false, value } = defineProps<{
  value: T
  checked?: boolean
}>()

const emits = defineEmits<{
  click: [value: T]
}>()

const model = defineModel<T>({
  required: true,
})

const isFocused = ref(false)

const isChecked = computed(() => checked || value === model.value)

function onClick() {
  model.value = value
  emits('click', value)
}
</script>

<template>
  <label
    :class="[
      $style.radio,
      {
        [`${$style.focused}`]: isFocused,
        [`${$style.checked}`]: isChecked,
      },
    ]"
    @click="onClick"
  >
    <input
      type="radio"
      name="language"
      :value="value"
      :checked="isChecked"
      :class="$style.visibilityHidden"
      @focusin="isFocused = true"
      @focusout="isFocused = false"
    />

    <slot />
  </label>
</template>

<style module lang="scss">
.radio {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: 1px solid transparent;
}

.checked {
  outline-color: rgb(219, 208, 243);
  background-color: rgba(219, 208, 243, 0.2);
}

.focused {
  outline-color: #000;
}

.visibilityHidden {
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
