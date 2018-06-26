import qs from 'qs';
import axios from 'axios';

const REQUEST_TIMEOUT_MS = 3000;
const REPO = 'Stingee';
const apiAxios = axios.create({
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'content-type': 'application/json',
  },
});

export function createErrorReducer(defaultError = '') {
  return (state, { payload = defaultError } = {}) => (
    Object.assign({}, state, {
      hasError: true,
      errorType: payload,
      loading: false,
    })
  );
}

export function requestReducer(state) {
  return Object.assign({}, state, { loading: true });
}

export function receiveReducer(state, { payload } = {}) {
  const payloadWrapper = {};
  if (payload) {
    payloadWrapper.data = payload;
  }

  const { hasError, errorType, ...stateRest } = state;
  return Object.assign({}, stateRest, payloadWrapper, { loading: false });
}

// proxy for axios that
// * adds product to query string from process.env.REPO (relayed via globals)
// TODO: look into sending product in headers so request url does not have to be modified
//       This also works well with axios instances since headers from the instance are
//       merged with headers from the request to the instance
// * optionally uses a local cache
// TODO: discuss removing cache feature until there is a need for it
export async function fetchAPI(url, options = {}, cache, cacheHash) {
  if (cache) {
    const cachedItem = cache.get(cacheHash);
    if (cachedItem) {
      return Promise.resolve(cachedItem);
    }
  }

  // Add product parameter to url search
  const [, baseUrl = '',, search = ''] = url.match(/^([^?]*)(\?(.*))?$/);
  const searchWithProduct = qs.stringify({
    ...qs.parse(search),
    product: REPO,
  });

  const response = await apiAxios(
    `${baseUrl}?${searchWithProduct}`,
    options,
  );
  if (cache && cacheHash) {
    cache.set(cacheHash, response.data);
  }
  return response.data;
}
