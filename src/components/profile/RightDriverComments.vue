<template>
  <div class="profile-post--comments">
    <div
      class="profile-post--comments-init"
      :class=" { 'profile-post--comments-show' : showPanel} "
    >
      <div class="profile-post--comments-init__header">
        <q-btn
          flat
          class="q-ml-auto"
          @click="showRightPanelComment"
        >
          <q-icon name="close"></q-icon>
        </q-btn>
        <h6 class="q-my-md text-center full-width">Комментарии</h6>
        <div class="blur-panel" />
      </div>
      <div class="profile-post--comments-init__content">
        <q-scroll-area
          v-if="comments.length !== 0"
          ref="scrollArea"
          style="height: 530px; position: relative"
          class="q-mb-auto profile-post--comments-init__content-scroll-area"
        >
          <div style="height: 80px" />
          <q-card
            v-for="comment in comments"
            :key="comment.id"
            class="my-card q-pa-xs profile-post--comments-init__content-card"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <q-img :src="comment.photo" />
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ comment.user.first_name }} {{  comment.user.last_name }}</q-item-label>
                <q-item-label caption> {{ formatDate({ date: new Date(comment.createdAt)}, { format: DateFormat.Full }) }} · комментарий обновлен </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              {{ comment.text }}
            </q-item>
          </q-card>
          <div style="height: 110px" />
        </q-scroll-area>
        <div class="submit-form">
          <div class="blur-panel" />
          <q-input
            v-model="value"
            class="q-px-sm"
            placeholder="Написать комментарий"
          />
          <q-btn
            label="Отправить"
            class="q-mt-sm q-ml-auto full-width"
            icon="send"
            @click="addComment()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IComment, ICommentsRequestFilters } from 'src/models/profile/post.model';
import { PostsApiService } from 'src/services/api/postsApi.service';
import { FilesApiService } from 'src/services/api/filesApi.service';
import { useUserStore } from 'stores/user';
import { DateFormat, formatDate } from '../../utils/formatDate';
const value = ref<string>('');
const comments = ref<IComment[]>([]);
const store = useUserStore();
const props = defineProps<{
  showPanel: boolean;
  showRightPanelComment: () => void;
  idPost: number;
}>()

async function addComment(): Promise<void> {
  if (value.value === '') return;
  await PostsApiService.addComment(props.idPost, value.value);
  comments.value?.push({
    id: comments.value.length - 1 > 0 ? comments.value[comments.value.length - 1].id + 1 : 0,
    text: value.value,
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`,
    user_id: store.user.id,
    publication_id: props.idPost,
    photo: `data:image/png;base64,${store.avatar}`,
    user: store.user,
  })
  value.value = '';
}
const filtersObj: ICommentsRequestFilters = {
  fields: {},
  includes: [
    {
      association: 'user',
    },
  ],
}
filtersObj.fields.publication_id = {
  operator: 'eq',
  value: props.idPost,
}
const scrollArea = ref<HTMLDivElement | null>(null);
onMounted(async () => {
  comments.value = (await PostsApiService.getAllComments(filtersObj)).data;
  for (let i = 0; i < comments.value.length; i++) {
    const url = await FilesApiService.getFile(comments.value[i].user.avatar_salt);
    comments.value[i].photo = `data:image/png;base64,${url}`;
  }
});

</script>

<style scoped lang="scss">
.profile-post--comments{
  overflow: hidden;
  width: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  padding-left: 5px;
  &-init{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px 0 0 8px;
    transition: transform 0.2s ease;
    right: -110%;
    top: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: -2px 0 5px -3px rgba(0, 0, 0, 0.5);
    &__header{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      &:deep(.q-btn) {
        z-index: 2;
      }
      &>h6{
        z-index: 2;
        margin-top: 0;
      }
    }
    &__content{
      padding: 16px 8px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      width: 100%;
      //height: calc(100% - 100px);

      :deep(.q-scrollarea) {
        height: 100% !important;
      }

      &-card{
        background-color: transparent !important;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 0;
        :deep(.q-item){
          padding: 4px 0 !important;
        }
      }
    }
  }
  &-show{
    transform: translateX(-110%);
  }
}
.submit-form{
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 16px;
  &:deep(.q-btn) {
    z-index: 1;
  }
  &:deep(.q-input) {
    position: relative;
    z-index: 1;
  }
}
.blur-panel{
  z-index: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}
</style>
