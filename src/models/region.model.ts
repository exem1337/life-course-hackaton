import { IUser } from 'src/models/user.model'
import { IIdName } from 'src/models/base/idName.model'
import { IUniversity } from 'src/models/university.model'
import { IOffer } from 'src/models/offer.model'

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

export interface ICreateOrganization {
  name: string;
  description: string;
  short_name: string;
  INN: string;
  OGRN: string;
  photo: string;
  locality_id: number | null;
  owner_id: number;
}

export interface IOrganization {
  id: number;
  name: string;
  short_name: string;
  description: string;
  address: null,
  INN: string;
  OGRN: string;
  photo: string;
  owner_id: number;
  locality_id: number;
  createdAt: string;
  updatedAt: string;
  vacancies: Array<IOffer>;
}
