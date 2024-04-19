<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { reactive, ref } from 'vue'
import { AuthService } from 'src/services/base/auth.service'
import { wrapLoader } from 'src/utils/loaderWrapper.util'

const emits = defineEmits<{(e: 'confirm'): void }>();

const loginInfo = reactive({
  email: '',
  password: '',
});
const isLoading = ref<boolean>(false);

async function onLogin(): Promise<void> {
  await wrapLoader(isLoading, async () => {
    await AuthService.auth(loginInfo.email, loginInfo.password);
    emits('confirm');
  });
}
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    title="Войти в аккаунт"
    hide-footer
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="login-modal">
      <q-input
        v-model="loginInfo.email"
        type="email"
        label="Электронная почта"
      />
      <q-input
        v-model="loginInfo.password"
        type="password"
        label="Пароль"
      />
      <q-btn
        class="bg-primary text-white"
        :loading="isLoading"
        :disable="!loginInfo.password || !loginInfo.email"
        @click="onLogin"
      >
        Войти
      </q-btn>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.login-modal {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .q-btn {
    width: 100%;
  }
}
</style>
