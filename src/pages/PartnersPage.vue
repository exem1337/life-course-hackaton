<template>
  <div class="page-wrapper"> 
    <q-page class="partners-page">
      <div class="text-h3 q-my-md">Наши партнёры</div>
      <div class="q-pa-md flex flex-wrap justify-center line">
        <div
          v-for="(partner, index) in partners"
          :key="index"
          class="q-ma-md"
        >
          <a
            :href="partner.url"
            target="_blank"
          >
            <q-img
              :src="partner.logo"
              :alt="partner.name"
            >
              <template v-slot:error>
                <div class="text-grey-8 text-center q-pa-sm">Не удалось загрузить</div>
              </template>
            </q-img>
          </a>
        </div>
      </div>
    </q-page>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const partners = ref([
  { name: 'ОГУ', logo: 'src/assets/images/partners/logo1.png', url: 'http://www.osu.ru/' },
  { name: 'МинЦифры', logo: 'src/assets/images/partners/logo2.jpg', url: 'https://digital.gov.ru/ru/' },
  { name: 'Точка кипения', logo: 'src/assets/images/partners/logo3.png', url: 'https://leader-id.ru/places' },
  { name: 'ВТ2Б', logo: 'src/assets/images/partners/logo4.jpg', url: 'https://www.vt2b.ru/' },
]);
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
.partners-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.q-img{
  margin: 20px; 
  object-fit: contain !important;
  height: 200px; 
  width: 200px;
}

.line{
  border-top: 1px solid $primary;
  margin-top: 20px;
}
</style>
