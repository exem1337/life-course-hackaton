<template>
  <div class="profile-post">
    <q-card class="my-card profile-post-container">
      <q-item class="profile-post-container__card">
        <q-item-section avatar>
          <q-avatar>
            <img src="https://klev.club/uploads/posts/2023-10/1698733776_klev-club-p-kartinki-anime-devushki-milie-50.jpg">
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
import { onBeforeMount, ref } from 'vue'
import { DateFormat, formatDate } from 'src/utils/formatDate'
import RightDriverComments from 'components/profile/RightDriverComments.vue';
import { PostsApiService } from 'src/services/api/postsApi.service'
import { FileService } from 'src/services/base/file.service'

const props = defineProps<{
  post: IPost;
}>();

const slide = ref<number>(0);
const showPanel = ref(false);
const images = ref<Array<string>>([]);
const likes = ref<number>(props.post?.likes);

function showRightPanelComment() {
  showPanel.value = !showPanel.value;
}

async function onLike(): Promise<void> {
  await PostsApiService.likePost(props.post?.id);
  likes.value++;
}

onBeforeMount(async () => {
  images.value = await Promise.all(props.post?.file_keys?.map(
    async (fileKey: string) => `data:image/png;base64,${await FileService.getFileBase64(fileKey)}`),
  );
})
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.profile-post{
  position: relative;
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
