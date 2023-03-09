import { API_URL } from "./data";
import Cookies from 'js-cookie';

class BurgerApi {
  constructor(config) {
    this._headers = config.headers;
  }

  _request(endpoint, options) {
    return fetch(`${API_URL}${endpoint}`, options).then(this._checkRes);
  }

   _checkRes(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  }

  _requestWithNewToken = async (endpoint, options) => {
    try {
      const res = await this._request(endpoint, options)
      return res
    }
    catch (err) {
      if (err.message === "jwt expired") {
        const newTokens = await this.updateToken()
        Cookies.set("accessToken", newTokens.accessToken.substring(7), { expires: 1 })
        Cookies.set("refreshToken", newTokens.refreshToken, { expires: 1 })
        if (newTokens) {
          options.headers.authorization = newTokens.accessToken
        }
        return this._request(endpoint, options)
      } else {
        console.log(err)
        return Promise.reject(err)
      }
    }
  }

  getAllIngredients() {
    return this._request('ingredients', {
      method: 'GET',
      headers: this._headers
    })
  }

  makeNewOrder(ingredients) {
    return this._request('orders', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ ingredients })
    })
  }

  register(data) {
    return this._request('auth/register', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  login(data) {
    return this._request('auth/login', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  findUser(data) {
    return this._request('password-reset', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  resetPassword(data) {
    return this._request('password-reset/reset', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  logout(data) {
    return this._request('auth/logout', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  getUserData() {
    return this._requestWithNewToken('auth/user', {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + Cookies.get('accessToken'),
      }
    })
  }

  changeUserData(data) {
    return this._requestWithNewToken('auth/user', {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: 'Bearer ' + Cookies.get('accessToken'),
      },
      body: JSON.stringify(data)
    })
  }

  updateToken() {
    return this._request('auth/token', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token: Cookies.get("refreshToken"),
      })
    })
  }

}

const burgerApi = new BurgerApi({
  headers: {
    'Content-Type': 'application/json',
  }
});

export default burgerApi
