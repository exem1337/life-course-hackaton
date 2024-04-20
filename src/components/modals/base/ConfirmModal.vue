<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'

withDefaults(defineProps<{
  title?: string;
  description?: string;
  okButtonText?: string;
  cancelButtonText?: string;
}>(), {
  okButtonText: 'Подтвердить',
  cancelButtonText: 'Отмена',
});

defineEmits<{(e: 'confirm', value: boolean): void }>();
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    :title="title"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm', false)"
  >
    <div class="confirm-modal">
      <p>{{ description || '' }}</p>
      <div class="btn-group">
        <q-btn @click="$emit('confirm', false)">
          {{ cancelButtonText }}
        </q-btn>
        <q-btn
          class="bg-primary text-white"
          @click="$emit('confirm', true)"
        >
          {{ okButtonText }}
        </q-btn>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
:global(.vue-final-modal--wrapper:has(.confirm-modal)) {
  width: 400px;
}

.confirm-modal {
  p {
    margin-bottom: 20px;
  }

  .btn-group {
    display: flex;
    justify-content: space-between;

    .q-btn {
      width: 49%;
    }
  }
}
</style>
