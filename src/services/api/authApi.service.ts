import { IJobGiverCreate, IStudentCreate } from 'src/models/user/student.model'
import api from 'src/services/base/api.service';
import { IUser } from 'src/models/user.model'

export class AuthApiService {
  public static async registerStudent(studentData: IStudentCreate, isAdmin = false): Promise<IUser> {
    return await api.post('/users/createOnPortal', {
      ...studentData,
      is_admin: isAdmin,
    });
  }

  public static async registerJobGiver(jobGiverInfo: IJobGiverCreate): Promise<void> {
    return await api.post('/users/createWorkGiver', jobGiverInfo);
  }
}
