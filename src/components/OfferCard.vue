<template>
  <div class="offer-card page-wrapper">
    <BaseWrapper>
      <template #headerText>Вакансии</template>
      <template #content>
        <div class="q-pa-md row items-start q-gutter-md">
          <q-card
            class="my-card"
            flat
            bordered
          >
            <q-card-section horizontal>
              <q-card-section class="q-pt-xs">
                <div class="text-h5 q-mt-sm q-mb-xs">{{ offer?.header }}</div>
                <div class="text-caption text-grey">
                  {{ formatPersonName(offer.author.first_name,  offer.author.last_name, offer.author.middle_name) }}
                </div>
              </q-card-section>
            </q-card-section>

            <q-separator />

            <q-card-actions>
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
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </BaseWrapper>
  </div>
</template>

<script lang="ts" setup>
import { IOffer } from 'src/models/offer.model';
import { formatPersonName } from 'src/utils/nameFormat.util';
import { formatDate } from 'src/utils/formatDate'
import BaseWrapper from './BaseWrapper.vue';

defineProps<{
    offer: IOffer
}>()

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
