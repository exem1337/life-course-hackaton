<template>
  <div
    v-if="!isLoading"
    class="page-wrapper"
  >
    <div class="offers-filters">
      <q-select
        v-if="localities?.length"
        v-model="filters.city"
        filled
        use-input
        use-chips
        multiple
        label="Город"
        emit-value
        clearable
        option-value="id"
        stack-label
        option-label="name"
        map-options
        input-debounce="0"
        :options="localities"
        style="width: 250px; margin-right: 8px"
      />
      <q-select
        v-model="filters.organization"
        filled
        use-input
        use-chips
        multiple
        option-value="id"
        label="Организация"
        emit-value
        map-options
        clearable
        option-label="name"
        stack-label
        :options="organizations"
        input-debounce="0"
        style="width: 250px"
      />
    </div>
    <OfferCard :offers="offers" />
  </div>
  <AppLoader v-else />
</template>

<script lang="ts" setup>
import OfferCard from 'components/OfferCard.vue'
import { OfferApiService } from 'src/services/api/offerApi.service'
import { IOffer, IOfferFilers } from 'src/models/offer.model'
import { onBeforeMount, reactive, ref, watch } from 'vue'
import { wrapLoader } from 'src/utils/loaderWrapper.util';
import AppLoader from 'src/components/AppLoader.vue'
import { IOffersRequestFilters } from 'src/models/profile/post.model'
import { IOrganization, IRegionLocality } from 'src/models/region.model'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'

const offers = ref<Array<IOffer>>([])
const isLoading = ref(false);
const filters = reactive<IOfferFilers>({
  city: null,
  organization: null,
})
const localities = ref<Array<IRegionLocality>>([]);
const organizations = ref<Array<IOrganization>>([])

async function loadData() {
  const filtersObj: IOffersRequestFilters = {
    fields: {},
    includes: [
      {
        association: 'locality',
      },
      {
        association: 'organization',
      },
      {
        association: 'users',
      },
    ],
  }

  if (filters.organization?.length) {
    filtersObj.fields.organization_id = {
      operator: 'eq',
      value: filters.organization,
    }
  }

  if (filters.city?.length) {
    filtersObj.fields.locality_id = {
      operator: 'eq',
      value: filters.city,
    }
  }

  offers.value = await OfferApiService.loadOffers(filtersObj);
}

watch(
  () => filters,
  async () => {
    await loadData();
  },
  {
    deep: true,
  },
)

onBeforeMount(async () => {
  localities.value = await LocalitiesApiService.laodLocalities();
  organizations.value = await OfferApiService.loadOrganizations();

  await wrapLoader(isLoading, async () => {
    await loadData()
  })
});
</script>

<style lang="scss" scoped>
.offers-filters {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
</style>
