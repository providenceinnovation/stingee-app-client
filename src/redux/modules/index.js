import { combineReducers } from 'redux';

import payment from './payment';
import payments from './payments';

export default combineReducers({
  payment,
  payments,
});
