import {createActions, handleActions} from "redux-actions";
import {createErrorReducer, fetchAPI, receiveReducer, requestReducer} from "./utils/api";

const {
  requestSearch,
  receiveSearch,
  errorSearch,
} =
  createActions(
    'REQUEST_SEARCH',
    'RECEIVE_SEARCH',
    'ERROR_SEARCH',
  );

export default handleActions({
  REQUEST_SEARCH: requestReducer,
  RECEIVE_SEARCH: receiveReducer,
  ERROR_SEARCH: createErrorReducer(),
}, {});

export function fetchSearch ({ searchText, zip }) {
  return async (dispatch) => {
    dispatch(requestSearch());

    const url = `https://stingee-api-app.herokuapp.com/codes/search`;

    try {
      const { data } = await fetchAPI(url, {
        method: 'post',
        data: {
          searchText,
          zip
        }
      });
      dispatch(receiveSearch(data));

      return data;
    } catch (error) {
      dispatch(errorSearch(error));
      throw error;
    }
  }
}

export { requestSearch, receiveSearch, errorSearch };
