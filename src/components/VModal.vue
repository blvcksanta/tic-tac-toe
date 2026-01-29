<script setup lang="ts">
// import CloseIcon from '@/assets/icons/close.svg?component'

const isShow = defineModel<boolean>({
  required: true,
})

function closeModal() {
  isShow.value = false
}
</script>

<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="$style.enterActive"
      :leave-active-class="$style.leaveActive"
      :enter-from-class="$style.enterFrom"
      :leave-to-class="$style.leaveTo"
    >
      <div v-if="isShow" :class="$style.modal" @click.self="closeModal">
        <div :class="$style.container">
          <!-- <button :class="$style.closeBtn" @click="closeModal">
            <CloseIcon :class="$style.closeIcon" />
          </button> -->

          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style module lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
}

.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
}

// .closeBtn {
//   position: absolute;
//   top: 5px;
//   right: 5px;
//   border: none;
//   padding: 0;
//   background-color: transparent;
//   cursor: pointer;
//   width: 20px;
//   font-size: 0;
//   line-height: 0;
// }

// .closeIcon {
//   width: 100%;
// }

.enterActive,
.leaveActive {
  transition: all 0.5s ease-in-out;

  .container {
    transition: all 0.5s ease-in-out;
  }
}

.leaveTo {
  opacity: 0;

  .container {
    transform: translate(-50%, -30%);
  }
}

.enterFrom {
  opacity: 0;

  .container {
    transform: translate(-50%, -30%);
  }
}
</style>
