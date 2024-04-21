import axios, { AxiosInstance } from 'axios';
import { ErrorService } from './error.service';
import { EErrorType } from 'src/enums/error.enum';
import { IAxiosRequestConfig } from 'src/models/axios.model';
// import { Cookies } from 'quasar';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export function setDefaultHeaders(token: string): void {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
}

async function fetchData<T>(url: string, config?: IAxiosRequestConfig<unknown> | undefined): Promise<T> {
  try {
    return (await instance.get(url, config))?.data;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : EErrorType.Default;

    if (config?.showError) {
      ErrorService.showError(errorMessage);
    }
  }

  return new Promise<T>(() => {
    //
  });
}

async function postData<T>(url: string, data?: unknown, config?: IAxiosRequestConfig<unknown> | undefined): Promise<T> {
  try {
    return (await instance.post(url, data, config)).data;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : EErrorType.Default;

    if (config?.showError) {
      ErrorService.showError(errorMessage);
    }
  }

  return new Promise<T>(() => {
    //
  });
}

async function pacthData<T>(url: string, data?: unknown, config?: IAxiosRequestConfig<unknown> | undefined): Promise<T> {
  try {
    return (await instance.patch(url, data, config)).data;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : EErrorType.Default;

    if (config?.showError) {
      ErrorService.showError(errorMessage);
    }
  }

  return new Promise<T>(() => {
    //
  });
}

async function deleteData<T>(url: string, config?: IAxiosRequestConfig<unknown> | undefined): Promise<T> {
  try {
    return (await instance.delete(url, config)).data;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : EErrorType.Default;

    if (config?.showError) {
      ErrorService.showError(errorMessage);
    }
  }

  return new Promise<T>(() => {
    //
  });
}

export default {
  get: fetchData,
  post: postData,
  patch: pacthData,
  delete: deleteData,
}
