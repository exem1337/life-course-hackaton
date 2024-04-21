<template>
  <AppLoader v-if="isDataLoading" />
  <div
    v-else
    class="university-page page-wrapper"
  >
    <div class="university-page--title">
      <div class="university-page--title__image" />
      <input
        ref="fileInput"
        type="file"
        style="display: none"
        @change="attachFile"
      />
      <div class="university-page--title__text">
        {{ university?.fullname }} <br>
        <div class="university-page--title__text--inner">
          <span>Студентов: {{ studentsCount }}</span>
          <q-btn
            v-if="isUserOwnsTheUniversity"
            outline
            :loading="isAllStudentsLoading"
            @click="onOpenAllStudentsModal"
          >
            к студентам
            <q-icon name="person" />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="university-page--gallery">
      <div class="flex">
        <p>Галерея ВУЗа</p>
        <q-btn
          v-if="isUserOwnsTheUniversity"
          @click="onAttachFile"
        >
          Добавить фотографию
        </q-btn>
      </div>
      <EmptyBanner v-if="!images?.length">
        <template #title>Пока нет картинок</template>
      </EmptyBanner>
      <q-carousel
        v-else
        v-model="slide"
        animated
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          v-for="(image, index) in images"
          :key="index"
          :name="index"
          :img-src="image"
        />
      </q-carousel>
    </div>
    <div class="university-page--events">
      <div class="university-page--events__title">
        <p>Мероприятия</p>
        <q-btn
          v-if="isUserOwnsTheUniversity"
          @click="onCreateEvent"
        >
          Создать мероприятие
        </q-btn>
      </div>
      <EmptyBanner v-if="!events?.length">
        <template #title>Пока нет мероприятий</template>
        <template #description>{{ isUserOwnsTheUniversity ? 'Создайте свое мероприятие и формируйте список участников' : 'Следите за обновлениями' }}</template>
        <template #button>
          <q-btn
            v-if="isUserOwnsTheUniversity"
            class="bg-primary text-white"
          >
            Создать мероприятие
          </q-btn>
        </template>
      </EmptyBanner>
      <div
        v-else
        class="university-page--events__list"
      >
        <EventItem
          v-for="event in events"
          :key="event.id"
          :event="event"
        />
      </div>
    </div>
    <div class="university-page--faculties">
      <div class="flex">
        <p>Факультеты</p>
        <q-btn
          v-if="isUserOwnsTheUniversity"
          round
          color="primary"
          size="10px"
          icon="add"
          @click.stop="onAddFaculty"
        />
      </div>
      <EmptyBanner v-if="!university?.faculties?.length">
        <template #title>Пока нет факультетов</template>
        <template #description>Добавьте факультеты <br> Заполните информацию о кафедрах, потоках, группах</template>
        <template #button>
          <q-btn
            v-if="isUserOwnsTheUniversity"
            class="bg-primary text-white"
            @click="onAddFaculty"
          >
            Добавить факультет
          </q-btn>
        </template>
      </EmptyBanner>
      <q-list
        v-else
        v-for="faculty in university?.faculties"
        :key="faculty.id"
        bordered
        expand-separator
        class="rounded-borders q-mt-md"
      >
        <q-expansion-item
          expand-separator
          default-opened
          :header-inset-level="1"
          :content-inset-level="0"
        >
          <template v-slot:header>
            <q-item-section>
              {{ faculty.fullname }}
            </q-item-section>
            <q-item-section>
              <div class="row items-center justify-end">
                <q-btn
                  v-if="isUserOwnsTheUniversity"
                  class="q-mr-md"
                  round
                  color="primary"
                  size="10px"
                  icon="edit"
                  @click="onFacultyEdit(faculty.id, faculty.fullname)"
                />
                <q-btn
                  v-if="isUserOwnsTheUniversity"
                  round
                  color="primary"
                  size="10px"
                  icon="delete"
                  @click.stop="onFacultyDelete(faculty.id)"
                />
              </div>
            </q-item-section>
          </template>
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            label="Кафедры"
            icon="cases"
            default-opened
          >
            <template v-slot:header>
              <q-item-section class="university-page--faculties__departments">
                <q-icon
                  class="q-mr-md"
                  name="cases"
                  size="25px"
                />
                Кафедры
              </q-item-section>
              <q-item-section>
                <div class="row items-center justify-end">
                  <q-btn
                    v-if="isUserOwnsTheUniversity"
                    round
                    color="primary"
                    size="10px"
                    icon="add"
                    @click.stop="onAddDepartment(faculty.id)"
                  />
                </div>
              </q-item-section>
            </template>
            <q-expansion-item
              v-for="department in faculty.departments"
              :key="department.id"
              switch-toggle-side
              dense-toggle
              :header-inset-level="1"
              :content-inset-level="2"
            >
              <template v-slot:header>
                <q-item-section>
                  {{ department.fullname }}
                </q-item-section>
                <q-item-section>
                  <div
                    class="row items-center justify-end"
                    style="padding-right: 40px"
                  >
                    <q-btn
                      v-if="isUserOwnsTheUniversity"
                      class="q-mr-md"
                      round
                      color="primary"
                      size="10px"
                      icon="edit"
                      @click.stop="onEditDepartment(department.id, department.fullname)"
                    />
                    <q-btn
                      v-if="isUserOwnsTheUniversity"
                      round
                      color="primary"
                      size="10px"
                      icon="delete"
                      @click.stop="onDeleteDepartment(department.id)"
                    />
                  </div>
                </q-item-section>
              </template>
              <q-expansion-item
                :header-inset-level="0"
                expand-separator
                default-opened
              >
                <template v-slot:header>
                  <q-item-section class="university-page--faculties__departments">
                    <q-icon
                      class="q-mr-md"
                      name="stream"
                      size="25px"
                    />
                    Потоки
                  </q-item-section>
                  <q-item-section>
                    <div class="row items-center justify-end">
                      <q-btn
                        v-if="isUserOwnsTheUniversity"
                        round
                        color="primary"
                        size="10px"
                        icon="add"
                        @click.stop="onAddDirection(department.id)"
                      />
                    </div>
                  </q-item-section>
                </template>
                <q-expansion-item
                  v-for="directions in department.directions"
                  :key="directions.id"
                  switch-toggle-side
                  dense-toggle
                  :header-inset-level="0"
                  :content-inset-level="0"
                >
                  <template v-slot:header>
                    <q-item-section>
                      {{ directions.fullname }}
                    </q-item-section>
                    <q-item-section>
                      <div
                        class="row items-center justify-end"
                        style="padding-right: 40px"
                      >
                        <q-btn
                          v-if="isUserOwnsTheUniversity"
                          class="q-mr-md"
                          round
                          color="primary"
                          size="10px"
                          icon="edit"
                          @click.stop="onEditDirection(directions.id, directions.fullname)"
                        />
                        <q-btn
                          v-if="isUserOwnsTheUniversity"
                          round
                          color="primary"
                          size="10px"
                          icon="delete"
                          @click.stop="onDeleteDirection(directions.id)"
                        />
                      </div>
                    </q-item-section>
                  </template>
                  <q-expansion-item
                    :header-inset-level="1"
                    expand-separator
                    default-opened
                  >
                    <template v-slot:header>
                      <q-item-section class="university-page--faculties__departments">
                        <q-icon
                          class="q-mr-md"
                          name="group"
                          size="25px"
                        />
                        Группы
                      </q-item-section>
                      <q-item-section>
                        <div class="row items-center justify-end">
                          <q-btn
                            v-if="isUserOwnsTheUniversity"
                            round
                            color="primary"
                            size="10px"
                            icon="add"
                            @click.stop="onAddGroup(directions.id)"
                          />
                        </div>
                      </q-item-section>
                    </template>
                    <q-expansion-item
                      v-for="group in directions.groups"
                      :key="group.id"
                      hide-expand-icon
                      switch-toggle-side
                      dense-toggle
                      :header-inset-level="2"
                      :content-inset-level="3"
                    >
                      <template v-slot:header>
                        <q-item-section>
                          {{ group.fullname }}
                        </q-item-section>
                        <q-item-section>
                          <div
                            class="row items-center justify-end"
                            style="padding-right: 40px"
                          >
                            <q-btn
                              v-if="isUserOwnsTheUniversity"
                              class="q-mr-md"
                              round
                              color="primary"
                              size="10px"
                              icon="edit"
                              @click.stop="onEditGroup(group.id, group.fullname)"
                            />
                            <q-btn
                              v-if="isUserOwnsTheUniversity"
                              round
                              color="primary"
                              size="10px"
                              icon="delete"
                              @click.stop="onDeleteGroup(group.id)"
                            />
                          </div>
                        </q-item-section>
                      </template>
                    </q-expansion-item>
                  </q-expansion-item>
                </q-expansion-item>
              </q-expansion-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router';
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service';
import { ICreateDirection, IUniversity, IUniversityStudent } from 'src/models/university.model'
import EmptyBanner from 'components/EmptyBanner.vue'
import ModalManager from 'src/services/base/modalManager.service'
import DictionaryEditModal from 'components/modals/base/DictionaryEditModal.vue'
import ConfirmModal from 'components/modals/base/ConfirmModal.vue'
import CreateDirectionModal from 'components/modals/CreateDirectionModal.vue'
import UniversityStudentsModal from 'components/modals/UniversityStudentsModal.vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { useUserStore } from 'stores/user'
import { IEvent } from 'src/models/event.model'
import EventItem from 'components/EventItem.vue'
import EventCreateModal from 'components/modals/EventCreateModal.vue'
import { FileService } from 'src/services/base/file.service'
import { ProfileApiService } from 'src/services/api/profileApi.service'
import AppLoader from 'components/AppLoader.vue'

