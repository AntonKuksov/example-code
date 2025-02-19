import { AxiosRequestConfig } from "axios";

export const header: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
};
