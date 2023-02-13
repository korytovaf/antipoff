export const baseUrl = 'https://reqres.in/api/';

export const fetcher = (url, init, contentType = 'application/json') => {

  const options = {
    headers: new Headers({
      'Content-Type': contentType,
    }),
  };

  if (init) {
    options.method = init.method;
    options.body = JSON.stringify(init.body);
  }

  const searchParams = new URLSearchParams(init?.query).toString();

  return fetch(baseUrl + url + '?' + searchParams, options)
    .then(async (res) => {
      if (!res.ok) throw await res.json();
      return res.json();
    });
};
