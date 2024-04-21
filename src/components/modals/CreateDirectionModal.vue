<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive } from 'vue'
import { ICreateDirection } from 'src/models/university.model'

const props = defineProps<{
  departmentId: number;
}>();

defineEmits<{(e: 'confirm', value?: ICreateDirection): void }>();

const form = reactive<ICreateDirection>({
  departmentId: props.departmentId,
  specialityCode: '',
  fullname: '',
});
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Добавить поток"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="confirm-modal">
      <q-input
        v-model="form.fullname"
        label="Наименование"
      />
      <q-input
        v-model="form.specialityCode"
        label="Код специальности"
        mask="#.##.##.##"
      />
      <div class="btn-group">
        <q-btn
          class="bg-primary text-white"
          :disable="!form.fullname || !form.specialityCode"
          @click="$emit('confirm', form)"
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
