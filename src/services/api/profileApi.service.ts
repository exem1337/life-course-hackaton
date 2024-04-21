import api from 'src/services/base/api.service';
import { IUser } from 'src/models/user.model';
import { IGalleryItem } from 'src/models/profile/galleryImage.model';

export class ProfileApiService {
  public static async getProfileId(userId: string): Promise<IUser> {
    return await api.get(`/users/one/${userId}`);
  }

  public static async getGalleryProfileId(userId: string): Promise<Array<IGalleryItem>> {
    return await api.get(`/userContents/userContent/user/${userId}`);
  }

  public static async searchUser(q: string): Promise<Array<IUser>> {
    return await api.get(`/users/fio?q=${q}`);
  }

  public static async uploadProfileImage(salt: string, id: number): Promise<void> {
    return await api.post('/userContents/userContent', {
      content_salt: salt,
      author_id: id,
    });
  }

  public static async editProfileAvatar(salt: string, id: number): Promise<void> {
    return await api.patch('/users/updateAvatar', {
      id,
      avatar_salt: salt,
    });
  }

  public static async addUniversityImage(salt: string, id: number): Promise<void> {
    return await api.post(`/universities/university/${id}/content`, {
      content_salt: salt,
    });
  }
}
