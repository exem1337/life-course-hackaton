<template>
  <AppLoader v-if="isDataLoading" />
  <div
    v-else
    class="profile-page page-wrapper"
  >
    <div class="profile-page--title">
      <div class="profile-page--title__avatar">
        <q-avatar
          size="100px"
          class="overflow-auto"
        >
          <q-img
            style="height: 100%"
            fit="cover"
            :src="avatarUrl"
            alt="Профиль"
          />
        </q-avatar>
        <div
          v-if="store.getRole === EUserRole.User"
          class="profile-page--title__avatar-star"
        >
          <div class="profile-page--title__avatar-star-count">
            x{{ profile?.rating }}
          </div>
          <q-icon
            size="30px"
            color="yellow-9"
            name="star"
            @click=""
          />
        </div>
        <div
          v-if="store.user?.id === profile?.id"
          class="profile-page--title__avatar-edit"
        >
          <q-btn
            round
            size="lg"
            icon="edit"
            flat
            @click="onAttachFileAvatar"
          />
          <input
            ref="fileInputAvatar"
            type="file"
            style="display: none"
            @change="editImageProfile"
          />
        </div>
      </div>
      <div class="profile-page--title__text">
        {{ profile?.first_name }} {{ profile?.last_name }} <br>
        <div v-if="role !== EUserRole.Employer">
          <q-list separator>
            <q-item class="q-pl-none q-pb-none">
              <q-item-section>
                <q-item-label
                  class="rout"
                  caption
                >
                  ВУЗ:
                  <router-link
                    class="router-link"
                    :to="/university/ + `${adminUniversity?.id || groups.universityId}`"
                  >
                    {{ adminUniversity?.fullname || groups.university }}
                  </router-link>
                </q-item-label>
                <q-item-label
                  v-if="store.getRole === EUserRole.Employer"
                  class="row"
                  caption
                >
                  Владелец организации
                </q-item-label>
                <q-item-label
                  v-if="adminUniversity?.id"
                  class="row"
                  caption
                >
                  Администратор ВУЗа
                </q-item-label>
                <q-item-label
                  v-if="!adminUniversity?.id"
                  class="row"
                  caption
                >
                  Факультет: <div class="router-link--no-href">{{ groups.faculty }}</div>
                </q-item-label>
                <q-item-label
                  v-if="!adminUniversity?.id"
                  class="row"
                  caption
                >
                  Кафедра: <div class="router-link--no-href">{{ groups.department }}</div>
                </q-item-label>
                <q-item-label
                  v-if="!adminUniversity?.id"
                  class="row"
                  caption
                >
                  Поток: <div class="router-link--no-href">{{ groups.stream }}</div>
                </q-item-label>
                <q-item-label
                  v-if="!adminUniversity?.id"
                  class="row"
                  caption
                >
                  Группа: <div class="router-link--no-href">{{ groups.group }}</div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div
        v-if="store.user?.id === profile?.id"
        class="profile-page--title__right-panel q-ml-auto q-mb-auto"
      >
        <q-btn
          round
          size="10px"
          color="primary"
          @click=""
        >
          <q-icon
            size="20px"
            name="edit"
          />
        </q-btn>
      </div>
    </div>
    <div v-if="role !== EUserRole.Employer">
      <GalleryComponent
        :images="gallery"
        class="q-mb-md"
      >
        <template #header>
          <p>Галерея</p>
        </template>
        <template #footer>
          <q-btn
            v-if="(profile as IUser)?.id === store.user?.id"
            size="md"
            icon="add_a_photo"
            color="primary"
            label="Загрузить фото"
            no-caps
            class="q-mr-sm"
            @click="onAttachFile"
          />
          <input
            ref="fileInput"
            type="file"
            style="display: none"
            @change="attachFile"
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
    <div
      v-if="!adminUniversity?.id && role !== EUserRole.Employer"
      class="profile-page--achievements"
    >
      <p>Достижения</p>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          icon="science"
          label="Достижения в науке"
          :caption="'x'"
        >
          <q-card>
            <q-card-section>
              <q-card
                v-for="ach in getAchievements(PostSectionEnum.Science)"
                :key="ach.createdAt"
              >
                {{ ach.event.name }}
              </q-card>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="fitness_center"
          label="Достижения в спорте"
          :caption="'x'"
        >
          <q-card>
            <q-card-section>
              <q-card
                v-for="ach in getAchievements(PostSectionEnum.Sport)"
                :key="ach.createdAt"
              >
                {{ ach.event.name }}
              </q-card>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="palette"
          label="Достижения в творчестве"
          :caption="'x'"
        >
          <q-card>
            <q-card-section>
              <q-card
                v-for="ach in getAchievements(PostSectionEnum.Creation)"
                :key="ach.createdAt"
              >
                {{ ach.event.name }}
              </q-card>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          icon="volunteer_activism"
          label="Достижения в волонтерстве"
          :caption="'x'"
        >
          <q-card>
            <q-card-section>
              <q-card
                v-for="ach in getAchievements(PostSectionEnum.Volunteering)"
                :key="ach.createdAt"
              >
                {{ ach.event.name }}
              </q-card>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
    <div
      v-if="role !== EUserRole.Employer"
      class="profile-page--posts"
    >
      <p>Посты</p>
      <EmptyBanner v-if="!userPosts?.length">
        <template #title>
          Постов нет
        </template>
        <template #button>
          <q-btn
            v-if="isUserProfile"
            class="bg-white text-dark"
            @click="onAddNewsModal"
          >
            Создать пост
          </q-btn>
        </template>
      </EmptyBanner>
      <PostComponent
        v-for="post in userPosts"
        :key="post.id"
        :post="post"
        :deletable="isUserProfile"
        class="q-mb-xl"
        @delete="loadData"
      />
    </div>
    <EmptyBanner v-if="role === EUserRole.Employer">
      <template #title>
        {{ (profile as IUser)?.organization?.name }}
      </template>
      <template #description>
        {{ (profile as IUser)?.organization?.description }}
      </template>
      <template #button>
        <q-btn
          class="bg-primary text-white"
          @click="onGoToOrganization"
        >
          Перейти в профиль организации
        </q-btn>
      </template>
    </EmptyBanner>
  </div>