const route = useRoute();
const slide = ref<number>(1);
const studentsCount = ref<number>();
const university = ref<IUniversity>();
const autoplay = ref<boolean>(true);
const store = useUserStore();
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const universityStudents = ref<Array<IUniversityStudent>>([]);
const isAllStudentsLoading = ref<boolean>(false);
const isUserOwnsTheUniversity = computed<boolean>(() => !!store.adminUniversity?.id && store.adminUniversity?.id === university.value?.id);
const events = ref<Array<IEvent>>([]);
const fileInput = ref<HTMLInputElement>();
const images = ref<Array<string>>([]);
const isDataLoading = ref<boolean>(false);

async function onCreateEvent(): Promise<void> {
  await modalManager?.openAsyncModal<typeof EventCreateModal, boolean>(EventCreateModal, {
    attrs: {
      universityId: university.value?.id || 0,
    },
  }).then(async (res) => !!res && await loadData());
}

async function onOpenAllStudentsModal(): Promise<void> {
  await modalManager?.openAsyncModal(UniversityStudentsModal, {
    attrs: {
      universityName: university.value?.fullname,
      students: universityStudents.value || [],
    },
  });
}

async function onAddFaculty(): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Добавить факультет',
      text: '',
    },
  }).then(async (res) => {
    await LocalitiesApiService.createFaculty(university.value?.id || 0, res as string);
    await loadData();
  });
}

