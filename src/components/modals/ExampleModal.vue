<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'

withDefaults(defineProps<{
  title?: string;
  okButtonText?: string;
}>(), {
  okButtonText: 'Подтвердить',
});

defineEmits<{(e: 'confirm'): void }>();
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    :title="title"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    Кастомный компонент модалки
  </BaseModal>
</template>
