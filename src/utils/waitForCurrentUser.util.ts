import { watchEffect } from 'vue';
import { useUserStore } from 'stores/user'

export function waitForCurrentUser(resolveFn: () => unknown): Promise<unknown> {
  const userStore = useUserStore();

  return new Promise((resolve) => {
    if (userStore.user) {
      resolve(resolveFn());
    } else {
      watchEffect(() => {
        if (userStore.user) {
          resolve(resolveFn());
        }
      });
    }
  });
}
