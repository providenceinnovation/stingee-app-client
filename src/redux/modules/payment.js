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

export function sendPayment ({ tokenId }) {
  return async (dispatch) => {
    dispatch(requestPayment());

    const url = 'http://172.29.131.40:8081/users/makePayment';

    try {
      const data = await fetchAPI(url, {
        method: 'post',
        data: {
          tokenId
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
