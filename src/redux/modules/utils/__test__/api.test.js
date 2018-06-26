import axios from 'axios';
import { requestReducer, receiveReducer, createErrorReducer, fetchAPI } from 'redux/modules/utils/api';

jest.mock('../globals', () => ({
  globalsFetch: () => ({
    REPO: 'the-repo-from-globals-fetch',
  }),
}));
const errorReducer = createErrorReducer();
describe('api reducers', () => {
  test('request has correct state after single call with missing payload', () => {
    let state = {};
    state = requestReducer(state, {
      type: 'REQUEST',
    });

    expect(state).toEqual({ loading: true });
  });

  test('receive has correct state after single call with missing payload', () => {
    let state = { data: { name: 'Test' } };
    state = receiveReducer(state, {
      type: 'RECEIVE',
    });

    expect(state).toEqual({ data: { name: 'Test' }, loading: false });
  });

  test('receive has correct state after single call with missing action', () => {
    let state = {};
    state = receiveReducer(state);

    expect(state).toEqual({ loading: false });
  });

  test('receive has correct state after multiple calls', () => {
    let state = {};
    state = receiveReducer(state, {
      type: 'RECEIVE',
      payload: { name: 'Test' },
    });

    state = receiveReducer(state, {
      type: 'RECEIVE',
      payload: { name: 'Test 2' },
    });

    expect(state).toEqual({ data: { name: 'Test 2' }, loading: false });
  });

  test('error has correct state after single call with missing payload', () => {
    let state = {};

    state = errorReducer(state, {
      type: 'ERROR',
    });

    expect(state).toEqual({ errorType: '', hasError: true, loading: false });
  });

  test('error has correct state after multiple calls', () => {
    let state = {};
    state = errorReducer(state, {
      type: 'ERROR',
      payload: 'error1',
    });

    state = errorReducer(state, {
      type: 'ERROR',
      payload: 'error2',
    });

    expect(state).toEqual({ errorType: 'error2', hasError: true, loading: false });
  });

  test('error creator correctly generates error reducer', () => {
    const state = createErrorReducer('DEFAULT_ERROR')({});
    expect(state).toEqual({ errorType: 'DEFAULT_ERROR', hasError: true, loading: false });
  });
});

describe('api fetchAPI', () => {
  const MOCK_URL = 'http://example.com/api';

  afterEach(() => {
    axios.mock.restore();
  });
  it('handles timed-out requests with ECONNABORTED', async () => {
    axios.mock.onGet().timeout();
    try {
      await fetchAPI('http://example.com/');
    } catch (e) {
      expect(e.code).toEqual('ECONNABORTED');
      return;
    }
    throw new Error('fail');
  });
  it('adds content-type application/json header to the existing list of headers', (done) => {
    axios.mock.onGet().reply((config) => {
      expect(config.headers['Content-Type']).toEqual('application/json');
      expect(config.headers.testHeader).toEqual('test');
      done();
    });
    fetchAPI('http://example.com/', {
      headers: { testHeader: 'test' },
    });
  });
  describe('adding product = process.env.REPO to search string of request url', () => {
    it('happens with other query params specified', (done) => {
      axios.mock.onGet().reply((config) => {
        expect(config.url).toEqual('http://example.com/?thomas=hallock&product=the-repo-from-globals-fetch');
        done();
      });
      fetchAPI('http://example.com/?thomas=hallock');
    });
    it('happens with no other query params specified', (done) => {
      axios.mock.onGet().reply((config) => {
        expect(config.url).toEqual('http://example.com/?product=the-repo-from-globals-fetch');
        done();
      });
      fetchAPI('http://example.com/');
    });
  });

  describe('cache', () => {
    test('it can pull payload from cache', () => {
      const options = { headers: { testHeader: 'test' } };
      const cacheHash = 'foobar';
      const mockCache = {
        get: x => ({ mockData: x }),
        set: (hash, data) => (data),
      };
      try {
        const result = fetchAPI(MOCK_URL, options, mockCache, cacheHash);
        expect(result).toEqual(Promise.resolve({ mockData: cacheHash }));
      } catch (err) { fail(err); }
    });

    test('it can set value cache if it is not found', () => {
      const options = { headers: { testHeader: 'test' } };
      const cacheHash = 'foobar';
      const mockCache = {
        get: () => null,
        set: x => (x),
      };
      try {
        const result = fetchAPI(MOCK_URL, options, mockCache, cacheHash);
        expect(result).toEqual(Promise.resolve({ mockData: cacheHash }));
      } catch (err) { fail(err); }
    });
  });
});
