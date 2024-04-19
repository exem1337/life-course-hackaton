<template>
  <q-header class="app-header">
    <router-link
      class="app-header--title"
      to="/"
    >
      LifeCourse
    </router-link>
    <div class="app-header--right">
      <router-link to="/page">Страница </router-link>
      <router-link to="/page2"> Страница 2 </router-link>
    </div>
  </q-header>
</template>

<script lang="ts" setup=""></script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.app-header {
  border-bottom: 1px solid $primary;
  padding: 20px 80px;
  font-weight: 500;
  color: $text-color;
  z-index: 20;
  background-color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -1px 48px -17px rgba(0, 0, 0, 0.56);

  &--title {
    font-size: 24px;
    text-decoration: none;
    color: $text-color;
  }

  &--right {
    display: flex;
    gap: 16px;
    align-items: center;

    a {
      color: $text-color;
      text-decoration: none;
      transition: 0.3s ease;

      &:hover {
        color: $primary;
      }

      &::after {
        content: "";
        border-bottom: 2px solid $primary;
        opacity: 0;
        width: 100%;
        display: block;
        transition: opacity 0.3s ease;
        padding-top: 4px;
      }

      &.router-link-active {
        &::after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
