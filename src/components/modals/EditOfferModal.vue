<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive } from 'vue'

const props = defineProps<{
  header: string;
  description: string;
}>();

defineEmits<{(e: 'confirm', value?: { header: string, description: string }): void }>();

const form = reactive<{ header: string, description: string }>({
  header: props.header,
  description: props.description,
});
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Редактировать вакансию"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="event-create-modal">
      <q-input
        v-model="form.header"
        label="Наименование"
      />
      <q-input
        v-model="form.description"
        label="Описание"
        type="textarea"
        outlined
      />
      <div class="btn-group">
        <q-btn
          class="bg-primary text-white"
          @click="$emit('confirm', form)"
        >
          Создать
        </q-btn>
      </div>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
:global(.vue-final-modal--wrapper:has(.confirm-modal)) {
  width: 400px;
}

.event-create-modal {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;

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
