// utils/fetcher.js

const fetchApiData = async (url, method = "GET", body = null) => {
  const options = {
    method: method,
    headers: {
      "Content-type": "application/json",
      'Cache-Control': 'no-store',
    },
    mode: 'cors',
    redirect: 'follow',
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      return Promise.reject(response.status);
    }
    const payload = await response.json();
    return payload != null && payload != undefined ? JSON.parse(JSON.stringify(payload)) : [];
  } catch (error) {
    console.error('Error fetching:', error);
    return [];
  }
};

export const fetcher = (url, method = "GET", body = null) => {
  if (Array.isArray(url)) {
    [url, method, body] = url;
  }
  return fetchApiData(url, method, body);
};

export default fetchApiData;
