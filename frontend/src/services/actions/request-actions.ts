import { IRequest } from "../../utils/types";
import { AppDispatch } from "../../services/index";
import { getDataOnPageReq, getDataReq } from "../../api/api";

export const GET_DATA_REQUEST: "GET_DATA_REQUEST" = "GET_DATA_REQUEST";
export const GET_DATA_SUCCESS: "GET_DATA_SUCCESS" = "GET_DATA_SUCCESS";
export const GET_DATA_FAILED: "GET_DATA_FAILED" = "GET_DATA_FAILED";

export const GET_DATA_REQUEST_ON_PAGE: "GET_DATA_REQUEST_ON_PAGE" =
  "GET_DATA_REQUEST_ON_PAGE";
export const GET_DATA_SUCCESS_ON_PAGE: "GET_DATA_SUCCESS_ON_PAGE" =
  "GET_DATA_SUCCESS_ON_PAGE";
export const GET_DATA_FAILED_ON_PAGE: "GET_DATA_FAILED_ON_PAGE" =
  "GET_DATA_FAILED_ON_PAGE";

export interface IGetDataAction {
  readonly type: typeof GET_DATA_REQUEST;
}

export interface IGetDataFailedAction {
  readonly type: typeof GET_DATA_FAILED;
}

export interface IGetDataSuccessAction {
  readonly type: typeof GET_DATA_SUCCESS;
  readonly data: IRequest[];
}

export interface IGetDataOnPageAction {
  readonly type: typeof GET_DATA_REQUEST_ON_PAGE;
}

export interface IGetDataFailedOnPageAction {
  readonly type: typeof GET_DATA_FAILED_ON_PAGE;
}

export interface IGetDataSuccessOnPageAction {
  readonly type: typeof GET_DATA_SUCCESS_ON_PAGE;
  readonly data: {
    objectsOnPage: IRequest[];
    totalCount: number;
  };
}

export type TRequestsActions =
  | IGetDataAction
  | IGetDataFailedAction
  | IGetDataSuccessAction
  | IGetDataOnPageAction
  | IGetDataFailedOnPageAction
  | IGetDataSuccessOnPageAction;

export const getDataAction = (): IGetDataAction => ({
  type: GET_DATA_REQUEST,
});

export const getDataFailedAction = (): IGetDataFailedAction => ({
  type: GET_DATA_FAILED,
});

export const getDataSuccessAction = (
  data: IRequest[]
): IGetDataSuccessAction => ({
  type: GET_DATA_SUCCESS,
  data,
});

export const getDataOnPageAction = (): IGetDataOnPageAction => ({
  type: GET_DATA_REQUEST_ON_PAGE,
});

export const getDataFailedOnPageAction = (): IGetDataFailedOnPageAction => ({
  type: GET_DATA_FAILED_ON_PAGE,
});

export const getDataSuccessOnPageAction = (data: {
  objectsOnPage: IRequest[];
  totalCount: number;
}): IGetDataSuccessOnPageAction => ({
  type: GET_DATA_SUCCESS_ON_PAGE,
  data,
});

export function getData() {
  return function (dispatch: AppDispatch) {
    dispatch(getDataAction());
    getDataReq()
      .then((res) => {
        if (res) {
          dispatch(getDataSuccessAction(res));
        }
      })
      .catch((err) => {
        dispatch(getDataFailedAction());
      });
  };
}

export function getDataOnPage(page: number) {
  return function (dispatch: AppDispatch) {
    dispatch(getDataOnPageAction());
    getDataOnPageReq(page)
      .then((res) => {
        if (res) {
          dispatch(getDataSuccessOnPageAction(res));
        }
      })
      .catch((err) => {
        dispatch(getDataFailedOnPageAction());
      });
  };
}
