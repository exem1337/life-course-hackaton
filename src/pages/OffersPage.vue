<template>
  <OfferCard
    v-for="offer in offers"
    :key="offer.id"
    :offer="offer"
  />
</template>

<script lang="ts" setup>
import OfferCard from 'components/OfferCard.vue'
import { OfferApiService } from 'src/services/api/offerApi.service'
import { IOffer } from 'src/models/offer.model'
import { onBeforeMount, ref } from 'vue'
// import { ref } from 'vue'

const offers = ref<Array<IOffer>>([])
console.log(offers.value);

onBeforeMount(async () => {
  offers.value = await OfferApiService.loadOffers()
})

</script>