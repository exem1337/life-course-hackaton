// import { EUserRole } from 'src/enums/userTypes.enum';

import IGroup from 'src/models/groups.model';

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
}

export interface IUserTokenInfo {
  accessToken: string;
  refreshToken: string;
}
