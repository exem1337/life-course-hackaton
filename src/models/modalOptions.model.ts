import type { ComponentProps, ComponentSlots } from 'vue-final-modal/dist/Component';
import type { ModalSlot } from 'vue-final-modal/dist/Modal';

export interface IModalOptions<T> {
  attrs?: ComponentProps<T>;
  slots?: {
    // eslint-disable-next-line no-unused-vars
    [K in keyof ComponentSlots<T>]?: ModalSlot;
  };
}
