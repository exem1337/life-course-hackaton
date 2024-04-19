import { useModal } from 'vue-final-modal';
import type { Component } from 'vue';
import { IModalOptions } from 'src/models/modalOptions.model'

export default class ModalManager {
  // eslint-disable-next-line no-use-before-define
  private static _instance: ModalManager;

  public static getServiceName() {
    return 'modalManager';
  }

  constructor() {
    if (ModalManager._instance) {
      return ModalManager._instance;
    }
    ModalManager._instance = this;
  }

  public async openAsyncModal<T extends Component, K>(
    component: Component,
    options?: IModalOptions<T>,
  ): Promise<unknown> {
    if (!options) {
      options = {};
    }
    if (!options.attrs) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      options.attrs = {};
    }
    return new Promise((resolve) => {
      const { open, close } = useModal({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        component,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        attrs: {
          onConfirm(data: K) {
            close();
            resolve(data);
          },
          onCancel() {
            close();
            resolve(null);
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          ...options.attrs,
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        slots: options.slots,
      });
      open();
    });
  }
}
