<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive, ref } from 'vue'
import { IEventCreateRequest } from 'src/models/event.model'
import { PostSectionEnum } from 'src/enums/postSection.enum'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'

const props = defineProps<{
  universityId: number;
}>();

const emits = defineEmits<{(e: 'confirm', value?: boolean): void }>();

const form = reactive<IEventCreateRequest>({
  university_id: props.universityId,
  name: '',
  description: '',
  section: '' as PostSectionEnum,
  date_beg: '',
  date_end: '',
});

const selectedDate = ref<{ from: string, to: string }>();
const isLoading = ref<boolean>(false);

async function onCreate(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await LocalitiesApiService.createEvent({
      ...form,
      date_beg: selectedDate.value?.from || '',
      date_end: selectedDate.value?.to || '',
    });
    emits('confirm', true);
  });
}
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Создать мероприятие"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="event-create-modal">
      <q-input
        v-model="form.name"
        label="Наименование"
      />
      <q-input
        v-model="form.description"
        label="Описание"
        type="textarea"
        outlined
      />
      <q-date
        v-model="selectedDate"
        range
      />
      <q-select
        v-model="form.section"
        label="Секция"
        :options="[PostSectionEnum.Creation, PostSectionEnum.Science, PostSectionEnum.Sport, PostSectionEnum.Volunteering]"
      />
      <div class="btn-group">
        <q-btn
          class="bg-primary text-white"
          :loading="isLoading"
          @click="onCreate"
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

  .q-date {
    width: 100%;
  }

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
