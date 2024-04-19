import { EUserRole } from 'src/enums/userTypes.enum';

export interface IUser {
  id: number;
  middleName: string;
  name: string;
  email: string;
  created_at: string;
  lastName: string;
  status?: string;
  role: EUserRole;
}

export interface IUserTokenInfo {
  token: string;
}
