import { IUser } from 'src/models/user.model'
import { IIdName } from 'src/models/base/idName.model'
import { IUniversity } from 'src/models/university.model'

export interface IRegionLocality {
  id: number;
  name: string;
  region_id: number;
}

export interface IRegion {
  id: number;
  name: string;
  localities: Array<IRegionLocality>;
}

export interface ICity {
  id: number;
  name: string;
  region_id: number;
  users: Array<IUser>;
  position: IIdName;
  universities: Array<IUniversity>;
}
