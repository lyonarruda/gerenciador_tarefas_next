import axios, { Method } from "axios";

export const executeRequest = (
  endpoint: string,
  method: Method,
  body?: any
) => {
  const token = localStorage.getItem("accessToken") || "";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  } as any;

  const URL = "http://localhost:3000/api/" + endpoint;

  return axios.request({
    url: URL,
    method,
    data: body || "",
    headers,
    timeout: 3000,
  });
};
