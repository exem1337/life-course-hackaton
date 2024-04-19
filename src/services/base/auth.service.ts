import { RedirectService } from './redirect.service';
import { Router } from 'vue-router';
import { Cookies, Notify } from 'quasar'
import api, { setDefaultHeaders } from './api.service';
import { useUserStore } from 'src/stores/user';
import { IUser, IUserTokenInfo } from 'src/models/user.model';

export class AuthService {
  private static redirectService: RedirectService;

  public static initialize(router: Router) {
    this.redirectService = new RedirectService(router);
  }

  static async auth(email: string, password: string): Promise<void> {
    const tokenInfo = await this.authByCredentials(email, password);
    this.setTokenCookie(tokenInfo.token);
    setDefaultHeaders(tokenInfo.token);
    const userInfo = await this.getUserInfoByToken();
    const store = useUserStore();
    store.setUser(userInfo);
    this.redirectService.redirectToDefaultByRole(userInfo.role);
  }

  static async getUserInfoByToken(): Promise<IUser> {
    return await api.get('/me');
  }

  static refreshApi() {
    setDefaultHeaders(this.getTokenCookie());
  }

  static async refresh(router: Router) {
    const token = Cookies.get('Token');
    const verify = Cookies.get('Verify');
    const userKey = Cookies.get('UserKey');
    const store = useUserStore();

    if (token && verify && userKey) {
      const userInfo = await api.get<IUser>(`/userInfo/${userKey}`).then((res) => res);

      if (!userInfo) {
        await router.push('/');

        Notify.create({
          color: 'blue-8',
          message: 'Произошла ошибка при авторизации',
          timeout: 1000,
        })

        return;
      }

      store.setUser(userInfo);
    }

    this.refreshApi();
  }

  static getTokenCookie(): string {
    return Cookies.get('token') || '';
  }

  private static setTokenCookie(token: string): void {
    Cookies.set('token', token);
  }

  private static async authByCredentials(email: string, password: string): Promise<IUserTokenInfo> {
    return await api.post('/login',
      {
        email,
        password,
      },
      {
        showError: true,
      },
    );
  }
}
