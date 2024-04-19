import { EUserRole } from 'src/enums/userTypes.enum';
import { Router } from 'vue-router';
import { ErrorService } from './error.service';

export class RedirectService {
  private router: Router;

  private roleDefaultRoutesMap = new Map<EUserRole, string>([
    [EUserRole.Admin, '/admin'],
    [EUserRole.User, '/profile'],
  ]);

  constructor(router: Router) {
    this.router = router;
  }

  public toExpertMain = (): void => {
    this.router.push('/admin');
  }

  public toDisciplines = (): void => {
    this.router.push('/disciplines');
  }

  public redirectToDefaultByRole = (role: EUserRole): void => {
    const route = this.roleDefaultRoutesMap.get(role);

    if (!route) {
      ErrorService.showError('Произошла ошибка при получении роли');
      return;
    }

    this.router.push(route);
  }
}
