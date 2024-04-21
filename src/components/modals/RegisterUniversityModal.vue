<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { IStudentCreate, IUniCreate, IUniCreateRequest } from 'src/models/user/student.model'
import { IRegionLocality } from 'src/models/region.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import BaseWrapper from 'components/BaseWrapper.vue'
import { AuthApiService } from 'src/services/api/authApi.service'
// import { AuthApiService } from 'src/services/api/authApi.service'

const emits = defineEmits<{(e: 'confirm'): void }>();

const personInfo = reactive<IUniCreate>({
  email: '',
  password: '',
  university_id: null,
  first_name: '',
  last_name: '',
  middle_name: '',
});
const universityInfo = reactive<IUniCreateRequest>({
  fullname: '',
  shortname: '',
  description: '',
  address: '',
  locality_id: null,
});
const isLoading = ref<boolean>(false);
const localities = ref<Array<IRegionLocality>>([]);
const isButtonDisabled = computed<boolean>(() =>
  !personInfo.first_name ||
  !personInfo.last_name ||
  !personInfo.email ||
  !personInfo.password ||
  !personInfo.middle_name,
);
// const sexOptions = ref<Array<EUserSex>>([EUserSex.Female, EUserSex.Male]);

async function onRegister(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    const { id: uniId } = await LocalitiesApiService.createUniversity(universityInfo);
    const { id: userId } = await AuthApiService.registerStudent(personInfo as IStudentCreate, true);
    await LocalitiesApiService.setUniversityAdmin(uniId, userId);
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
    <div class="register-uni-modal">
      <div class="register-uni-modal--inner">
        <BaseWrapper>
          <template #headerText>
            Информация о себе
          </template>
          <template #content>
            <div class="register-uni-modal--inner__content">
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
            </div>
          </template>
        </BaseWrapper>

        <BaseWrapper>
          <template #headerText>
            Информация о ВУЗе
          </template>
          <template #content>
            <div class="register-uni-modal--inner__content">
              <q-select
                v-model="universityInfo.locality_id"
                :options="localities"
                option-value="id"
                option-label="name"
                label="Город"
                emit-value
                map-options
              />
              <q-input
                v-model="universityInfo.fullname"
                type="text"
                label="Полное название ВУЗа"
              />
              <q-input
                v-model="universityInfo.shortname"
                type="text"
                label="Краткое название ВУЗа"
              />
              <q-input
                v-model="universityInfo.description"
                type="textarea"
                outlined
                label="Описание ВУЗа"
              />
              <q-input
                v-model="universityInfo.address"
                type="text"
                label="Адрес ВУЗа"
              />
            </div>
          </template>
        </BaseWrapper>
      </div>
      <q-btn
        class="bg-primary text-white"
        :loading="isLoading"
        :disable="isButtonDisabled"
        @click="onRegister"
      >
        Зарегистрироваться
      </q-btn>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.register-uni-modal {
  min-width: 600px;

  &--inner {
    display: flex;
    gap: 32px;
    margin-bottom: 20px;

    &__content {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .q-btn {
    width: 100%;
  }
}
</style>
