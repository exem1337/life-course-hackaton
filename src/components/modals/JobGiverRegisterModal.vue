<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { AuthApiService } from 'src/services/api/authApi.service'
import { IJobGiverCreate } from 'src/models/user/student.model'
import { IRegionLocality } from 'src/models/region.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'

const emits = defineEmits<{(e: 'confirm'): void }>();

const personInfo = reactive<IJobGiverCreate>({
  email: '',
  password: '',
  locality_id: null,
  first_name: '',
  last_name: '',
  middle_name: '',
});
const isLoading = ref<boolean>(false);
const localities = ref<Array<IRegionLocality>>([]);
const isButtonDisabled = computed<boolean>(() => !personInfo.locality_id ||
  !personInfo.first_name ||
  !personInfo.last_name ||
  !personInfo.email ||
  !personInfo.password ||
  !personInfo.middle_name,
);
async function onRegister(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await AuthApiService.registerJobGiver(personInfo);
    emits('confirm');
  });
}

onBeforeMount(async () => {
  localities.value = await LocalitiesApiService.getAllLocalities();
});
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Регистрация"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="register-job-giver-modal">
      <q-input
        v-model="personInfo.last_name"
        type="text"
        label="Фамилия"
      />
      <q-input
        v-model="personInfo.first_name"
        type="text"
        label="Имя"
      />
      <q-input
        v-model="personInfo.middle_name"
        type="text"
        label="Отчество"
      />
      <q-input
        v-model="personInfo.email"
        type="email"
        label="Электронная почта"
      />
      <q-input
        v-model="personInfo.password"
        type="password"
        label="Пароль"
      />
      <q-select
        v-model="personInfo.locality_id"
        :options="localities"
        option-value="id"
        option-label="name"
        label="Город"
        emit-value
        map-options
      />
      <q-btn
        class="bg-primary text-white"
        :loading="isLoading"
        :disable="isButtonDisabled"
        @click="onRegister"
      >
        Войти
      </q-btn>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.register-job-giver-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .q-btn {
    width: 100%;
  }
}
</style>
