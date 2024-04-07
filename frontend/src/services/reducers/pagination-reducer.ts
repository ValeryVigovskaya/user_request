import {
  BUTTON_NEXT,
  BUTTON_PREV,
  TPaginationActions,
} from "../actions/pagination-actions";

export type TPaginationState = {
  page: number;
};

const initialState: TPaginationState = {
  page: 1,
};

export const paginationReducer = (
  state = initialState,
  action: TPaginationActions
) => {
  switch (action.type) {
    case BUTTON_NEXT: {
      return {
        ...state,
        page: action.page + 1,
      };
    }
    case BUTTON_PREV: {
      return {
        ...state,
        page: action.page - 1,
      };
    }
    default: {
      return state;
    }
  }
};
