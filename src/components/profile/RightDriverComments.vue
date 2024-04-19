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
          style="height: 530px;"
          class="q-mb-auto"
        >
          <div
            v-for="n in 100"
            :key="n"
            class="q-pa-xs"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>
        <q-input
          class="q-mt-md"
          model-value=""
          placeholder="Написать комментарий"
        ></q-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  showPanel: boolean;
  showRightPanelComment: () => void,
}>()
</script>

<style scoped lang="scss">
.profile-post--comments{
  overflow: hidden;
  width: 40%;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  padding-left: 5px;
  &-init{
    position: absolute;
    width: 99%;
    height: 100%;
    border-radius: 8px 0 0 8px;
    transition: transform 0.2s ease;
    right: -110%;
    top: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: -2px 0 5px -3px rgba(0, 0, 0, 0.5);
    &__header{
      display: flex;
      flex-direction: column;
      align-items: flex-start
    }
    &__content{
      padding: 16px 8px;
      width: 100%;
    }
  }
  &-show{
    transform: translateX(-110%);
  }
}
</style>
