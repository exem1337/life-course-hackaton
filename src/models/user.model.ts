// import { EUserRole } from 'src/enums/userTypes.enum';

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
}

export interface IUserTokenInfo {
  accessToken: string;
  refreshToken: string;
}
