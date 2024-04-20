<template>
  <div class="profile-post--comments">
    <div
      class="profile-post--comments-init"
      :class=" { 'profile-post--comments-show' : showPanel} "
    >
      <div class="profile-post--comments-init__header">
        <q-btn
          flat
          class="q-ml-auto"
          @click="showRightPanelComment"
        >
          <q-icon name="close"></q-icon>
        </q-btn>
        <h6 class="q-my-md text-center full-width">Комментарии</h6>
      </div>
      <div class="profile-post--comments-init__content">
        <q-scroll-area
          ref="scrollArea"
          style="height: 530px;"
          class="q-mb-auto profile-post--comments-init__content-scroll-area"
        >
          <q-card
            v-for="n in 100"
            :key="n"
            class="my-card q-pa-xs profile-post--comments-init__content-card"
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg">
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>Имя Фамилия</q-item-label>
                <q-item-label caption> дата · обновлено фото </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </q-item>
          </q-card>
          <q-input
            model-value=""
            placeholder="Написать комментарий"
          ></q-input>
          <q-btn
            label="Отправить"
            class="q-mt-sm q-ml-auto full-width"
            icon="send"
          />
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  showPanel: boolean;
  showRightPanelComment: () => void,
}>()
const scrollArea = ref<HTMLDivElement | null>(null);
// onMounted(() => {
//   if (scrollArea.value) {
//     console.log(scrollArea.value.scrollHeight)
//     scrollArea.value.scrollTop = scrollArea.value.scrollHeight;
//   }
// });
</script>

<style scoped lang="scss">
.profile-post--comments{
  overflow: hidden;
  width: 50%;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  padding-left: 5px;
  &-init{
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px 0 0 8px;
    transition: transform 0.2s ease;
    right: -110%;
    top: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: -2px 0 5px -3px rgba(0, 0, 0, 0.5);
    &__header{
      display: flex;
      flex-direction: column;
      align-items: flex-start
    }
    &__content{
      padding: 16px 8px;
      width: 100%;
      height: calc(100% - 100px);

      :deep(.q-scrollarea) {
        height: 100% !important;
      }

      &-card{
        background-color: transparent !important;
        box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 0;
        :deep(.q-item){
          padding: 4px 0 !important;
        }
      }
    }
  }
  &-show{
    transform: translateX(-110%);
  }
}
</style>
