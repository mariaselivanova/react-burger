import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import { HomePage, LoginPage, RegisterPage } from '../../pages';

function App() {
  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
