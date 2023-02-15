import { API_URL } from "./data";

class BurgerApi {
  constructor(config) {
    this._headers = config.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkRes)
  }

  _checkRes(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  getAllIngredients() {
   return this._request(`${API_URL}ingredients`, {
      method: 'GET',
      headers: this._headers
    })
  }

  makeNewOrder(ingredients) {
    return this._request(`${API_URL}orders`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ingredients })
    })
  }
}

const burgerApi = new BurgerApi({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default burgerApi
