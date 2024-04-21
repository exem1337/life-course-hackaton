<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive } from 'vue'
import { ICreateVacancy } from 'src/models/university.model'
import { OfferApiService } from 'src/services/api/offerApi.service'

const props = defineProps<{
  organizationId: number;
  localityId: number;
}>();

const emits = defineEmits<{(e: 'confirm', value: boolean): void }>();

const form = reactive<ICreateVacancy>({
  organization_id: props.organizationId,
  header: '',
  description: '',
  locality_id: props.localityId,
});

async function onCreate() {
  await OfferApiService.createOffer(form);
  emits('confirm', true);
}
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Создать вакансию"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm', false)"
  >
    <div class="confirm-modal">
      <q-input
        v-model="form.header"
        label="Наименование"
      />
      <q-input
        v-model="form.description"
        label="Описание вакансии"
        type="textarea"
        outlined
      />
      <div class="btn-group">
        <q-btn
          class="bg-primary text-white"
          :disable="!form.header || !form.description"
          @click="onCreate"
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
