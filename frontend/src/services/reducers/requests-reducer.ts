import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  GET_DATA_REQUEST_ON_PAGE,
  GET_DATA_SUCCESS_ON_PAGE,
  GET_DATA_FAILED_ON_PAGE,
  TRequestsActions,
} from "../actions/request-actions";
import { IRequest } from "../../utils/types";

export type TRequestsState = {
  requests: IRequest[];
  requestsRequest: boolean;
  requestsFailed: boolean;
  objectsOnPage: IRequest[];
  totalCount: number;
  objectsOnPageRequest: boolean;
  objectsOnPageFailed: boolean;
};

const initialState: TRequestsState = {
  requests: [],
  requestsRequest: false,
  requestsFailed: false,
  objectsOnPage: [],
  totalCount: 0,
  objectsOnPageRequest: false,
  objectsOnPageFailed: false,
};

export const requestsReducer = (
  state = initialState,
  action: TRequestsActions
) => {
  switch (action.type) {
    case GET_DATA_REQUEST: {
      return {
        ...state,
        requestsRequest: true,
      };
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        requestsFailed: false,
        requests: action.data,
        requestsRequest: false,
      };
    }
    case GET_DATA_FAILED: {
      return {
        ...state,
        requestsFailed: true,
        requestsRequest: false,
      };
    }
    case GET_DATA_REQUEST_ON_PAGE: {
      return {
        ...state,
        objectsOnPageRequest: true,
      };
    }
    case GET_DATA_SUCCESS_ON_PAGE: {
      return {
        ...state,
        objectsOnPageFailed: false,
        objectsOnPage: action.data.objectsOnPage,
        totalCount: action.data.totalCount,
        objectsOnPageRequest: false,
      };
    }
    case GET_DATA_FAILED_ON_PAGE: {
      return {
        ...state,
        objectsOnPageFailed: true,
        objectsOnPageRequest: false,
      };
    }
    default: {
      return state;
    }
  }
};
