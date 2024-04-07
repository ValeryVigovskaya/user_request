import {
  MODAL_REQUEST_OPEN,
  MODAL_REQUEST_CLOSE,
  TRequestsActions,
  FORM_SET_VALUE,
  FORM_SUBMIT_REQUEST,
  FORM_SUBMIT_SUCCESS,
  FORM_SUBMIT_FAILED,
} from "../actions/new-request-modal-actions";
import { IForm } from "../../utils/types";

export type TNewRequestState = {
  isOpenModal: boolean;
  form: IForm | null;
  formSubmitRequest: boolean;
  formSubmitFailed: boolean;
};

const initialState: TNewRequestState = {
  isOpenModal: false,
  form: null,
  formSubmitRequest: false,
  formSubmitFailed: false,
};

export const newRequestModalReducer = (
  state = initialState,
  action: TRequestsActions
): TNewRequestState => {
  switch (action.type) {
    case MODAL_REQUEST_OPEN:
      return {
        ...state,
        isOpenModal: true,
      };
    case MODAL_REQUEST_CLOSE:
      return {
        ...state,
        isOpenModal: true,
      };
    case FORM_SUBMIT_REQUEST:
      return {
        ...state,
        formSubmitRequest: true,
        formSubmitFailed: false,
      };
    case FORM_SUBMIT_SUCCESS: {
      return {
        ...state,
        form: {
          ...state.form,
          username: action.form.username,
          type: action.form.type,
          caption: action.form.caption,
          img: action.form.img,
        },
        formSubmitRequest: false,
      };
    }
    case FORM_SUBMIT_FAILED: {
      return {
        ...state,
        formSubmitRequest: false,
        formSubmitFailed: true,
      };
    }
    case FORM_SET_VALUE:
      return {
        ...state,
        form: action.payload,
      };
    default:
      return state;
  }
};
