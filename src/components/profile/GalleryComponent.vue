<template>
  <div class="gallery-container">
    <div class="gallery-container--header">
      <slot name="header"></slot>
    </div>
    <div class="gallery-container--list">
      <q-avatar
        v-for="index in Math.min(4, images.length)"
        :key="images[index].id"
        class="gallery-container--list__image"
        size="208px"
        square
      >
        <img
          :src="images[index].url"
          alt="Фото"
        >
      </q-avatar>
    </div>
    <div class="gallery-container--footer">
      <div class="gallery-container--footer__btn">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IImages } from 'src/models/profile/galleryImage.model';

defineProps<{
  images: IImages[];
}>()
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";

.gallery-container{
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  padding: 16px 24px;
  margin-bottom: 60px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  &--list{
    display: flex;
    flex-wrap: wrap;
    &__image{
      margin: 2px;
    }
  }

  &--header{
    display: flex;
    margin-bottom: 16px;
  }

  &--footer{
    margin-top: 14px;
    display: flex;
    justify-content: center;
    &__btn{
      width: 50%;
      display: flex;
      justify-content: center;
      & > :deep(button){
        width: 45%;
      }
    }
  }
}
</style>
