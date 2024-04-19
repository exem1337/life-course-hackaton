<template>
  <q-page>
    <q-btn @click="onOpenRegisterStudentModal">Студентам</q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ModalManager from 'src/services/base/modalManager.service'
import RegisterStudentModal from 'components/modals/RegisterStudentModal.vue'

const modalManager = inject<ModalManager>(ModalManager.getServiceName());

function onOpenRegisterStudentModal() {
  modalManager?.openAsyncModal(RegisterStudentModal);
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
