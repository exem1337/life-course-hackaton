<template>
  <q-page>
    <q-btn @click="onOpenRegisterStudentModal">Студентам</q-btn>
    <q-btn @click="onOpenRegisterJobGiverModal">Работодателям</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ModalManager from 'src/services/base/modalManager.service'
import RegisterStudentModal from 'components/modals/RegisterStudentModal.vue'
import JobGiverRegisterModal from 'components/modals/JobGiverRegisterModal.vue'
import { useMeta } from 'quasar'

const modalManager = inject<ModalManager>(ModalManager.getServiceName());

useMeta({
  title: 'LifeCourse - Виртуальный мир студента',
});

function onOpenRegisterStudentModal(): void {
  modalManager?.openAsyncModal(RegisterStudentModal);
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
