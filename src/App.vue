<template>
  <router-view />
</template>

<script setup lang="ts">
import 'vue-final-modal/style.css';
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from 'src/services/base/auth.service'
defineOptions({
  name: 'App',
});

const router = useRouter()
onBeforeMount(async () => {
  await AuthService.refresh(router);
})
</script>
