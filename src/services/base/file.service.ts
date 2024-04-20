import api from 'src/services/base/api.service';

export class FileService {
  private static b64toBlob(b64Data: string, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static async getFile(salt: string, type = 'image/png'): Promise<File> {
    const file = await api.get<string>(
      `/cdn/get/${salt}`,
      {
        baseURL: import.meta.env.VITE_BASE_URL_WITHOUT_API,
      },
    ).then((res) => res)

    const myBlob = this.b64toBlob(file, type);
    const myFile = new File([myBlob], 'Файл', { type });
    return myFile;
  }

  static async getFileBase64(salt: string): Promise<string> {
    return await api.get<string>(
      `/cdn/get/${salt}`,
      {
        baseURL: import.meta.env.VITE_BASE_URL_WITHOUT_API,
      },
    ).then((res) => res)
  }

  static async uploadFile(file: Array<File>): Promise<string> {
    const formData = new FormData();
    const fileToUpload = file[0];
    formData.append('content', fileToUpload);
    console.log(formData)
    const salt = await api.post<{ salt: string }>(
      '/cdn/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        baseURL: import.meta.env.VITE_BASE_URL_WITHOUT_API,
      },
    ).then((res) => res.salt)

    return salt;
  }
}
