<template>
  <div class="gallery-container">
    <div class="gallery-container--header">
      <slot name="header"></slot>
    </div>
    <div class="gallery-container--list">
      <q-avatar
        v-for="image in images.slice(0, 4)"
        :key="image?.id"
        class="gallery-container--list__image"
        size="208px"
        square
        @click="openImage(image)"
      >
        <q-img
          :src="image?.photo"
          alt="Фото"
        />
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
      cursor: pointer;
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
