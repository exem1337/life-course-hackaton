<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive } from 'vue'
import { IStudentCreate } from 'src/models/user/student.model'
import BaseWrapper from 'components/BaseWrapper.vue'

defineEmits<{(e: 'confirm'): void }>();

const studentData = reactive<IStudentCreate>({
  first_name: '',
  password: '',
  last_name: '',
  middle_name: '',
  email: '',
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
      <BaseWrapper>
        <template #headerText>
          Основные данные
        </template>
        <template #content>
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
        </template>
      </BaseWrapper>

      <BaseWrapper>
        <template #headerText>
          Основные данные
        </template>
        <template #content>
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
        </template>
      </BaseWrapper>
    </div>
  </BaseModal>
</template>
