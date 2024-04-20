<template>
  <q-layout view="lHh Lpr lFf">
    <AppHeader />
    <q-page-container>
      <router-view />
      <ModalsContainer />
    </q-page-container>
    <AppFooter />
  </q-layout>
</template>

<script setup lang="ts">
import AppFooter from 'components/AppFooter.vue'
import AppHeader from 'components/AppHeader.vue';
import { ModalsContainer } from 'vue-final-modal';

defineOptions({
  name: 'MainLayout',
});
</script>

<style lang="scss" scoped>
.q-layout {
  min-height: unset !important;
  position: static;
}

.q-page-container {
  padding: 40px;
  margin-top: 40px;
}
</style>
