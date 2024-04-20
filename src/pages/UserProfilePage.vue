<template>
  <div class="profile-page page-wrapper">
    <div class="profile-page--title">
      <div class="profile-page--title__avatar">
        <q-avatar
          size="100px"
          class="overflow-auto"
        >
          <img
            :src="avatarUrl"
            alt="Профиль студента"
          >
        </q-avatar>
        <div class="profile-page--title__avatar-star">
          <div class="profile-page--title__avatar-star-count">
            x{{ user.star.toString() }}
          </div>
          <q-icon
            size="30px"
            color="yellow-9"
            name="star"
            @click=""
          />
        </div>
      </div>
      <div class="profile-page--title__text">
        {{ profile?.first_name }} {{ profile?.last_name }} <br>
        <div>
          <q-list separator>
            <q-item class="q-pl-none q-pb-none">
              <q-item-section>
                <q-item-label caption>
                  Факультет:
                  <a
                    href=""
                    target="_blank"
                  >
                    {{ groups.faculty }}
                  </a>
                </q-item-label>
                <q-item-label caption>
                  Кафедра:
                  <a
                    href=""
                    target="_blank"
                  >
                    {{ groups.department }}
                  </a>
                </q-item-label>
                <q-item-label caption>Поток: {{ groups.stream }}</q-item-label>
                <q-item-label caption>
                  Группа:
                  <a
                    href=""
                    target="_blank"
                  >
                    {{ groups.group }}
                  </a>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="profile-page--title__right-panel q-ml-auto q-mb-auto">
        <q-btn
          flat
          @click=""
        >
          <q-icon
            size="30px"
            name="edit"
            color="primary"
          />
        </q-btn>
      </div>
    </div>
    <div>
      <GalleryComponent
        :images="gallery"
        class="q-mb-md"
      >
        <template #header>
          <p>Галерея</p>
        </template>
        <template #footer>
          <q-btn
            size="md"
            icon="add_a_photo"
            color="primary"
            label="Загрузить фото"
            no-caps
            class="q-mr-sm"
          />
          <q-btn
            size="md"
            icon="perm_media"
            color="primary"
            label="Показать все"
            no-caps
            class="q-mr-sm"
            @click="onOpenLoginModal"
          />
        </template>
      </GalleryComponent>
    </div>
    <div class="profile-page--achievements">
      <p>Достижения</p>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          icon="science"
          label="Достижения в науке"
          :caption="'x' + user.achievements.science"
        >
          <q-card>
            <q-card-section>
              список тут
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="fitness_center"
          label="Достижения в спорте"
          :caption="'x' + user.achievements.sport"
        >
          <q-card>
            <q-card-section>
              список тут
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="palette"
          label="Достижения в творчестве"
          :caption="'x' + user.achievements.creativity"
        >
          <q-card>
            <q-card-section>
              список тут
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="volunteer_activism"
          label="Достижения в волонтерстве"
          :caption="'x' + user.achievements.volunteering"
        >
          <q-card>
            <q-card-section>
              список тут
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div class="profile-page--posts">
      <p>Посты</p>
      <PostComponent
        v-for="post in postsMock"
        :key="post.id"
        :post="post"
        class="q-mb-xl"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import GalleryComponent from 'components/profile/GalleryComponent.vue';
import PostComponent from 'components/profile/PostComponent.vue';
import { IPost } from 'src/models/profile/post.model';
import { useRoute } from 'vue-router';
import { inject, onBeforeMount, ref } from 'vue';
import { IUser } from 'src/models/user.model';
import { ProfileApiService } from 'src/services/api/profileApi.service';
import { FilesApiService } from 'src/services/api/filesApi.service';
import { IGalleryItem } from 'src/models/profile/galleryImage.model';
import GalleryAllModal from 'components/profile/GalleryAllModal.vue';
import ModalManager from 'src/services/base/modalManager.service';
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
function onOpenLoginModal(): void {
  modalManager?.openAsyncModal(GalleryAllModal);
}

