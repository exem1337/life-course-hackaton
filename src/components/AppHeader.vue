<template>
  <q-header class="app-header">
    <router-link
      class="app-header--title"
      to="/"
    >
      LifeCourse
      <q-avatar>
        <img src="/src/assets/logo.svg">
      </q-avatar>
    </router-link>
    <div class="app-header--right">
      <router-link to="/news">Новости</router-link>
      <router-link to="/offers"> Вакансии </router-link>
      <q-btn
        v-if="!store.isLoggedIn"
        class="bg-primary text-white"
        @click="onOpenLoginModal"
      >
        Войти
      </q-btn>
      <q-btn-dropdown
        v-else
        split
        no-caps
        flat
        @click="onGoToProfile"
      >
        <template v-slot:label>
          <div class="row items-center no-wrap">
            <img
              v-if="store.avatar"
              class="avatar"
              :src="`data:image/png;base64,${store.avatar}`"
              alt="картинка"
            >
            <div
              v-else
              class="avatar"
            />
            {{ formatPersonName(store.user?.first_name, store.user?.last_name, store.user?.middle_name) }}
          </div>
        </template>

        <q-list>
          <q-item
            v-close-popup
            clickable
            @click="onLogout"
          >
            <q-item-section>
              <q-item-label>Выйти</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon
                name="logout"
                color="secondary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </q-header>
</template>

<script lang="ts" setup>
import { useUserStore } from 'stores/user'
import { inject } from 'vue'
import ModalManager from 'src/services/base/modalManager.service'
import LoginModal from 'components/modals/LoginModal.vue'
import { formatPersonName } from '../utils/nameFormat.util'
import { AuthService } from 'src/services/base/auth.service'
import { useRouter } from 'vue-router'

const store = useUserStore();
const modalManager = inject<ModalManager>(ModalManager.getServiceName());
const router = useRouter();

function onOpenLoginModal(): void {
  modalManager?.openAsyncModal(LoginModal);
}

function onGoToProfile(): void {
  router.push(`/profile/${store.user?.id}`)
}

function onLogout(): void {
  AuthService.logout();
}
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.app-header {
  border-bottom: 1px solid $primary;
  padding: 20px 40px;
  font-weight: 500;
  color: $text-color;
  z-index: 20;
  background-color: $white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px -1px 48px -17px rgba(0, 0, 0, 0.56);

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
    background: $dark-gray;
  }

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
