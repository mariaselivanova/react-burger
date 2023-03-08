import { API_URL } from "./data";

class BurgerApi {
  constructor(config) {
    this._headers = config.headers;
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkRes)
  }

  _checkRes(res) {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
  }

  _requestWithNewToken = async (url, options) => {
    try {
      const res = await this._request(url, options)
      return res
    }
    catch (err) {
      if (err.message === "jwt expired") {
        const newTokens = await this.updateToken()
        localStorage.setItem("accessToken", newTokens.accessToken)
        localStorage.setItem("refreshToken", newTokens.refreshToken)
        if (newTokens) {
          options.headers.authorization = newTokens.accessToken
        }
        return this._request(url, options)
      } else {
        console.log(err)
        localStorage.clear()
        return Promise.reject(err)
      }
    }
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

  register(data) {
    return this._request(`${API_URL}auth/register`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  login(data) {
    return this._request(`${API_URL}auth/login`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  findUser(data) {
    return this._request(`${API_URL}password-reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  resetPassword(data) {
    return this._request(`${API_URL}password-reset/reset`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  logout(data) {
    return this._request(`${API_URL}auth/logout`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
  }

  getUserData() {
    return this._requestWithNewToken(`${API_URL}auth/user`, {
      method: 'GET',
      headers: {
        ...this._headers,
        authorization: localStorage.getItem('accessToken'),
      }
    })
  }

  changeUserData(data) {
    return this._requestWithNewToken(`${API_URL}auth/user`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        authorization: localStorage.getItem('accessToken')
      },
      body: JSON.stringify(data)
    })
  }

  updateToken() {
    return this._request(`${API_URL}auth/token`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
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
