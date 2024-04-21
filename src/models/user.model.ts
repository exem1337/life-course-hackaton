import IGroup from 'src/models/groups.model';
import { IRole } from 'src/models/role.model';
import { EUserRole } from 'src/enums/userTypes.enum'
import { EAppealStatus } from 'src/enums/appealStatus.enum'
import { PostSectionEnum } from 'src/enums/postSection.enum'
import { IOrganization } from 'src/models/region.model'

export interface IStudentEventAppeal {
  createdAt: string;
  event_id: number;
  id: number;
  status: EAppealStatus;
  text: string;
  updatedAt: string;
  user_id: number;
  name: string;
  section: PostSectionEnum;
}

export interface IStudentAchievement {
  createdAt: string;
  event: IStudentEventAppeal;
  value: number;
}

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
  rating: number;
  avatar: string;
  groups: Array<IGroup>;
  roles: Array<IRole>;
  role: EUserRole;
  Appeal?: IStudentEventAppeal;
  achievements: Array<IStudentAchievement>;
  organization?: IOrganization;
}

export interface IUserTokenInfo {
  accessToken: string;
  refreshToken: string;
}
