import { boot } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'
import ModalManager from 'src/services/base/modalManager.service'

export default boot(({ app }) => {
  app.use(createPinia())
  const vfm = createVfm();
  app.use(vfm);
  app.provide(ModalManager.getServiceName(), new ModalManager());
});
