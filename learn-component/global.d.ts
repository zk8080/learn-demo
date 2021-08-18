import * as axios from 'axios';

export interface MyResponseType<T = any> {
  code: string;
  message: string;
  data: T;
}

declare module 'axios' {
  // 定制业务相关的网络请求响应格式， T 是具体的接口返回类型数据
  export interface CustomSuccessData<T> {
    code: number;
    msg?: string;
    message?: string;
    data?: T;
    [keys: string]: any;
  }

  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>;
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    put<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
    patch<T = any>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig,
    ): Promise<T>;
  }
}