async function onEditDepartment(departmentId: number, departmentName: string): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Редактировать кафедру',
      text: departmentName,
    },
  }).then(async (res) => {
    await LocalitiesApiService.editDepartment(departmentId, res as string);
    await loadData();
  });
}

async function onAddDepartment(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Добавить кафедру',
      text: '',
    },
  }).then(async (res) => {
    await LocalitiesApiService.createDepartment(id, res as string);
    await loadData();
  });
}

async function onDeleteDepartment(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof ConfirmModal, boolean>(ConfirmModal, {
    attrs: {
      title: 'Вы точно хотите удалить кафедру?',
      description: 'После этого, данные о кафедре будут удалены. Действие необратимо',
      okButtonText: 'Удалить',
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await LocalitiesApiService.deleteDepartment(id);
    await loadData();
  });
}

async function onEditDirection(id: number, name: string): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Редактировать поток',
      text: name,
    },
  }).then(async (res) => {
    await LocalitiesApiService.editDirection(id, res as string);
    await loadData();
  });
}

async function onAddDirection(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof CreateDirectionModal, ICreateDirection>(CreateDirectionModal, {
    attrs: {
      departmentId: id,
    },
  }).then(async (res) => {
    await LocalitiesApiService.createDirection(res as ICreateDirection);
    await loadData();
  });
}

