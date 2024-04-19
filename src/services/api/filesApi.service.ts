import api from 'src/services/base/api.service';

export class FilesApiService {
  public static async getFile(fileId: string): Promise<string> {
    return await api.get(`/cdn/get/${fileId}`, {
      baseURL: import.meta.env.VITE_BASE_URL_WITHOUT_API,
    })
  }
}
