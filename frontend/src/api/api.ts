import { IForm, IRequest } from "../utils/types";

const BASE_URL = "http://localhost:4000";

const request = <T>(
  endpoint: RequestInfo | URL,
  options?: RequestInit
): Promise<T> => {
  return fetch(`${BASE_URL}${endpoint}`, options).then(checkResponse);
};

const checkResponse = (res: Response) => {
  return res.ok
    ? res.json()
    : res.json().then((err: string) => Promise.reject(err));
};

export const getDataReq = (): Promise<IRequest[]> => {
  return request("/requests");
};

export const getDataOnPageReq = (
  page: number
): Promise<{
  objectsOnPage: IRequest[];
  totalCount: number;
}> => {
  return request(`/requests/page?page=${page}`);
};

export const getRequestById = (number: string): Promise<IRequest> => {
  return request(`/requests/${number}`);
};

export const postRequest = (obj: IForm): Promise<IRequest> => {
  return request("/requests", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
};
