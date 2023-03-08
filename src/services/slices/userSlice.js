import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import burgerApi from '../../utils/burger-api';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  loading: false,
  userDataLoading: false,
  forgotPasswordError: null,
  resetPasswordError: null,
  registerError: null,
  loginError: null,
  logoutError: null,
  changeUserDataError: null,
}

export const findUserEmail = createAsyncThunk(
  "user/findUserEmail",
  async (data) => {
    return burgerApi.findUser(data);
  })

export const resetUserPassword = createAsyncThunk(
  "user/resetUserPassword",
  async (data) => {
    return burgerApi.resetPassword(data);
  })

export const handleRegister = createAsyncThunk(
  "user/handleRegister",
  async (data) => {
    return burgerApi.register(data);
  })

export const handleLogin = createAsyncThunk(
  "user/handleLogin",
  async (data) => {
    return burgerApi.login(data);
  })

export const handleLogout = createAsyncThunk(
  "user/handleLogout",
  async (data) => {
    return burgerApi.logout(data);
  })

export const handleGetUserData = createAsyncThunk(
  "user/handleGetUserData",
  async () => {
    if (!Cookies.get("refreshToken") && !Cookies.get("accessToken")) {
      return Promise.reject();
    }
    return burgerApi.getUserData();
  })

export const handleChangeUserData = createAsyncThunk(
  "user/handleChangeUserData",
  async (data) => {
    return burgerApi.changeUserData(data);
  })

export const handleRefreshToken = createAsyncThunk(
  "user/handleRefreshToken",
  async (data) => {
    return burgerApi.updateToken(data);
  })

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {

    //forgot-passsword
    [findUserEmail.pending]: (state) => {
      state.forgotPasswordError = initialState.forgotPasswordError
      state.loading = true
    },
    [findUserEmail.fulfilled]: (state) => {
      state.forgotPasswordError = initialState.forgotPasswordError
      state.loading = initialState.loading
    },
    [findUserEmail.rejected]: (state, { error }) => {
      state.forgotPasswordError = error
      state.loading = initialState.loading
      console.log(error)
    },

    //reset-password
    [resetUserPassword.pending]: (state) => {
      state.resetPasswordError = initialState.resetPasswordError
      state.loading = true
    },
    [resetUserPassword.fulfilled]: (state) => {
      state.resetPasswordError = initialState.resetPasswordError
      state.loading = initialState.loading
    },
    [resetUserPassword.rejected]: (state, { error }) => {
      state.resetPasswordError = error
      state.loading = initialState.loading
      console.log(error)
    },

    //register
    [handleRegister.pending]: (state) => {
      state.registerError = initialState.registerError
      state.loading = true
    },
    [handleRegister.fulfilled]: (state) => {
      state.registerError = initialState.registerError
      state.loading = initialState.loading
    },
    [handleRegister.rejected]: (state, { error }) => {
      state.registerError = error
      state.loading = initialState.loading
      console.log(error)
    },

    //login
    [handleLogin.pending]: (state) => {
      state.loading = true
      state.loginError = initialState.loginError
    },
    [handleLogin.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.loading = initialState.loading
      state.loginError = initialState.loginError
    },
    [handleLogin.rejected]: (state, { error }) => {
      state.user = initialState.user
      state.loading = initialState.loading
      state.loginError = error
      console.log(error)
    },

    //logout
    [handleLogout.pending]: (state) => {
      state.loading = true
      state.logoutError = initialState.logoutError
    },
    [handleLogout.fulfilled]: (state) => {
      state.loading = initialState.loading
      state.user = initialState.user
      state.logoutError = initialState.logoutError
    },
    [handleLogout.rejected]: (state, { error }) => {
      state.loading = initialState.loading
      state.logoutError = error
      console.log(error)
    },

    //getUserData
    [handleGetUserData.pending]: (state) => {
      state.userDataLoading = true
    },
    [handleGetUserData.fulfilled]: (state, action) => {
      state.user = action.payload.user
      state.userDataLoading = initialState.userDataLoading
    },
    [handleGetUserData.rejected]: (state, { error }) => {
      state.user = initialState.user
      state.userDataLoading = initialState.userDataLoading
      console.log(error)
    },

    //changeUserData
    [handleChangeUserData.pending]: (state) => {
      state.userDataLoading = true
      state.changeUserDataError = initialState.changeUserDataError
    },
    [handleChangeUserData.fulfilled]: (state, action) => {
      state.changeUserDataError = initialState.changeUserDataError
      state.userDataLoading = initialState.userDataLoading
      state.user = action.payload.user
    },
    [handleChangeUserData.rejected]: (state, { error }) => {
      state.changeUserDataError = error
      state.userDataLoading = initialState.userDataLoading
      console.log(error)
    },
  }
})

const userReducer = userSlice.reducer

export default userReducer

export const getUser = state => state.user.user;
export const getLoading = state => state.user.loading;
export const getUserDataLoading = state => state.user.userDataLoading;
export const getFindUserError = state => state.user.findUserError;
export const getResetPasswordError = state => state.user.resetPasswordError;
export const getRegisterError = state => state.user.registerError;
export const getLoginError = state => state.user.loginError;
export const getLogoutError = state => state.user.logoutError;
export const getChangeUserDataError = state => state.user.changeUserDataError;

