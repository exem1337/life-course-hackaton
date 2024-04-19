import { IJobGiverCreate, IStudentCreate } from 'src/models/user/student.model'
import api from 'src/services/base/api.service';

export class AuthApiService {
  public static async registerStudent(studentData: IStudentCreate): Promise<void> {
    return await api.post('/users/createOnPortal', studentData);
  }

  public static async registerJobGiver(jobGiverInfo: IJobGiverCreate): Promise<void> {
    return await api.post('/users/createWorkGiver', jobGiverInfo);
  }
}
