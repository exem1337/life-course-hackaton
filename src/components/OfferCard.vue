<template>
  <div class="offer-card page-wrapper">
    <BaseWrapper>
      <template #headerText>Вакансии</template>
      <template #headerIcons>
        <slot name="headerIcons" />
      </template>
      <template #content>
        <EmptyBanner v-if="!offers?.length">
          <template #title>Пока нет вакансий</template>
          <template #description>Создавайте вакансии вашей организации <br> и просматривайте списки откликнувшихся студентов</template>
        </EmptyBanner>
        <div
          v-else
          v-for="offer in offers"
          :key="offer.id"
          class="q-px-md q-py-sm row items-start q-gutter-md"
          @click="onOfferClick(offer.id)"
        >
          <q-card
            class="my-card"
            flat
            bordered
          >
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">{{ offer?.header }}</div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions class="justify-between">
              <div>
                <q-btn
                  flat
                  round
                  icon="event"
                  class="offer-icon"
                />
                <q-btn
                  flat
                  class="offer-icon"
                >
                  {{ formatDate({ date: new Date(offer.createdAt)},{}) }}
                </q-btn>
              </div>
              <div>
                Откликнулось: {{ offer.users?.length }}
                <q-icon
                  name="person"
                  size="25px"
                />
              </div>
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </BaseWrapper>
  </div>
</template>

<script lang="ts" setup>
import { IOffer } from 'src/models/offer.model';
import { formatDate } from 'src/utils/formatDate'
import BaseWrapper from './BaseWrapper.vue';
import { useRouter } from 'vue-router';
import EmptyBanner from 'components/EmptyBanner.vue'
const router = useRouter();

defineProps<{
  offers: Array<IOffer>
}>()

function onOfferClick(offerID: number) {
  console.log(offerID);
  router.push(`/offers/${offerID}`);
}
</script>

<style lang="scss" scoped>
.my-card{
  width: 100%;
  cursor: pointer;

}
:deep(.offer-icon){
  pointer-events: none;
}
</style>