async function onDeleteDirection(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof ConfirmModal, boolean>(ConfirmModal, {
    attrs: {
      title: 'Вы точно хотите удалить поток?',
      description: 'После этого, данные о потоке будут удалены. Действие необратимо',
      okButtonText: 'Удалить',
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await LocalitiesApiService.deleteDirection(id);
    await loadData();
  });
}

async function onFacultyEdit(id: number, name: string): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Редактировать факультет',
      text: name,
    },
  }).then(async (res) => {
    await LocalitiesApiService.editFaculty(id, res as string);
    await loadData();
  });
}

async function onFacultyDelete(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof ConfirmModal, boolean>(ConfirmModal, {
    attrs: {
      title: 'Вы точно хотите удалить факультет?',
      description: 'После этого, данные о факультете будут удалены. Действие необратимо',
      okButtonText: 'Удалить',
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await LocalitiesApiService.deleteFaculty(id);
    await loadData();
  });
}

async function onEditGroup(id: number, name: string): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Редактировать группу',
      text: name,
    },
  }).then(async (res) => {
    await LocalitiesApiService.editGroup(id, res as string);
    await loadData();
  });
}

async function onAddGroup(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof DictionaryEditModal, string>(DictionaryEditModal, {
    attrs: {
      title: 'Добавить группу',
      text: '',
    },
  }).then(async (res) => {
    await LocalitiesApiService.createGroup(id, res as string);
    await loadData();
  });
}

async function onDeleteGroup(id: number): Promise<void> {
  await modalManager?.openAsyncModal<typeof ConfirmModal, boolean>(ConfirmModal, {
    attrs: {
      title: 'Вы точно хотите удалить группу?',
      description: 'После этого, данные о группе будут удалены. Действие необратимо',
      okButtonText: 'Удалить',
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await LocalitiesApiService.deleteGroup(id);
    await loadData();
  });
}

async function attachFile(event: Event): Promise<void> {
  const target = event.target as HTMLInputElement;

  if (!target.files?.length) {
    return;
  }

  const salt = await FileService.uploadFile([target.files[0]]);
  await ProfileApiService.addUniversityImage(salt, university.value?.id || 0);
  await loadData();
}

function onAttachFile(): void {
  fileInput.value?.click();
}

async function loadData(useLoader = false): Promise<void> {
  if (useLoader) {
    isDataLoading.value = true;
  }

  const universityId = Number(route.params.universityId);
  university.value = await LocalitiesApiService.loadUniversity(universityId);
  studentsCount.value = await LocalitiesApiService.getCountStudentsInLocalitiesId(universityId) || 0;
  events.value = await LocalitiesApiService.getEvents({
    fields: {
      university_id: {
        operator: 'eq',
        value: [universityId],
      },
    },
    includes: [
      {
        association: 'participants',
      },
    ],
  });
  images.value = await LocalitiesApiService.loadUniversityImages(universityId);
  await wrapLoader(isAllStudentsLoading, async () => {
    universityStudents.value = await LocalitiesApiService.loadUniversityStudents(universityId);
  });

  isDataLoading.value = false;
}

onBeforeMount(async () => {
  await loadData(true);
});
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.university-page {
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &--title {
    display: flex;
    align-items: center;
    gap: 32px;
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;

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

      &--inner {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 16px;

        span {
          font-size: 14px;
          color: $dark;
          font-weight: 400;
          line-height: 20px;
        }

        .q-btn {
          :deep(.q-btn__content) {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }

  &--events {
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    &__list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  &--gallery {
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .q-carousel {
      border-radius: 8px;
    }
  }

  &--faculties {
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

    &__departments{
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
