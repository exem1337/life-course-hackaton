<template>
  <div v-if="!isLoading">
    <OfferCard
      v-for="offer in offers"
      :key="offer.id"
      :offer="offer"
      @click="onOfferClick(offer.id)"
    />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts" setup>
import OfferCard from 'components/OfferCard.vue'
import { OfferApiService } from 'src/services/api/offerApi.service'
import { IOffer } from 'src/models/offer.model'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { wrapLoader } from 'src/utils/loaderWrapper.util';
import AppLoader from 'src/components/AppLoader.vue'
// import { ref } from 'vue'


const offers = ref<Array<IOffer>>([])
console.log(offers.value);
const router = useRouter();
const isLoading = ref(false)

function onOfferClick(offerID: number) {
  router.push(`/offers/${offerID}`)
}
onBeforeMount(async () => {
  await wrapLoader(isLoading, async () => {
    offers.value = await OfferApiService.loadOffers()
  })
  // offers.value = await OfferApiService.loadOffers()
})

</script>
