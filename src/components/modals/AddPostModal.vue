<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive, ref } from 'vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { IPostCreate } from 'src/models/profile/post.model'
import { useUserStore } from 'stores/user'
import AppImageUploader from 'components/AppImageUploader.vue'
import { IAddImage } from 'src/models/base/image.model'
import { PostsApiService } from 'src/services/api/postsApi.service'
import { PostSectionEnum } from 'src/enums/postSection.enum';

const emits = defineEmits<{(e: 'confirm', value: boolean): void }>();
const store = useUserStore();

const postInfo = reactive<IPostCreate>({
  title: '',
  content: '',
  author_id: store.user?.id,
  tags: [],
  file_keys: [],
  section: '',
});
const isLoading = ref<boolean>(false);
const tagsString = ref<string>('');

async function onAddImage(image: IAddImage): Promise<void> {
  postInfo.file_keys.push(image.fileKey);
}

async function onCreate(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await PostsApiService.createPost({
      ...postInfo,
      tags: tagsString.value?.split(' '),
      university_id: store.getUniversity,
    })
    emits('confirm', true);
  });
}
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Создать пост"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm', false)"
  >
    <div class="add-post-modal">
      <q-input
        v-model="postInfo.title"
        type="email"
        label="Заголовок"
      />
      <q-input
        v-model="postInfo.content"
        type="textarea"
        outlined
        label="Текст"
      />
      <AppImageUploader @add="onAddImage" />
      <q-select
        v-model="postInfo.section"
        type="text"
        :options="Object.values(PostSectionEnum)"
        outlined
        label="Секция"
      />
      <q-input
        v-model="tagsString"
        type="text"
        outlined
        label="Теги (вводить через пробел)"
      />
      <q-btn
        class="bg-primary text-white"
        :loading="isLoading"
        @click="onCreate"
      >
        Создать
      </q-btn>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.add-post-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 600px;

  .q-btn {
    width: 100%;
  }
}
</style>
