<template>
  <div class="profile-post">
    <q-card class="my-card profile-post-container">
      <q-icon
        v-if="isPostCreatedByCurrentUser"
        class="delete-icon"
        name="delete"
        @click="onDeletePost"
      />
      <q-item class="profile-post-container__card">
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ post.author?.first_name }} {{ post.author?.last_name }}</q-item-label>
          <q-item-label caption> {{ formatDate({ date: new Date(post.createdAt)}, { format: DateFormat.Full }) }} </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class="profile-post-container__tags">
        <q-item-section>
          <q-item-label
            v-for="tag in post.tags"
            :key="tag"
            class="profile-post-container__tags--tag"
          >
            #{{ tag }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class='column q-pt-sm'>
        <h6 class="q-ma-none">{{ post.title }}</h6>
        <p>{{ post.content }}</p>
      </q-item>

      <q-carousel
        v-model="slide"
        animated
        navigation
        infinite
        :autoplay="false"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
      >
        <q-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :name="index"
          :img-src="image"
        />
      </q-carousel>
      <div class="profile-post-container--icon-bottom">
        <q-btn
          flat
          class="profile-post-container--icon-bottom__comment-post"
          @click="showRightPanelComment"
        >
          <q-icon
            name="comment"
            size="25px"
            color="gray"
          />
          <div class="profile-post-container--icon-bottom__comment-post__count">
            {{ post.comments?.length }}
          </div>
        </q-btn>
        <q-btn
          flat
          class="profile-post-container--icon-bottom__like-post"
          @click="onLike"
        >
          <q-icon
            name="favorite"
            size="25px"
            color="red"
          />
          <div class="profile-post-container--icon-bottom__like-post__count">
            {{ post.likes }}
          </div>
        </q-btn>
      </div>
    </q-card>
    <RightDriverComments
      :class="{'point-no': !showPanel}"
      :showPanel="showPanel"
      :showRightPanelComment="showRightPanelComment"
    />
  </div>
</template>

<script setup lang="ts">
import { IPost } from 'src/models/profile/post.model';
import { computed, inject, onBeforeMount, ref } from 'vue'
import { DateFormat, formatDate } from 'src/utils/formatDate'
import RightDriverComments from 'components/profile/RightDriverComments.vue';
import { PostsApiService } from 'src/services/api/postsApi.service'
import { FileService } from 'src/services/base/file.service'
import { useUserStore } from 'stores/user'
import ModalManager from 'src/services/base/modalManager.service'
import ConfirmModal from 'components/modals/base/ConfirmModal.vue'

const props = defineProps<{
  post: IPost;
}>();

const emits = defineEmits<{
  (e: 'delete'): void;
}>();

const slide = ref<number>(0);
const showPanel = ref(false);
const images = ref<Array<string>>([]);
const likes = ref<number>(props.post?.likes);
const store = useUserStore();
const isPostCreatedByCurrentUser = computed<boolean>(() => props.post.author_id === store.user?.id);
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const avatar = ref<string>('');
function showRightPanelComment() {
  showPanel.value = !showPanel.value;
}

async function onDeletePost(): Promise<void> {
  modalManager?.openAsyncModal<typeof ConfirmModal, boolean>(ConfirmModal, {
    attrs: {
      title: 'Вы уверены, что хотите удалить пост?',
      description: 'Действие необратимо',
      okButtonText: 'Да, удалить',
    },
  }).then(async (res) => {
    if (res) {
      await PostsApiService.deletePost(props.post.id);
      emits('delete');
    }
  });
}

async function onLike(): Promise<void> {
  await PostsApiService.likePost(props.post?.id);
  likes.value++;
}

onBeforeMount(async () => {
  images.value = await Promise.all(props.post?.file_keys?.map(
    async (fileKey: string) => `data:image/png;base64,${await FileService.getFileBase64(fileKey)}`),
  );

  if (props.post?.author.avatar_salt != null) {
    avatar.value = `data:image/png;base64,${await FileService.getFileBase64(props.post?.author.avatar_salt)}`
  }
})
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.profile-post{
  position: relative;

  .delete-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    font-size: 24px;
    cursor: pointer;
    z-index: 20;
  }

  .profile-post-container{
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    min-height: 400px;

    :deep(.q-carousel__slide) {
      background-size: contain;
      background-repeat: no-repeat;
    }

    &--icon-bottom{
      position: absolute;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 8px;
      :deep(.q-btn){
        width: 60px;
        height: 30px;
        border-radius: 16px !important;
        backdrop-filter: blur(5px);
        background-color: rgba(255, 255, 255, 0.8) !important;

        & > span {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          gap: 4px;
        }
      }
    }

    &__card{
      padding-bottom: 0px!important;
    }

    &__tags > div {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-direction: row;
      justify-content: flex-start;

      .profile-post-container__tags--tag {
        padding: 4px 8px;
        border-radius: 4px;
        background: $primary;
        color: $white;
        font-weight: 500;
        width: fit-content;
        margin-top: 0;
      }
    }
  }
}

.point-no{
  pointer-events: none;
}
</style>
