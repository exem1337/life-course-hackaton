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
      <q-item class='column q-pt-sm'>
        <h6 class="q-ma-none">{{ post.title }}</h6>
        <p>{{ post.content }}</p>
      </q-item>
      <img :src="post.image">
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
            {{ post.likes }}
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
import { ref } from 'vue';
import { DateFormat, formatDate } from 'src/utils/formatDate'
import RightDriverComments from 'components/profile/RightDriverComments.vue';
import { PostsApiService } from 'src/services/api/postsApi.service'

const props = defineProps<{
  post: IPost;
}>()

const showPanel = ref(false);
function showRightPanelComment() {
  showPanel.value = !showPanel.value;
}

async function onLike(): Promise<void> {
  await PostsApiService.likePost(props.post?.id);
}
</script>

<style scoped lang="scss">
.profile-post{

  position: relative;
  .profile-post-container{
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    min-height: 400px;
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
  }
}

.point-no{
  pointer-events: none;
}
</style>
