<template>
  <div v-if="!isLoading">
    <OfferCard :offers="offers" />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts" setup>
import OfferCard from 'components/OfferCard.vue'
import { OfferApiService } from 'src/services/api/offerApi.service'
import { IOffer } from 'src/models/offer.model'
import { onBeforeMount, ref } from 'vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util';
import AppLoader from 'src/components/AppLoader.vue'

const offers = ref<Array<IOffer>>([])
const isLoading = ref(false)
onBeforeMount(async () => {
  await wrapLoader(isLoading, async () => {
    offers.value = await OfferApiService.loadOffers()
  })
})
</script>
