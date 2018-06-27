import { handleActions, createActions } from 'redux-actions';
import { createErrorReducer, requestReducer, receiveReducer, fetchAPI } from './utils/api';

const {
  requestPayment,
  receivePayment,
  errorPayment,
} =
  createActions(
    'REQUEST_PAYMENT',
    'RECEIVE_PAYMENT',
    'ERROR_PAYMENT',
  );

export default handleActions({
  REQUEST_PAYMENT: requestReducer,
  RECEIVE_PAYMENT: receiveReducer,
  ERROR_PAYMENT: createErrorReducer(),
}, {});

export function sendPayment ({ tokenId, amount }) {
  return async (dispatch) => {
    dispatch(requestPayment());

    const url = 'https://stingee-api-app.herokuapp.com/users/makePayment';

    try {
      const data = await fetchAPI(url, {
        method: 'post',
        data: {
          tokenId,
          amount
        }
      });
      dispatch(receivePayment(data));
      return data;
    } catch (error) {
      dispatch(errorPayment(error));
      throw error;
    }
  };
}

export { requestPayment, receivePayment, errorPayment };
