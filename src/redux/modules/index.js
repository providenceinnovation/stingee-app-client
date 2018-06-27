import { combineReducers } from 'redux';

import payment from './payment';
import payments from './payments';
import codeSearch from './codeSearch';

export default combineReducers({
  payment,
  payments,
  codeSearch
});
