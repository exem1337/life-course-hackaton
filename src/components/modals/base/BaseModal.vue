<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

withDefaults(
  defineProps<{
    title?: string;
    closeText?: string;
    okButtonText?: string;
    hideFooter?: boolean;
  }>(),
  {
    okButtonText: 'Подтвердить',
  },
);

const emit = defineEmits<{(e: 'cancel'): void; }>();
</script>

<template>
  <VueFinalModal
    class="vue-final-modal"
    overlay-transition="vfm-fade"
    content-transition="vfm-fade"
  >
    <div class="vue-final-modal--wrapper">
      <div class="vue-final-modal--wrapper__header">
        <h3 class="mm-headline-3 mb0 base-modal-title">{{ title }}</h3>
      </div>
      <slot />
      <q-btn
        v-if="!hideFooter"
        class="bg-primary text-white btn btn-secondary pt8 pr8 pb8 pl16"
        @click="emit('cancel')"
      >
        {{ okButtonText }}
      </q-btn>
    </div>
  </VueFinalModal>
</template>

<style lang="scss">
.vue-final-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  &--wrapper {
    display: flex;
    padding: 32px;
    flex-direction: column;
    min-width: 500px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;

      h3 {
        font-size: 32px;
        line-height: 36px;
        margin: 0;
        font-weight: 500;
      }
    }
  }
}

.vue-final-modal
.d-flex.flex-column
.d-flex.justify-content-between.align-items-start.mb20
.mm-headline-3 {
  line-height: 32px;
}

.btn.btn-secondary {
  font-weight: 500;
  margin-top: 32px;
}

.base-modal-title {
  word-wrap: break-word; /* IE>=5.5 */
  white-space: pre; /* IE>=6 */
  white-space: -moz-pre-wrap; /* For Fx<=2 */
  white-space: pre-wrap; /* Fx>3, Opera>8, Safari>3*/
}
</style>
