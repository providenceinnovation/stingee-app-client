import { handleActions, createActions } from 'redux-actions';
import { createErrorReducer, requestReducer, receiveReducer, fetchAPI } from './utils/api';

const {
  requestPayments,
  receivePayments,
  errorPayments,
} =
  createActions(
    'REQUEST_PAYMENTS',
    'RECEIVE_PAYMENTS',
    'ERROR_PAYMENTS',
  );

export default handleActions({
  REQUEST_PAYMENTS: requestReducer,
  RECEIVE_PAYMENTS: receiveReducer,
  ERROR_PAYMENTS: createErrorReducer(),
}, {});

export function fetchPayments () {
  return async (dispatch) => {
    dispatch(requestPayments());

    const USER_ID = 'a8hfg8agfgeg';
    const url = `https://stingee-api-app.herokuapp.com/users/${USER_ID}/payments`;

    try {
      // const { data } = await fetchAPI(url) || {};
      const data = [
        { _id: 1, cost: '47100', provider: 'Dr. Dredd', location: 'Redmond, WA', date: '04/08/2018', status: 'paid' },
        { _id: 2, cost: '8800', provider: 'Dr. Pain', location: 'Redmond, WA', date: '02/11/2018', status: 'paid' },
        { _id: 3, cost: '9800', provider: 'Dr. Pain', location: 'Seattle, WA', date: '12/01/2017', status: 'paid' },
        { _id: 4, cost: '4500', provider: 'Dr. Pain', location: 'Redmond Sprained Neck Doctor', date: '03/27/2018', status: 'unpaid' },
        { _id: 5, cost: '9600', provider: 'Dr. Pain', location: 'Redmond Sprained Neck Doctor', date: '02/25/2018', status: 'unpaid' },
      ];

      dispatch(receivePayments(data));

      return data;
    } catch (error) {
      dispatch(errorPayments(error));
      throw error;
    }
  };
}

export { requestPayments, receivePayments, errorPayments };
