import { IRegionLocality } from 'src/models/region.model'

export interface IDirectionGroup {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  direction_id: number;
  createdAt: string;
  updatedAt: string;
}

export interface IFacultyDepartmentDirection {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  department_id: number;
  graduate_level: string;
  createdAt: string;
  updatedAt: string;
  groups: Array<IDirectionGroup>;
}

export interface IFacultyDepartment {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  faculty_id: number;
  directions: Array<IFacultyDepartmentDirection>;
}

export interface IFaculty {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  university_id: number;
  departments: Array<IFacultyDepartment>
}

export interface IUniversity {
  id: number;
  fullname: string;
  shortname: string;
  description: string;
  address: string;
  locality_id: number;
  createdAt: string;
  updatedAt: string;
  faculties: Array<IFaculty>;
}

export interface IUniversityFullResponse extends IUniversity {
  locality: IRegionLocality;
  faculties: Array<IFaculty>;
}

export interface IFacultyFullResponse {
  departments: Array<IFacultyDepartment>;
}

export interface IFacultyDepartmentFullResponse {
  directions: Array<IFacultyDepartmentDirection>;
}

export interface IDirectionFullResponse {
  groups: Array<IDirectionGroup>
}

export interface ICreateDirection {
  departmentId: number;
  specialityCode: string;
  fullname: string;
}

export interface ICreateVacancy {
  organization_id: number;
  header: string;
  locality_id: number;
  description: string;
}

export interface IUniversityStudent {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  rating: number;
  fullname: string;
  group_id: number;
  avatar: string;
  avatar_salt: string;
}
