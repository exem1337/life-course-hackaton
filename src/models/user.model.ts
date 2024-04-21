import IGroup from 'src/models/groups.model';
import { IRole } from 'src/models/role.model';

export interface IUser {
  id: number;
  avatar_salt: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  birthdate: string;
  email: string;
  password: string;
  locality_id: 1,
  createdAt: string;
  updatedAt: string;
  groups: Array<IGroup>;
  roles: Array<IRole>;
}

export interface IUserTokenInfo {
  accessToken: string;
  refreshToken: string;
}
