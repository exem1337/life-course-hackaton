<template>
  <div class="offer-card">
    <div class="offer-card--title">{{ offer?.header }}</div>
    <div class="offer-card--author">{{ formatPersonName(offer.author.first_name,  offer.author.last_name, offer.author.middle_name) }}</div>
    <div class="offer-card--date">{{ offer?.createdAt }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IOffer } from 'src/models/offer.model';
import { formatPersonName } from 'src/utils/nameFormat.util';

defineProps<{
    offer: IOffer
}>()

</script>
