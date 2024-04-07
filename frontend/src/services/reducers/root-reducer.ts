import { combineReducers } from "redux";
import { newRequestModalReducer } from "./new-request-modal-reducer";
import { requestsReducer } from "./requests-reducer";
import { getRequestReducer } from "./request-by-id-reducer";
import { paginationReducer } from "./pagination-reducer";

export const rootReducer = combineReducers({
  requests: requestsReducer,
  newRequestModal: newRequestModalReducer,
  getRequest: getRequestReducer,
  pagination: paginationReducer,
});
