import { setReducer } from 'redux/modules/utils/base';

describe('setReducer', () => {
  test('has the correct state for reducer', () => {
    let state = { hello: 'world' };
    state = setReducer(state, { payload: { test: 'test payload' } });
    expect(state).toEqual({
      test: 'test payload',
    });
  });

  test('has the correct state for reducer after missing payload', () => {
    let state = { test: 'testing' };
    state = setReducer(state);
    expect(state).toEqual();
  });

  test('has the correct state after multiple calls', () => {
    let state = {};
    state = setReducer(state, { payload: { hello: 'hello', world: 'hello' } });
    state = setReducer(state, { payload: { world: 'world' } });
    expect(state).toEqual({ world: 'world' });
  });
});
