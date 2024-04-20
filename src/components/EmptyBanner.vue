<script lang="ts" setup>
</script>

<template>
  <div class="empty-banner bg-secondary">
    <div class="empty-banner--wrapper">
      <div class="empty-banner--wrapper__title text-white">
        <slot name="title" />
      </div>
      <div class="empty-banner--wrapper__desc text-white">
        <slot name="description" />
      </div>
    </div>
    <slot name="button" />
  </div>
</template>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.empty-banner {
  width: 100%;
  height: 360px;
  background-color: $dark-gray;
  border-radius: 8px;
  padding: 40px 32px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  &--wrapper {
    &__title {
      font-size: 28px;
      font-weight: 500;
      line-height: 36px;
      margin-bottom: 16px;
      color: $text-color;
    }

    &__desc {
      font-size: 14px;
      color: $text-color;
      line-height: 20px;
    }
  }
}
</style>
