import { IUser } from './user.model';
import { IOrganization } from 'src/models/region.model';

export interface IOffer{
  id: number,
  header: string,
  description: string,
  author_id: number,
  createdAt: string,
  updatedAt: string,
  users: Array<IUser>,
  author: IUser,
  organization: IOrganization,
}

export interface IOfferFilers {
  city: Array<number> | null;
  organization: Array<number> | null;
}
