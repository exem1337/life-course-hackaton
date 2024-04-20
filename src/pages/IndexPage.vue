<template>
  <q-page>
    <q-btn @click="onOpenRegisterStudentModal">Студентам</q-btn>
    <q-btn @click="onOpenRegisterJobGiverModal">Работодателям</q-btn>
    <q-btn @click="onOpenRegisterUniversityAdminModal">ВУЗам</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ModalManager from 'src/services/base/modalManager.service'
import RegisterStudentModal from 'components/modals/RegisterStudentModal.vue'
import JobGiverRegisterModal from 'components/modals/JobGiverRegisterModal.vue'
import { useMeta } from 'quasar'
import RegisterUniversityModal from 'components/modals/RegisterUniversityModal.vue'

const modalManager = inject<ModalManager>(ModalManager.getServiceName());

useMeta({
  title: 'LifeCourse - Виртуальный мир студента',
});

function onOpenRegisterStudentModal(): void {
  modalManager?.openAsyncModal(RegisterStudentModal);
}

function onOpenRegisterUniversityAdminModal(): void {
  modalManager?.openAsyncModal(RegisterUniversityModal);
}

function onOpenRegisterJobGiverModal(): void {
  modalManager?.openAsyncModal(JobGiverRegisterModal);
}

defineOptions({
  name: 'IndexPage',
})
</script>

<style lang="scss" scoped>
.base-wrapper {
  margin-bottom: 60px;
}
</style>
