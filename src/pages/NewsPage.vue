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
        <div class="posts--filters">
          <q-select
            v-if="universities?.length"
            v-model="filters.university"
            filled
            use-input
            use-chips
            multiple
            label="Университет"
            emit-value
            clearable
            option-value="id"
            stack-label
            option-label="fullname"
            map-options
            input-debounce="0"
            :options="universities"
            style="width: 250px; margin-right: 8px"
          />
          <q-select
            v-model="filters.section"
            filled
            use-input
            use-chips
            multiple
            label="Секция"
            emit-value
            clearable
            stack-label
            :options="Object.values(PostSectionEnum)"
            input-debounce="0"
            style="width: 250px"
          />
        </div>
        <AppLoader v-if="isLoading" />
        <EmptyBanner v-else-if="!posts?.length">
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
        <div
          v-else
          class="posts"
        >
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
import { inject, onBeforeMount, reactive, ref, watch } from 'vue'
import { IPost, IPostsFilters, IPostsRequestFilters } from 'src/models/profile/post.model'
import { PostsApiService } from 'src/services/api/postsApi.service'
import EmptyBanner from 'components/EmptyBanner.vue'
import ModalManager from 'src/services/base/modalManager.service'
// import { wrapLoader } from 'src/utils/loaderWrapper.util'
import AddPostModal from 'components/modals/AddPostModal.vue'
import AppLoader from 'components/AppLoader.vue'
import { IUniversity } from 'src/models/university.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import { useUserStore } from 'stores/user'
import { PostSectionEnum } from 'src/enums/postSection.enum';

const posts = ref<Array<IPost>>([]);
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const isLoading = ref<boolean>(false);
const store = useUserStore();
const filters = reactive<IPostsFilters>({
  university: [],
  section: [],
});

const universities = ref<Array<IUniversity>>([]);

function onAddNewsModal(): void {
  modalManager?.openAsyncModal<typeof AddPostModal, boolean>(AddPostModal).then(async (res) => !!res && await loadData());
}

async function loadData(): Promise<void> {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;
  const filtersObj: IPostsRequestFilters = {
    fields: {},
    includes: [{
      association: 'author',
    }],
  }

  if (filters.university?.length) {
    filtersObj.fields.university_id = {
      operator: 'eq',
      value: filters.university,
    }
  }

  posts.value = (await PostsApiService.getPosts(filtersObj)).data;
  isLoading.value = false;
}

watch(
  () => filters,
  async () => {
    await loadData();
  },
  {
    deep: true,
  },
);

onBeforeMount(async () => {
  universities.value = await LocalitiesApiService.loadAllUniversities();
  filters.university = [store.getUniversity]
  filters.section = []
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