</template>

<script lang="ts" setup>
import GalleryComponent from 'components/profile/GalleryComponent.vue'
import PostComponent from 'components/profile/PostComponent.vue'
import { IPost } from 'src/models/profile/post.model'
import { useRoute, useRouter } from 'vue-router'
import { computed, inject, onBeforeMount, ref, watch } from 'vue'
import { IStudentAchievement, IUser } from 'src/models/user.model'
import { ProfileApiService } from 'src/services/api/profileApi.service'
import { FilesApiService } from 'src/services/api/filesApi.service'
import { IGalleryItem } from 'src/models/profile/galleryImage.model'
import GalleryAllModal from 'components/profile/GalleryAllModal.vue'
import ModalManager from 'src/services/base/modalManager.service'
import { useUserStore } from 'stores/user'
import { FileService } from 'src/services/base/file.service'
import { PostsApiService } from 'src/services/api/postsApi.service'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import AppLoader from 'components/AppLoader.vue'
import EmptyBanner from 'components/EmptyBanner.vue'
import AddPostModal from 'components/modals/AddPostModal.vue'
import { EUserRole } from 'src/enums/userTypes.enum'
import { IUniversity } from 'src/models/university.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import { PostSectionEnum } from 'src/enums/postSection.enum'

const modalManager = inject<ModalManager>(ModalManager.getServiceName());

function onOpenLoginModal(): void {
  modalManager?.openAsyncModal(GalleryAllModal, {
    attrs: {
      images: gallery.value,
    },
  });
}

const store = useUserStore();
const route = useRoute();
const profile = ref<IUser>();
const role = ref<string>('');
const avatarUrl = ref('');
const gallery = ref<IGalleryItem[]>([]);
const userPosts = ref<Array<IPost>>([]);
const isDataLoading = ref<boolean>(false);
const isUserProfile = computed<boolean>(() => profile.value?.id === store.user?.id);
const adminUniversity = ref<IUniversity>();
const router = useRouter()

