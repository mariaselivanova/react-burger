import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage, PageNotFound } from '../../pages';
import { getUser, handleGetUserData } from '../../services/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ProtectedRouteElement } from '../ProtectedRouteElement/ProtectedRouteElement';
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from '../Modal/Modal';
import { clearSelectedIngredient } from '../../services/slices/ingredientSlice';

function App() {
  const user = useSelector(getUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();
  let background = location.state && location.state.background;

  useEffect(() => {
    !user && dispatch(handleGetUserData())
  }, [user, dispatch])

  const closeIngredientModal = (e) => {
    navigate(-1)
    dispatch(clearSelectedIngredient())
  }

  return (
    <>
      <AppHeader />
      <Routes location={background || location} >
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<ProtectedRouteElement onlyNotAuth element={<LoginPage />} />} />
        <Route path="/register" element={<ProtectedRouteElement onlyNotAuth element={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<ProtectedRouteElement onlyNotAuth element={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<ProtectedRouteElement onlyNotAuth onlyAfterForgotPassword element={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}> <Route path="orders" element={<ProtectedRouteElement />} /></Route>
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {background &&
        <Routes>
          <Route path="/ingredients/:id" element={<Modal title="Детали ингредиента" onClose={closeIngredientModal}> <IngredientDetails /> </Modal>} />
        </Routes>
      }
    </>
  )
}

export default App;
