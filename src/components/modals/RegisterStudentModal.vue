<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { computed, onBeforeMount, reactive, ref, watch } from 'vue'
import { IStudentCreate } from 'src/models/user/student.model'
import { AuthApiService } from 'src/services/api/authApi.service'
import { IRegion, IRegionLocality } from 'src/models/region.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import {
  IDirectionGroup,
  IFaculty,
  IFacultyDepartment,
  IFacultyDepartmentDirection,
  IUniversity,
} from 'src/models/university.model'
import { EUserSex } from 'src/enums/userSex.enum'

const emits = defineEmits<{(e: 'confirm'): void }>();

const studentData = reactive<IStudentCreate>({
  first_name: '',
  password: '',
  last_name: '',
  middle_name: '',
  email: '',
  locality_id: null,
  university_id: null,
  sex: EUserSex.Female,
  faculty_id: null,
  department_id: null,
  direction_id: null,
  group_id: null,
  region_id: null,
});
const isSuccess = ref<boolean>(false);
const isLoading = ref<boolean>(false);
const sexOptions = ref<Array<EUserSex>>([EUserSex.Female, EUserSex.Male]);
const regions = ref<Array<IRegion>>([]);
const universities = ref<Array<IUniversity>>([]);
const faculties = ref<Array<IFaculty>>([]);
const departments = ref<Array<IFacultyDepartment>>([]);
const directions = ref<Array<IFacultyDepartmentDirection>>([])
const groups = ref<Array<IDirectionGroup>>([]);
const selectedRegionLocalities = computed<Array<IRegionLocality>>(() => studentData.region_id
  ? regions.value?.find((region) => region.id === studentData.region_id)?.localities || []
  : [],
);

const isButtonDisabled = computed<boolean>(() =>
  !studentData.password ||
  !studentData.email ||
  !studentData.middle_name ||
  !studentData.last_name ||
  !studentData.first_name ||
  !studentData.group_id,
);

async function onSubmit(): Promise<void> {
  if (isSuccess.value) {
    emits('confirm');
    return;
  }

  isLoading.value = true;
  await AuthApiService.registerStudent(studentData);
  isSuccess.value = true;
  isLoading.value = false;
}

watch(
  () => studentData.locality_id,
  async () => {
    studentData.university_id = null;
    universities.value = (await LocalitiesApiService.loadCity(studentData.locality_id))?.universities;
  },
);

watch(
  () => studentData.university_id,
  async () => {
    studentData.faculty_id = null;
    faculties.value = (await LocalitiesApiService.loadUniversity(studentData.university_id))?.faculties;
  },
);

watch(
  () => studentData.faculty_id,
  async () => {
    studentData.department_id = null;
    departments.value = (await LocalitiesApiService.loadFaculty(studentData.faculty_id))?.departments;
  },
)

watch(
  () => studentData.department_id,
  async () => {
    studentData.direction_id = null;
    directions.value = (await LocalitiesApiService.loadDepartment(studentData.department_id))?.directions;
  },
)

watch(
  () => studentData.direction_id,
  async () => {
    studentData.group_id = null;
    groups.value = (await LocalitiesApiService.loadDirection(studentData.direction_id))?.groups;
  },
)

onBeforeMount(async () => {
  regions.value = await LocalitiesApiService.loadRegions();
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
    <div class="student-create-modal">
      <div
        v-if="isSuccess"
        class="student-create-modal--success"
      >
        <p>На вашу электронную почту отправлена ссылка для подтверждения регистрации. После нажатия на нее, авторизуйтесь в системе.</p>
      </div>
      <div
        v-else
        class="student-create-modal--inner"
      >
        <div>
          <q-input
            v-model="studentData.first_name"
            type="text"
            clearable
            label="Имя"
          />
          <q-input
            v-model="studentData.last_name"
            type="text"
            clearable
            label="Фамилия"
          />
          <q-input
            v-model="studentData.middle_name"
            type="text"
            clearable
            label="Отчество"
          />
          <q-input
            v-model="studentData.email"
            type="email"
            clearable
            label="Электронная почта"
          />
          <q-input
            v-model="studentData.password"
            type="password"
            clearable
            label="Пароль"
          />
          <q-select
            v-model="studentData.sex"
            :options="sexOptions"
            label="Пол"
          />
        </div>
        <div>
          <q-select
            v-model="studentData.region_id"
            :options="regions"
            option-value="id"
            option-label="name"
            label="Регион"
            emit-value
            map-options
          />
          <q-select
            v-model="studentData.locality_id"
            :disable="!studentData.region_id"
            :options="selectedRegionLocalities"
            option-value="id"
            option-label="name"
            label="Город"
            emit-value
            map-options
          />
          <q-select
            v-model="studentData.university_id"
            :disable="!studentData.locality_id"
            emit-value
            :options="universities"
            map-options
            option-value="id"
            option-label="fullname"
            label="Учебное заведение"
          />
          <q-select
            v-model="studentData.faculty_id"
            :disable="!studentData.university_id"
            emit-value
            :options="faculties"
            map-options
            option-value="id"
            option-label="fullname"
            label="Факультет"
          />
          <q-select
            v-model="studentData.department_id"
            :disable="!studentData.faculty_id"
            :options="departments"
            map-options
            option-value="id"
            emit-value
            option-label="fullname"
            label="Кафедра"
          />
          <q-select
            v-model="studentData.direction_id"
            :disable="!studentData.department_id"
            :options="directions"
            map-options
            emit-value
            option-value="id"
            option-label="fullname"
            label="Направление подготовки"
          />
          <q-select
            v-model="studentData.group_id"
            :disable="!studentData.direction_id"
            :options="groups"
            map-options
            emit-value
            option-value="id"
            option-label="fullname"
            label="Группа"
          />
        </div>
      </div>

      <q-btn
        class="bg-primary text-white"
        :disable="isButtonDisabled"
        :loading="isLoading"
        @click="onSubmit"
      >
        {{ isSuccess ? 'Понятно' : 'Зарегистрироваться' }}
      </q-btn>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.student-create-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 580px;

  &--inner {
    display: flex;
    justify-content: space-between;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 49%;
    }
  }
}
</style>
