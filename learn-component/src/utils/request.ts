import axios, { AxiosInstance, AxiosRequestConfig, CustomSuccessData, AxiosResponse } from "axios";
import type { MyResponseType } from '../../global';


const httpGen = (obj: AxiosRequestConfig) => {
  // 创建axios的实例
  const service = axios.create({
    ...obj,
    timeout: 10000 // 超时时间
  });

  service.interceptors.response.use((response: AxiosResponse) => {
    return response.data;
  })

  return service;
}

export const http = httpGen({baseURL: '/api'})