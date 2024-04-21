import { EUserSex } from 'src/enums/userSex.enum'

export interface IStudentCreate {
  first_name: string;
  password: string;
  last_name: string;
  middle_name: string;
  email: string;
  sex: EUserSex;
  region_id: number | null;
  locality_id: number | null;
  university_id: number | null;
  faculty_id: number | null;
  department_id: number | null;
  direction_id: number | null;
  group_id: number | null;
}

export interface IJobGiverCreate {
  first_name: string;
  password: string;
  last_name: string;
  middle_name: string;
  email: string;
  locality_id: number | null;
}

export interface IUniCreate {
  first_name: string;
  password: string;
  last_name: string;
  middle_name: string;
  email: string;
  university_id: number | null;
}

export interface IUniCreateRequest {
  fullname: string;
  shortname: string;
  description: string;
  address: string;
  locality_id: number | null;
}

export interface IUniCreateResponse {
  fullname: string;
  id: number;
  shortname: string;
  description: string;
  address: string;
  locality_id: number | null;
}
