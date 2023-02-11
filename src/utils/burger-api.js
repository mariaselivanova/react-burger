import { API_URL } from "./data";

class BurgerApi {
  constructor(config) {
    this._headers = config.headers;
  }

  _handleRes(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  }

  getAllIngredients() {
    return fetch(`${API_URL}ingredients`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._handleRes(res))
  }
}

const burgerApi = new BurgerApi({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default burgerApi
