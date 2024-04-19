import { ICity, IRegion, IRegionLocality } from 'src/models/region.model'
import api from 'src/services/base/api.service';
import {
  IDirectionFullResponse,
  IFacultyDepartmentFullResponse,
  IFacultyFullResponse,
  IUniversityFullResponse,
} from 'src/models/university.model'

export class LocalitiesApiService {
  public static async loadRegions(): Promise<Array<IRegion>> {
    return await api.get('/localities/regions');
  }

  public static async loadCity(cityId: number | null): Promise<ICity> {
    return await api.get(`/localities/one/${cityId}`);
  }

  public static async loadUniversity(universityId: number | null): Promise<IUniversityFullResponse> {
    return await api.get(`/universities/university/one/${universityId}`);
  }

  public static async loadFaculty(facultyId: number | null): Promise<IFacultyFullResponse> {
    return await api.get(`/universities/faculty/one/${facultyId}`);
  }

  public static async loadDepartment(departmentId: number | null): Promise<IFacultyDepartmentFullResponse> {
    return await api.get(`/universities/department/one/${departmentId}`);
  }

  public static async loadDirection(directionId: number | null): Promise<IDirectionFullResponse> {
    return await api.get(`/universities/direction/one/${directionId}`);
  }

  public static async getAllLocalities(): Promise<Array<IRegionLocality>> {
    return await api.get('/localities');
  }
}
