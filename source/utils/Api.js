export const BASE_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/';
export const API_HOST = 'omgvamp-hearthstone-v1.p.rapidapi.com';
export const API_KEY = 'ff62da1274msh6d77b7eb07a0a41p184658jsne286e12594af';

export const iFetch = (url, opts = {}, onProgress) => {
  return new Promise((res, rej) => {
    var xhr = new XMLHttpRequest();
    xhr.open(opts.method || 'get', url);
    for (var k in opts.headers || {}) xhr.setRequestHeader(k, opts.headers[k]);
    xhr.onload = e => res(e.target.responseText);
    xhr.onerror = rej;
    if (xhr.upload && onProgress instanceof Function)
      xhr.upload.onprogress = onProgress;
    xhr.send(opts.body);
  });
};

export const iFetchPost = async (endpoint = '', opts = {}, onProgress) => {
  const url = `${BASE_URL}/${endpoint}`;
  opts.method = 'POST';
  opts.headers = {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  };

  try {
    const response = await iFetch(url, opts, onProgress);
    return JSON.parse(response);
  } catch (error) {
    // console.log('iFetchPost', error);
  }
};

export const iFetchGet = async (endpoint = '', opts = {}, onProgress) => {
  const url = `${BASE_URL}/${endpoint}`;
  opts.method = 'GET';
  opts.headers = {
    'x-rapidapi-host': API_HOST,
    'x-rapidapi-key': API_KEY,
  };

  try {
    const response = await iFetch(url, opts, onProgress);
    return JSON.parse(response);
  } catch (error) {
    // console.log('iFetchGet', error);
  }
};

export const AllCards = async onProgress => {
  return await iFetchGet('cards', {}, onProgress);
};

export const AllDataSets = async (set, onProgress) => {
  return await iFetchGet(`cards/sets/${set}`, {}, onProgress);
};

export const SingleCard = async (cardName, onProgress) => {
  return await iFetchGet(`cards/${cardName}`, {}, onProgress);
};

export const SearchCard = async (cardName, onProgress) => {
  return await iFetchGet(`cards/search/${cardName}`, {}, onProgress);
};
