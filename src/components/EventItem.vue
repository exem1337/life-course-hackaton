<template>
  <q-card
    dark
    bordered
    class="bg-secondary my-card"
  >
    <div class="flex">
      <q-card-section class="text-dark">
        <div class="text-h6">{{ event.name }}</div>
        <div class="text-subtitle2">Организатор: <span @click="onGoToUniversity">{{ university?.fullname }}</span></div>
      </q-card-section>
      <q-btn
        v-if="store.getRole === EUserRole.User"
        class="bg-primary text-white"
        :loading="isLoading"
        :disable="isUserAppeals"
        @click="onAppeal"
      >
        {{ isUserAppeals ? 'Вы участвуете' : 'Участвовать' }}
      </q-btn>
    </div>

    <q-separator
      dark
      inset
    />

    <q-card-section class="text-dark">
      {{ event.description }}
    </q-card-section>

    <q-list v-if="isShowUsers">
      <q-item
        v-for="student in event.participants"
        :key="student.id"
        class="students--item"
      >
        <q-item-section avatar>
          <AvatarComponent :salt="student.avatar_salt" />
        </q-item-section>

        <q-item-section>
          <div class="flex">
            <div>
              <q-item-label class="text-dark">{{ formatPersonName(student.first_name, student.last_name, student.middle_name) }}</q-item-label>
              <q-item-label
                caption
                class="text-dark"
              >
                Рейтинг: {{ student.rating }} Статус заявки: {{ student.Appeal?.status }}
              </q-item-label>
            </div>
            <q-btn
              v-if="student.Appeal?.status === EAppealStatus.New && !isAppealAccepted"
              class="bg-primary text-white"
              :loading="isLoading"
              @click="onAcceptAppeal(student.Appeal?.id || 0)"
            >
              Подтвердить участие
            </q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script lang="ts" setup>
import { IEvent } from 'src/models/event.model'
import { computed, onBeforeMount, ref } from 'vue'
import { IUniversity } from 'src/models/university.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import { useRouter } from 'vue-router'
import { wrapLoader } from 'src/utils/loaderWrapper.util'
import { useUserStore } from 'stores/user'
import { EUserRole } from 'src/enums/userTypes.enum'
import { IUser } from 'src/models/user.model'
import { formatPersonName } from 'src/utils/nameFormat.util'
import AvatarComponent from 'components/AvatarComponent.vue'
import { EAppealStatus } from 'src/enums/appealStatus.enum'

const university = ref<IUniversity>();

const props = defineProps<{
  event: IEvent;
}>();
const router = useRouter()
const isLoading = ref<boolean>(false);
const store = useUserStore();
const isUserAppeals = ref<boolean>(!!props.event?.participants?.find((user: IUser) => user.id === store.user?.id));
const isShowUsers = computed<boolean>(() => props.event.university_id === university.value?.id && store.adminUniversity?.id === props.event.university_id)
const isAppealAccepted = ref<boolean>(false);

async function onAppeal(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await LocalitiesApiService.appealToEvent(props.event.id);
    isUserAppeals.value = true;
  });
}

async function onAcceptAppeal(id: number): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await LocalitiesApiService.acceptEventAppeal(id);
  })
}

function onGoToUniversity(): void {
  router.push(`/university/${university.value?.id}`);
}

onBeforeMount(async () => {
  university.value = await LocalitiesApiService.loadUniversity(props.event.university_id);
});
</script>

<style lang="scss" scoped>
span {
  cursor: pointer;
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .q-btn {
    margin-top: 16px;
    margin-right: 16px;
  }
}

.text-h6 {
  font-weight: 500;
}
</style>
