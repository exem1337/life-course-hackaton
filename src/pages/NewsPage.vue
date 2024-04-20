<template>
  <div class="news page-wrapper">
    <BaseWrapper>
      <template #headerText>
        Новости
      </template>
      <template #headerIcons>
        <q-btn
          outline
          @click="onAddNewsModal"
        >
          Добавить новость
        </q-btn>
      </template>
      <template #content>
        <EmptyBanner v-if="!posts?.length">
          <template #title>
            По вашему запросу нет новостей
          </template>
          <template #description>
            Измените параметры фильтрации или добавьте свою новость
          </template>
          <template #button>
            <q-btn
              class="bg-white text-dark"
              @click="onAddNewsModal"
            >
              Создать новость
            </q-btn>
          </template>
        </EmptyBanner>
        <div class="posts">
          <PostComponent
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>
      </template>
    </BaseWrapper>
  </div>
</template>

<script lang="ts" setup>
import BaseWrapper from 'components/BaseWrapper.vue'
import PostComponent from 'components/profile/PostComponent.vue'
import { inject, onBeforeMount, ref } from 'vue'
import { IPost } from 'src/models/profile/post.model'
import { PostsApiService } from 'src/services/api/postsApi.service'
import EmptyBanner from 'components/EmptyBanner.vue'
import ModalManager from 'src/services/base/modalManager.service'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import AddPostModal from 'components/modals/AddPostModal.vue'

const posts = ref<Array<IPost>>([]);
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const isLoading = ref<boolean>(false);

function onAddNewsModal(): void {
  modalManager?.openAsyncModal(AddPostModal);
}

async function loadData(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    posts.value = (await PostsApiService.getPosts()).data;
  });
}

onBeforeMount(async () => {
  await loadData();
})
</script>

<style lang="scss" scoped>
.news {
  .posts {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
}
</style>