const postsMock: IPost[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
    title: 'Заголовок первого поста',
    text: 'Текст первого поста',
    dateTime: new Date('2024-04-19 08:00:00'),
    countLikes: 8,
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
    title: 'Заголовок второго поста',
    text: 'Текст второго поста',
    dateTime: new Date('2024-04-18 12:00:00'),
    countLikes: 8,
  },
  {
    id: 3,
    firstName: 'Alice',
    lastName: 'Johnson',
    image: 'https://cdn.quasar.dev/img/parallax2.jpg',
    title: 'Заголовок третьего поста',
    text: 'Текст третьего поста',
    dateTime: new Date('2024-04-17 15:00:00'),
    countLikes: 8,
  },
];

const user = {
  id: 1,
  firstName: 'Пенис',
  lastName: 'Член',
  faculty: 'Институт математики и информационных технологий',
  department: 'ПОВТАС',
  stream: '23ИВТ',
  group: '23ИВТ(м)ИПО',
  profilePhoto: 'https://klev.club/uploads/posts/2023-10/1698733776_klev-club-p-kartinki-anime-devushki-milie-50.jpg',
  rating: 5,
  star: 8,
  achievements: {
    science: 30,
    sport: 3,
    creativity: 1,
    volunteering: 4,
  },
  publications: [
    { id: 1, photo: 'https://pibig.info/uploads/posts/2021-05/1619883100_21-pibig_info-p-milie-litsa-devushek-anime-krasivo-25.jpg', description: 'Хорошо посидел на паре у костина' },
    { id: 2, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSEixcrRsVodJfdmRXchaoFgPzwJjygI8zpw_LrvY11g&s', description: 'Описание публикации 2' },
    { id: 3, photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz7FUbTkc7Ybed__AkeK6G_acZfp-bfwKDezTr6R6vPbYlOBOrcQ_dfwY1cDprG4IMrno&usqp=CAU', description: 'Описание публикации 3' },
  ],
};

const route = useRoute();
const profile = ref<IUser>();
const avatarUrl = ref('');
const gallery = ref<IGalleryItem[]>([]);

const groups = ref({
  faculty: '',
  department: '',
  stream: '',
  group: '',
})
onBeforeMount(async () => {
  profile.value = await ProfileApiService.getProfileId(route.params.userId as string);
  const url = await FilesApiService.getFile(profile.value?.avatar_salt);
  avatarUrl.value = `data:image/png;base64,${url}`
  if (profile.value?.groups.length !== 0) {
    groups.value = {
      faculty: profile.value.groups[0].direction.department.faculty.fullname,
      department: profile.value.groups[0].direction.department.fullname,
      stream: profile.value.groups[0].direction.fullname,
      group: profile.value.groups[0].fullname,
    }
  }

  gallery.value = await ProfileApiService.getGalleryProfileId(route.params.userId as string)
  for (let i = 0; i < gallery.value.length; i++) {
    const url = await FilesApiService.getFile(gallery.value[i].content_salt)
    gallery.value[i].photo = `data:image/png;base64,${url}`
  }
  console.log(profile.value)
  console.log(gallery.value)
});
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.profile-page {
  &--title {
    display: flex;
    align-items: center;
    gap: 32px;
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;
    &__avatar {
      position: relative;
      &-star {
        position: absolute;
        top: -8px;
        right: -8px;
        &-count{
          font-size: 12px;
          position: absolute;
          top: -8px;
          right: -2px;
        }
      }
    }
    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: gray;
    }

    &__text {
      font-size: 28px;
      font-weight: 500;
      line-height: 36px;

      span {
        font-size: 14px;
        color: $dark;
        font-weight: 400;
        line-height: 20px;
      }
    }
  }

  &--achievements {
    padding-bottom: 60px;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    :deep(.q-item) {
      padding: 16px 32px;
    }
  }

  &--posts {
    padding-bottom: 60px;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    :deep(.q-item) {
      padding: 16px 32px;
    }
  }
}
</style>
