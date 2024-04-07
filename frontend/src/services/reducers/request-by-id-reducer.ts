import {
  GET_REQUEST_REQUEST,
  GET_REQUEST_SUCCESS,
  GET_REQUEST_FAILED,
  TGetRequestActions,
  MODAL_REQUEST_DETAILS_OPEN,
  MODAL_REQUEST_DETAILS_CLOSE,
} from "../actions/request-by-id-actions";
import { IRequest } from "../../utils/types";

export type TGetRequestState = {
  request: IRequest | null;
  requestRequest: boolean;
  requestFailed: boolean;
  isOpenRequest: boolean;
};

const initialState: TGetRequestState = {
  request: null,
  requestRequest: false,
  requestFailed: false,
  isOpenRequest: false,
};

export const getRequestReducer = (
  state = initialState,
  action: TGetRequestActions
) => {
  switch (action.type) {
    case GET_REQUEST_REQUEST: {
      return {
        ...state,
        requestRequest: true,
      };
    }
    case GET_REQUEST_SUCCESS: {
      return {
        ...state,
        requestFailed: false,
        request: action.requests,
        requestRequest: false,
      };
    }
    case GET_REQUEST_FAILED: {
      return {
        ...state,
        requestFailed: true,
        requestRequest: false,
      };
    }
    case MODAL_REQUEST_DETAILS_OPEN: {
      return {
        ...state,
        isOpenRequest: true,
      };
    }
    case MODAL_REQUEST_DETAILS_CLOSE: {
      return {
        ...state,
        isOpenRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
