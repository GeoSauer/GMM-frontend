async function doFetch(url, method, body) {
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };
  //TODO consider ditching this for superagent
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(url, options);
  if (res.status === 204) {
    return { error: null, data: null };
  }
  const resBody = await res.json();
  const error = res.ok ? null : resBody;
  const data = res.ok ? resBody : null;

  return { error, data };
}

export const get = (url) => doFetch(url, 'GET');
export const post = (url, body) => doFetch(url, 'POST', body);
export const put = (url, body) => doFetch(url, 'PUT', body);
export const patch = (url, body) => doFetch(url, 'PATCH', body);
export const del = (url) => doFetch(url, 'DELETE');
