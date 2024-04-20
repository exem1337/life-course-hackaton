import { watchEffect } from 'vue';
import { useUserStore } from 'stores/user'
import { Cookies } from 'quasar'

export function waitForCurrentUser(resolveFn: () => unknown): Promise<unknown> {
  const userStore = useUserStore();

  if (!Cookies.get('token')) {
    return new Promise((resolve) => {
      resolve(resolveFn());
    });
  }

  return new Promise((resolve) => {
    if (userStore.user?.id) {
      resolve(resolveFn());
    } else {
      watchEffect(() => {
        if (userStore.user?.id) {
          resolve(resolveFn());
        }
      });
    }
  });
}
