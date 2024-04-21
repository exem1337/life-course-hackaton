<template>
  <div class="offer-page page-wrapper">
    <BaseWrapper v-if="!isLoading && offer">
      <template #headerText> <h4>Вакансия</h4>  </template>
      <template #headerIcons>
        <div v-if="offer.organization.owner_id === store.user?.id">
          <q-btn
            size="md"
            class="q-mr-md"
            color="primary"
            round
            icon="edit"
            @click="onEditOffer"
          />
          <q-btn
            size="md"
            color="primary"
            round
            icon="delete"
            @click="onDeleteOffer"
          />
        </div>
        <q-btn
          :disable="offer.organization.owner_id !== store.user?.id"
          :label='"Откликнулось " + offer?.users?.length'
          color="primary"
          @click="onOpenAllStudentsModal"
        />
        <q-btn
          v-if="store.getRole === EUserRole.User"
          v-model="isClicked"
          flat
          color="primary"
          :disable="isButtonDisabled"
          @click="respondOffer"
        >
          {{ isButtonDisabled ? "Вы откликнулись" : "Откликнуться" }}
        </q-btn>
      </template>
      <template #content>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-h5 q-mt-sm q-mb-xs">{{ offer?.header }}</div>
              <div class="text-caption text-grey">
                {{ formatPersonName(offer?.author?.first_name,  offer?.author?.last_name, offer?.author?.middle_name) }}
              </div>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn
              style="pointer-events: none"
              flat
              round
              icon="event"
              class="offer-icon"
            />
            <q-btn
              style="pointer-events: none"
              flat
              class="offer-icon"
            >
              {{ formatDate({ date: new Date(offer?.createdAt)},{}) }}
            </q-btn>
          </q-card-actions>
        </div>
        <div class="offer-decription">{{ offer?.description }}</div>
      </template>
    </BaseWrapper>
    <AppLoader v-else />
  </div>
</template>

<script lang="ts" setup>
import { IOffer } from 'src/models/offer.model';
import { formatPersonName } from 'src/utils/nameFormat.util';
import { formatDate } from 'src/utils/formatDate'
import BaseWrapper from 'src/components/BaseWrapper.vue';
import { computed, inject, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { OfferApiService } from 'src/services/api/offerApi.service';
import { useUserStore } from 'src/stores/user';
import { wrapLoader } from 'src/utils/loaderWrapper.util';
import AppLoader from 'src/components/AppLoader.vue'
import { EUserRole } from 'src/enums/userTypes.enum';
import ModalManager from 'src/services/base/modalManager.service';
import OfferListStudents from 'components/modals/OfferListStudents.vue';
import EditOfferModal from 'components/modals/EditOfferModal.vue'
import ConfirmModal from 'components/modals/base/ConfirmModal.vue'

const offer = ref<IOffer>()
const route = useRoute();
const store = useUserStore();
const isClicked = false;
const isLoading = ref(false);
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const isButtonDisabled = computed(() => !!offer.value?.users?.find((user) => user.id === store.user?.id))

async function onOpenAllStudentsModal(): Promise<void> {
  await modalManager?.openAsyncModal(OfferListStudents, {
    attrs: {
      title: 'Список откликов студентов',
      students: offer.value?.users,
    },
  });
}

async function onEditOffer(): Promise<void> {
  await modalManager?.openAsyncModal<typeof EditOfferModal, { header: string, description: string }>(EditOfferModal, {
    attrs: {
      header: offer.value?.header,
      description: offer.value?.description,
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await OfferApiService.editOffer(offer.value?.id || 0, res);
    await loadData();
  });
}

async function onDeleteOffer(): Promise<void> {
  await modalManager?.openAsyncModal(ConfirmModal, {
    attrs: {
      title: 'Вы точно хотите удалить вакансию?',
      description: 'Действие необратимо',
    },
  }).then(async (res) => {
    if (!res) {
      return;
    }

    await OfferApiService.deleteOffer(offer.value?.id || 0);
    await loadData();
  })
}

async function respondOffer() {
  await wrapLoader(isLoading, async () => {
    await OfferApiService.responseOffer(offer.value?.id || 0, store.user?.id)
    offer.value = await OfferApiService.loadOneOffer(+route.params.id)
  })
}

async function loadData() {
  await wrapLoader(isLoading, async () => {
    offer.value = await OfferApiService.loadOneOffer(+route.params.id);
  });
}

onBeforeMount(async () => {
  await loadData();
})
</script>

<style lang="scss" scoped>
.row, .column, .flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
p{
  font-size: 14px;
  margin-bottom: 0;
}
h4{
  margin: 0;
}
</style>
