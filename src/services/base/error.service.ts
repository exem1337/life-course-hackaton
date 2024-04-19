import { Notify } from 'quasar';

export class ErrorService {
  public static showError(text: string) {
    Notify.create({
      type: 'negative',
      message: text,
      position: 'top-right',
    });
  }
}
