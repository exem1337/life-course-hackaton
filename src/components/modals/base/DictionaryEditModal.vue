<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { ref } from 'vue'

const props = defineProps<{
  title: string;
  text: string;
}>();

defineEmits<{(e: 'confirm', value?: string): void }>();

const textInstance = ref<string>(props.text);
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    :title="title"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="confirm-modal">
      <q-input v-model="textInstance" />
      <div class="btn-group">
        <q-btn
          class="bg-primary text-white"
          :disable="!textInstance?.trim()?.length"
          @click="$emit('confirm', textInstance)"
        >
          Сохранить
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
  .btn-group {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .q-btn {
      width: 100%;
    }
  }
}
</style>
