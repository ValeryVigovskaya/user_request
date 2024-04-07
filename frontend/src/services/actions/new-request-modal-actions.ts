import { AppDispatch } from "..";
import { IForm } from "../../utils/types";
import { postRequest } from "../../api/api";
import { getDataOnPage } from "./request-actions";

export const MODAL_REQUEST_OPEN: "MODAL_REQUEST_OPEN" = "MODAL_REQUEST_OPEN";
export const MODAL_REQUEST_CLOSE: "MODAL_REQUEST_CLOSE" = "MODAL_REQUEST_CLOSE";
export const FORM_SET_VALUE: "FORM_SET_VALUE" = "FORM_SET_VALUE";

export const FORM_SUBMIT_REQUEST: "FORM_SUBMIT_REQUEST" = "FORM_SUBMIT_REQUEST";
export const FORM_SUBMIT_SUCCESS: "FORM_SUBMIT_SUCCESS" = "FORM_SUBMIT_SUCCESS";
export const FORM_SUBMIT_FAILED: "FORM_SUBMIT_FAILED" = "FORM_SUBMIT_FAILED";

export interface IModalRequestOpenAction {
  readonly type: typeof MODAL_REQUEST_OPEN;
}

export interface IModalRequestCloseAction {
  readonly type: typeof MODAL_REQUEST_CLOSE;
}

export interface IFormValueAction {
  readonly type: typeof FORM_SET_VALUE;
  readonly payload: Readonly<IForm> | null;
}

export interface IFormSubmitRequestAction {
  readonly type: typeof FORM_SUBMIT_REQUEST;
}
export interface IFormSubmitSuccessAction {
  readonly type: typeof FORM_SUBMIT_SUCCESS;
  readonly form: IForm;
}
export interface IFormSubmitFailedAction {
  readonly type: typeof FORM_SUBMIT_FAILED;
}

export type TRequestsActions =
  | IModalRequestOpenAction
  | IModalRequestCloseAction
  | IFormValueAction
  | IFormSubmitRequestAction
  | IFormSubmitSuccessAction
  | IFormSubmitFailedAction;

export function openNewModalRequest(): IModalRequestOpenAction {
  return {
    type: MODAL_REQUEST_OPEN,
  };
}

export function closeNewModalRequest(): IModalRequestCloseAction {
  return {
    type: MODAL_REQUEST_CLOSE,
  };
}

export const setFormValue = (
  form: Readonly<IForm> | null
): IFormValueAction => ({
  type: FORM_SET_VALUE,
  payload: form,
});

export const postRequestFetch = (obj: IForm, page: number) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: FORM_SUBMIT_REQUEST,
    });
    postRequest(obj)
      .then((res) => {
        if (res) {
          dispatch({
            type: FORM_SUBMIT_SUCCESS,
            form: setFormValue(res),
          });
        }
        //вызываю посторный диспач для обновления состояния таблицы
        dispatch(getDataOnPage(page));
      })
      .catch((err) => {
        // Если сервер не вернул данных, также отправляем экшен об ошибке
        dispatch({
          type: FORM_SUBMIT_FAILED,
        });
      });
  };
};
