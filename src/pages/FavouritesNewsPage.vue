<template>
  <div class="news page-wrapper">
    <BaseWrapper>
      <template #headerText>
        Избранные новости
      </template>
      <template #content>
        <AppLoader v-if="isLoading" />
        <EmptyBanner v-else-if="!posts?.length">
          <template #title>
            По вашему запросу нет новостей
          </template>
        </EmptyBanner>
        <div
          v-else
          class="posts"
        >
          <PostComponent
            v-for="post in posts"
            :key="post.id"
            :post="post"
            @delete="loadData"
          />
        </div>
      </template>
    </BaseWrapper>
  </div>
</template>

<script lang="ts" setup>
import BaseWrapper from 'components/BaseWrapper.vue'
import PostComponent from 'components/profile/PostComponent.vue'
import { onBeforeMount, ref } from 'vue'
import { IPost } from 'src/models/profile/post.model'
import { PostsApiService } from 'src/services/api/postsApi.service'
import EmptyBanner from 'components/EmptyBanner.vue'
import AppLoader from 'components/AppLoader.vue'

const posts = ref<Array<IPost>>([]);
const isLoading = ref<boolean>(false);

async function loadData(): Promise<void> {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;
  posts.value = await PostsApiService.getFavouritePosts();
  isLoading.value = false;
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

    &--filters {
      margin-bottom: 20px;
      display: flex;
    }
  }
}
</style>
