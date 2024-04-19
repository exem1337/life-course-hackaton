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

    throw new Error(errorMessage);
  }
}

async function postData<T>(url: string, data?: unknown, config?: IAxiosRequestConfig<unknown> | undefined): Promise<T> {
  try {
    return (await instance.post(url, data, config)).data;
  } catch (error) {
    const errorMessage = typeof error === 'string' ? error : EErrorType.Default;

    if (config?.showError) {
      ErrorService.showError(errorMessage);
    }

    throw new Error(errorMessage);
  }
}

export default {
  get: fetchData,
  post: postData,
}
