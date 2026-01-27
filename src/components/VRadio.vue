<script setup lang="ts" generic="T extends string">
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

function onClick() {
  model.value = value
  emits('click', value)
}
</script>

<template>
  <label :class="[$style.radio, checked && $style.checked]" @click="onClick">
    <input type="radio" name="language" :value="value" :class="$style.visibilityHidden" />

    <span>
      <slot />
    </span>
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