const groups = ref({
  universityId: '',
  university: '',
  faculty: '',
  department: '',
  stream: '',
  group: '',
})
const fileInput = ref<HTMLInputElement>();
const fileInputAvatar = ref<HTMLInputElement>();

function getAchievements(type: PostSectionEnum): Array<IStudentAchievement> {
  return profile.value?.achievements?.filter((ach) => ach.event?.section === type) || [];
}

function onGoToOrganization() {
  router.push(`/organizations/${(profile.value as IUser).organization?.id}`);
}

function onAttachFile(): void {
  fileInput.value?.click();
}
function onAttachFileAvatar(): void {
  fileInputAvatar.value?.click();
}
function onAddNewsModal(): void {
  modalManager?.openAsyncModal<typeof AddPostModal, boolean>(AddPostModal).then(async (res) => !!res && await loadData());
}

async function attachFile(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const salt = await FileService.uploadFile([target.files[0]]);
  await ProfileApiService.uploadProfileImage(salt, store.user?.id);
  await loadData();
}

async function editImageProfile(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const salt = await FileService.uploadFile([target.files[0]]);
  await ProfileApiService.editProfileAvatar(salt, store.user?.id);
  await loadData();
  const url = await FilesApiService.getFile(salt);
  store.setAvatar(url);
}

async function loadData(): Promise<void> {
  await wrapLoader(isDataLoading, async () => {
    profile.value = await ProfileApiService.getProfileId(route.params.userId as string);
    userPosts.value = await PostsApiService.loadUserPosts(Number(route.params.userId));
    const url = await FilesApiService.getFile(profile.value?.avatar_salt);

    if (profile.value.roles?.[0].name === EUserRole.Admin) {
      adminUniversity.value = await LocalitiesApiService.getAdminUniversity(profile.value?.id);
    }

    avatarUrl.value = `data:image/png;base64,${url}`
    if (profile.value?.groups.length !== 0) {
      groups.value = {
        universityId: profile.value.groups[0].direction.department.faculty.university.id.toString(),
        university: profile.value.groups[0].direction.department.faculty.university.fullname,
        faculty: profile.value.groups[0].direction.department.faculty.fullname,
        department: profile.value.groups[0].direction.department.fullname,
        stream: profile.value.groups[0].direction.fullname,
        group: profile.value.groups[0].fullname,
      }
    }
    if (profile.value?.roles.length !== 0) {
      role.value = profile.value.roles[0].name
    }
    gallery.value = await ProfileApiService.getGalleryProfileId(route.params.userId as string)
    for (let i = 0; i < gallery.value.length; i++) {
      const url = await FilesApiService.getFile(gallery.value[i].content_salt);
      gallery.value[i].photo = `data:image/png;base64,${url}`;
    }
  })
}

watch(
  () => route.params.userId,
  async () => {
    await loadData();
  },
);

onBeforeMount(async () => {
  await loadData();
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
      &-edit{
        position: absolute;
        cursor: pointer;
        display: flex;
        overflow: hidden;
        border-radius: 50%;
        opacity: 0;
        justify-content: center;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        transition: background-color 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), opacity 0.6s cubic-bezier(0.25, 0.8, 0.5, 1);

        :deep(.q-btn){
          color: $primary;
          width: 100%;
          &:hover{
            >.q-focus-helper{
              background-color: transparent;
              &:after{
                background: transparent;
              }
            }
          }
        }
        &:hover{
          opacity: 1;
          background-color: rgba(230, 230, 230, 0.26);
          backdrop-filter: blur(5px);
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
.router-link{
  color: #1D1D1D;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 600;
  transition: 0.3s;
  &:hover{
    color: #1976D2;
  }
}

.router-link--no-href{
  margin-left: 8px;
  color: #1D1D1D;
  text-decoration: none;
}

.rout{
  margin-bottom: 8px;
  font-size: 16px;
}
</style>
