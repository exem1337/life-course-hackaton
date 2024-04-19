import { Ref } from 'vue'

export async function wrapLoader(loader: Ref<boolean>, callback: () => Promise<void>): Promise<void> {
  try {
    loader.value = true;
    await callback();
  } finally {
    loader.value = false;
  }
}
