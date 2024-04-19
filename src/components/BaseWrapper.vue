<template>
  <div class="base-wrapper">
    <div class="base-wrapper--header">
      <div class="base-wrapper--header__text">
        <slot name="headerText" />
      </div>
      <div class="base-wrapper--header__icons">
        <slot name="headerIcons" />
      </div>
    </div>

    <slot name="content" />
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.base-wrapper {
  width: 100%;

  &--header {
    width: 100%;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid $dark-gray;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__icons {
      display: flex;
      align-items: center;
      gap: 16px;
      font-size: 20px;
    }

    &__text {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0;
    }
  }
}
</style>
