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
}
