<template>
  <q-avatar>
    <q-img
      v-if="src"
      :src="src"
      alt="avatar"
    />
  </q-avatar>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { FileService } from 'src/services/base/file.service'

const props = defineProps<{
  salt: string;
}>()

const src = ref<string>('');

onBeforeMount(async () => {
  if (!props.salt) {
    return;
  }

  const file = await FileService.getFileBase64(props.salt)
  src.value = `data:image/png;base64,${file}`;
})
</script>
