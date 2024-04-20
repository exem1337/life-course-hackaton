<template>
  <div class="offer-card">
    <div class="offer-card--title">{{ offer?.header }}</div>
    <div class="offer-card--author">{{ offer?.author }}</div>
    <div class="offer-card--date">{{ offer?.createdAt }}</div>
  </div>
</template>

<script lang="ts" setup>
import { IOffer } from 'src/models/offer.model';
import { ref } from 'vue';
const offer = ref<IOffer>()

</script>
