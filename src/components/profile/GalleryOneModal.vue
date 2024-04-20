<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Фото"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="gallery-container">
      <div class="gallery-container--list">
        <img
          class="gallery-container--list__image"
          :src="image?.photo"
          alt="Фото"
        >
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue';
import { IGalleryItem } from 'src/models/profile/galleryImage.model';
defineProps<{
  image: IGalleryItem;
}>()
</script>

<style scoped lang="scss">
.gallery-container {
  max-width: 40vw;
  height: 70vh;

  &--list {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &__image {
      margin: 2px;
      max-height: 100%;
      max-width: 100%;
      object-fit: contain;
    }
  }
}
</style>
