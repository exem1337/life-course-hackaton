<template>
  <div
    v-if="!!organization"
    class="organization page-wrapper"
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
            src=""
            alt="Профиль"
          />
        </q-avatar>
        <div
          v-if="false"
          class="profile-page--title__avatar-edit"
        >
          <q-btn
            round
            size="lg"
            icon="edit"
            flat
            @click=""
          />
          <input
            ref="fileInputAvatar"
            type="file"
            style="display: none"
            @change=""
          />
        </div>
      </div>
      <div class="profile-page--title__text">
        {{ (organization as IOrganization)?.name }}<br>
      </div>
      <div
        v-if="true"
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
    <BaseWrapper>
      <template #headerText>
        Описание организации
      </template>
      <template #headerIcons>
        <q-btn
          round
          size="md"
          icon="edit"
          flat
          @click=""
        />
      </template>
      <template #content>
        {{ (organization as IOrganization)?.description }}
      </template>
    </BaseWrapper>
    <OfferCard :offers="(organization as IOrganization)?.vacancies">
      <template #headerIcons>
        <q-btn
          round
          size="md"
          icon="add"
          flat
          @click="onAddOffer"
        />
      </template>
    </OfferCard>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { IOrganization } from 'src/models/region.model'
import { inject, onBeforeMount, ref } from 'vue'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'
import BaseWrapper from 'components/BaseWrapper.vue'
import OfferCard from 'components/OfferCard.vue'
import ModalManager from 'src/services/base/modalManager.service'
import CreateVacancyModal from 'components/modals/CreateVacancyModal.vue'

const route = useRoute();
const organization = ref<IOrganization>();
const organizationId = route.params.id;
const modalManager = inject<ModalManager>(ModalManager.getServiceName());

async function loadData() {
  organization.value = await LocalitiesApiService.loadOrganizaiton(+organizationId);
}

async function onAddOffer() {
  await modalManager?.openAsyncModal(CreateVacancyModal, {
    attrs: {
      organizationId,
      localityId: organization.value?.locality_id,
    },
  }).then(async (res) => !!res && await loadData());
}

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

        &-count {
          font-size: 12px;
          position: absolute;
          top: -8px;
          right: -2px;
        }
      }

      &-edit {
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

        :deep(.q-btn) {
          color: $primary;
          width: 100%;

          &:hover {
            > .q-focus-helper {
              background-color: transparent;

              &:after {
                background: transparent;
              }
            }
          }
        }

        &:hover {
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
}
</style>
