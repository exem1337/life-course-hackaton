<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Галерея"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="gallery-container">
      <q-scroll-area style="height: 610px; width: 60vw;">
        <div class="gallery-container--list">
          <q-avatar
            v-for="image in images"
            :key="image?.id"
            class="gallery-container--list__image"
            size="284px"
            square
            @click="openImage(image)"
          >
            <img
              :src="image?.photo"
              alt="Фото"
            >
          </q-avatar>
        </div>
      </q-scroll-area>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue';
import { IGalleryItem } from 'src/models/profile/galleryImage.model';
import { inject } from 'vue';
import ModalManager from 'src/services/base/modalManager.service';
import GalleryOneModal from 'components/profile/GalleryOneModal.vue';
defineProps<{
  images: IGalleryItem[];
}>()
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
function openImage(imageItem: IGalleryItem) {
  // eslint-disable-next-line no-undef
  modalManager?.openAsyncModal(GalleryOneModal, {
    attrs: {
      image: imageItem,
    },
  });
}
</script>

<style scoped lang="scss">
.gallery-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &--list {
    display: flex;
    flex-wrap: wrap;

    &__image {
      margin: 2px;
      cursor: pointer;
    }
  }
}
</style>
