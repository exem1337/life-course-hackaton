<template>
  <q-uploader
    ref="uploaderRef"
    :label="label ?? 'Картинки (опционально)'"
    send-raw
    color="primary"
    :accept="accept ?? '.png, image/*'"
    class="text-primary file-uploader"
    @added="(event) => onAddImage(event as Array<File>)"
    @removed="onRemoveImage"
  />
</template>

<script lang="ts" setup>
import { IAddImage } from 'src/models/base/image.model';
import { onBeforeMount, ref } from 'vue';
import { FileService } from 'src/services/base/file.service'

const props = defineProps<{
  file?: string;
  label?: string;
  accept?: string;
  model?: unknown;
  type?: string;
}>();

const emits = defineEmits<{
  (e: 'remove', value: IAddImage): void;
  (e: 'add', value: IAddImage): void;
}>()

const uploaderRef = ref();
const prevent = ref(true);

async function onAddImage(file: Array<File>) {
  if (prevent.value) {
    return;
  }

  const salt = await FileService.uploadFile(file);
  emits('add', {
    model: props.model,
    fileKey: salt,
  });
}

function onRemoveImage() {
  emits('remove', {
    model: props.model,
    fileKey: 'NULL',
  });
}

onBeforeMount(async () => {
  if (props.file) {
    const file = await FileService.getFile(props.file, props.type);

    if (!file) {
      return;
    }
    uploaderRef.value.addFiles([file]);
  }

  prevent.value = false;
})
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.q-uploader {
  width: 100%;

  :deep(.q-uploader__file-header-content) {
    color: $primary !important;
  }

  :deep(.q-uploader__file-header) {
    .q-btn {
      color: $primary !important;
    }
  }
}
</style>
