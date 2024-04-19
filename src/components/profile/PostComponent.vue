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
          <q-item-label>{{ post.firstName }} {{ post.lastName }}</q-item-label>
          <q-item-label caption> {{ formatDate({ date: post.dateTime}, {}) }} · обновлено фото </q-item-label>
        </q-item-section>
      </q-item>
      <q-item class='column q-pt-sm'>
        <h6 class="q-ma-none">{{ post.title }}</h6>
        <p>{{ post.text }}</p>
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
            {{ post.countLikes }}
          </div>
        </q-btn>
        <q-btn
          flat
          class="profile-post-container--icon-bottom__like-post"
        >
          <q-icon
            name="favorite"
            size="25px"
            color="red"
          />
          <div class="profile-post-container--icon-bottom__like-post__count">
            {{ post.countLikes }}
          </div>
        </q-btn>
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { IPost } from 'src/models/profile/post.model';
// import { ref } from 'vue';
import { formatDate } from 'src/utils/formatDate';
defineProps<{
  post: IPost;
}>()
// let showPanel = ref(false);
function showRightPanelComment() {
  // showPanel.value = !showPanel.value;
  console.log('asdasda')
}
</script>

<style scoped lang="scss">
.profile-post{
  .profile-post-container{
    position: relative;
    overflow: hidden;
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
        }
      }
    }

    &__card{
      padding-bottom: 0px!important;
    }
  }
}
</style>
