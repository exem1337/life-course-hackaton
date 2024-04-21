import { RedirectService } from './redirect.service'
import { Router } from 'vue-router'
import { Cookies, Notify } from 'quasar'
import api, { setDefaultHeaders } from './api.service'
import { useUserStore } from 'src/stores/user'
import { IUser, IUserTokenInfo } from 'src/models/user.model'
import { FilesApiService } from 'src/services/api/filesApi.service'
import { EUserRole } from 'src/enums/userTypes.enum'
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service'

export class AuthService {
  private static redirectService: RedirectService;

  public static initialize(router: Router) {
    this.redirectService = new RedirectService(router);
  }

  static async auth(email: string, password: string): Promise<void> {
    const tokenInfo = await this.authByCredentials(email, password);
    this.setTokenCookie(tokenInfo.accessToken);
    setDefaultHeaders(tokenInfo.accessToken);
    const userInfo = await this.getUserInfoByToken();
    const store = useUserStore();
    store.setUser(userInfo);
    if (userInfo.avatar_salt) {
      store.setAvatar(await FilesApiService.getFile(userInfo.avatar_salt));
    }
    // this.redirectService.redirectToDefaultByRole(userInfo.role);
  }

  static async getUserInfoByToken(): Promise<IUser> {
    const userInfo = await api.post<IUser>('/auth/profile');
    userInfo.role = userInfo.roles?.[0]?.name as EUserRole;
    return userInfo;
  }

  static refreshApi() {
    setDefaultHeaders(this.getTokenCookie());
  }

  static logout(): void {
    Cookies.remove('token');
    const store = useUserStore();
    store.logout();
    this.redirectService.toLanding();
  }

  static async refresh(router: Router) {
    const token = Cookies.get('token');
    const store = useUserStore();

    if (!store.isLoggedIn && token) {
      setDefaultHeaders(token);
      const userInfo = await this.getUserInfoByToken();

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

      if (userInfo.avatar_salt) {
        store.setAvatar(await FilesApiService.getFile(userInfo.avatar_salt));
      }

      if (userInfo.role === EUserRole.Admin) {
        store.setAdminUniversity(await LocalitiesApiService.getAdminUniversity(userInfo.id));
      }
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
    return await api.post('/auth/login',
      { username: email, password },
      {
        showError: true,
      },
    );
  }
}
