import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import reducer from './modules/index';

const initialState = {};

export function initializeStore (state = initialState) {
  const store = createStore(reducer, state, composeWithDevTools(applyMiddleware(thunkMiddleware)))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./modules', () => {
      const nextReducer = require('./modules/index');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
