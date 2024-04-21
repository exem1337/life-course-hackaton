import { ICity, IRegion, IRegionLocality } from 'src/models/region.model'
import api from 'src/services/base/api.service';
import {
  ICreateDirection,
  IDirectionFullResponse,
  IFacultyDepartmentFullResponse,
  IFacultyFullResponse, IUniversity,
  IUniversityFullResponse, IUniversityStudent,
} from 'src/models/university.model'
import { FileService } from 'src/services/base/file.service'
import { IUniCreateRequest, IUniCreateResponse } from 'src/models/user/student.model'
import { IEvent, IEventCreateRequest, IGetEventsRequestParams } from 'src/models/event.model'
import { IPagination } from 'src/models/base/pagination.model'

export class LocalitiesApiService {
  public static async loadRegions(): Promise<Array<IRegion>> {
    return await api.get('/localities/regions');
  }

  public static async loadCity(cityId: number | null): Promise<ICity> {
    return await api.get(`/localities/one/${cityId}`);
  }

  public static async loadAllUniversities(): Promise<Array<IUniversity>> {
    return await api.get('/universities/university');
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

  public static async getCountStudentsInLocalitiesId(localityId: number | null): Promise<number> {
    return await api.get(`/universities/university/${localityId}/students`);
  }

  public static async editDepartment(departmentId: number, name: string): Promise<void> {
    return await api.patch(`/universities/department/${departmentId}`, {
      fullname: name,
    });
  }

  public static async createFaculty(universityID: number, facultyName: string): Promise<void> {
    return await api.post('/universities/faculty', {
      university_id: universityID,
      fullname: facultyName,
    });
  }

  public static async createDirection(data: ICreateDirection): Promise<void> {
    return await api.post('/universities/direction', {
      department_id: data.departmentId,
      fullname: data.fullname,
      specialty_code: data.specialityCode,
    });
  }

  public static async deleteDepartment(departmentId: number): Promise<void> {
    return await api.delete(`/universities/department/${departmentId}`);
  }

  public static async createDepartment(id: number, name: string): Promise<void> {
    return await api.post('/universities/department', {
      faculty_id: id,
      fullname: name,
    });
  }

  public static async createGroup(id: number, name: string): Promise<void> {
    return await api.post('/universities/group', {
      direction_id: id,
      fullname: name,
    });
  }

  public static async editDirection(id: number, name: string): Promise<void> {
    return await api.patch(`/universities/direction/${id}`, {
      fullname: name,
    });
  }

  public static async deleteDirection(id: number): Promise<void> {
    return await api.delete(`/universities/direction/${id}`);
  }

  public static async editGroup(id: number, name: string): Promise<void> {
    return await api.patch(`/universities/group/${id}`, {
      fullname: name,
    });
  }

  public static async deleteGroup(id: number): Promise<void> {
    return await api.delete(`/universities/group/${id}`);
  }

  public static async editFaculty(id: number, name: string): Promise<void> {
    return await api.patch(`/universities/faculty/${id}`, {
      fullname: name,
    });
  }

  public static async deleteFaculty(id: number): Promise<void> {
    return await api.delete(`/universities/faculty/${id}`);
  }

  public static async loadUniversityStudents(id: number): Promise<Array<IUniversityStudent>> {
    let students = await api.get<Array<IUniversityStudent>>(`/universities/university/${id}/studentsAll`);
    students = await Promise.all(students.map(async (student: IUniversityStudent) => ({
      ...student,
      avatar: `data:image/png;base64,${await FileService.getFileBase64(student.avatar_salt)}`,
    })))
    console.log(students)
    return students;
  }

  public static async createUniversity(data: IUniCreateRequest): Promise<IUniCreateResponse> {
    return await api.post('/universities/university', data);
  }

  public static async setUniversityAdmin(universityId: number, userId: number): Promise<void> {
    return await api.patch(`/universities/university/university/admin/${universityId}`, {
      admin_id: userId,
    });
  }

  public static async getAdminUniversity(adminId: number): Promise<IUniversity> {
    return (await api.get<Array<IUniversity>>(`/universities/university/university/admin/${adminId}`))?.[0];
  }

  public static async getEvents(requestParams: IGetEventsRequestParams): Promise<Array<IEvent>> {
    return (await api.post<IPagination<Array<IEvent>>>('/events/event/all', requestParams))?.data;
  }

  public static async createEvent(data: IEventCreateRequest): Promise<void> {
    return await api.post('/events/event', data);
  }

  public static async appealToEvent(eventId: number): Promise<void> {
    return await api.post('/achievements/appeal', {
      text: '',
      event_id: eventId,
    });
  }

  public static async loadUniversityImages(universityId: number): Promise<Array<string>> {
    const images = await api.get<Array<{ content_salt: string }>>(`/universities/university/${universityId}/content`);
    return await Promise.all(images?.map(async (image) => `data:image/png;base64,${await FileService.getFileBase64(image.content_salt)}`));
  }

  public static async acceptEventAppeal(id: number): Promise<void> {
    return await api.get(`/achievements/appeal/${id}/accept`);
  }
}
