import { getRequestById } from "../../api/api";
import { IRequest } from "../../utils/types";
import { AppDispatch } from "../../services/index";

export const GET_REQUEST_REQUEST: "GET_REQUEST_REQUEST" = "GET_REQUEST_REQUEST";
export const GET_REQUEST_SUCCESS: "GET_REQUEST_SUCCESS" = "GET_REQUEST_SUCCESS";
export const GET_REQUEST_FAILED: "GET_REQUEST_FAILED" = "GET_REQUEST_FAILED";

export const MODAL_REQUEST_DETAILS_OPEN: "MODAL_REQUEST_DETAILS_OPEN" =
  "MODAL_REQUEST_DETAILS_OPEN";
export const MODAL_REQUEST_DETAILS_CLOSE: "MODAL_REQUEST_DETAILS_CLOSE" =
  "MODAL_REQUEST_DETAILS_CLOSE";

export interface IGetRequestAction {
  readonly type: typeof GET_REQUEST_REQUEST;
}

export interface IGetRequestFailedAction {
  readonly type: typeof GET_REQUEST_FAILED;
}

export interface IGetRequestSuccessAction {
  readonly type: typeof GET_REQUEST_SUCCESS;
  readonly requests: IRequest;
}

export interface IModalRequestDetailsOpenAction {
  readonly type: typeof MODAL_REQUEST_DETAILS_OPEN;
}

export interface IModalRequestDetailsCloseAction {
  readonly type: typeof MODAL_REQUEST_DETAILS_CLOSE;
}

export type TGetRequestActions =
  | IGetRequestAction
  | IGetRequestFailedAction
  | IGetRequestSuccessAction
  | IModalRequestDetailsOpenAction
  | IModalRequestDetailsCloseAction;

// Наш первый thunk
export function getRequestFromApi(number: string) {
  return function (dispatch: AppDispatch) {
    dispatch(getRequestAction());
    getRequestById(number)
      .then((res) => {
        if (res) {
          dispatch(openModalRequestDetails());
          dispatch(getRequestSuccessAction(res));
        }
      })
      .catch((err) => {
        dispatch(getRequestFailedAction());
      });
  };
}

export const getRequestAction = (): IGetRequestAction => ({
  type: GET_REQUEST_REQUEST,
});

export const getRequestFailedAction = (): IGetRequestFailedAction => ({
  type: GET_REQUEST_FAILED,
});

export const getRequestSuccessAction = (
  requests: IRequest
): IGetRequestSuccessAction => ({
  type: GET_REQUEST_SUCCESS,
  requests,
});

export function openModalRequestDetails(): IModalRequestDetailsOpenAction {
  return {
    type: MODAL_REQUEST_DETAILS_OPEN,
  };
}

export function closeModalRequestDetails(): IModalRequestDetailsCloseAction {
  return {
    type: MODAL_REQUEST_DETAILS_CLOSE,
  };
}
