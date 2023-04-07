import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './components/home';
import SiteHead from "./components/home/SiteHead";
import SiteFooter from "./components/home/SiteFooter";
import MenuPage from "./components/menu/menu";
import SalesPage from "./components/Sales/SalesPage";
import LoginPage from "./components/auth/login/LoginPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterPage from "./components/auth/register/RegisterPage";
import AccountPage from "./components/auth/AccountPage";
import BagPage from "./components/home/bag";
import ResetPasswordPage from "./components/auth/ResetPassword/ResetPassword";
import MakeResetPassword from "./components/auth/ResetPassword/MakeResetPassword";
import ConfirmAccount from "./components/auth/ConfirmAccount";
import AboutUsPage from "./components/aboutUs/AboutUs"
import PayingForm from "./components/Paying/PayingForm";

function App() {
  return (    
    <>
      <Router>
        <SiteHead />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/account" element={<AccountPage/>}/>
          <Route path="/bag" element={<BagPage/>}/>
          <Route path="/resetPass" element={<ResetPasswordPage/>}/>
          <Route path="/resetpassword" element={<MakeResetPassword />} />
          <Route path="/accountConfirm" element={<ConfirmAccount/>}/>
          <Route path="/about" element={<AboutUsPage/>}/>
          <Route path="/pay" element={<PayingForm/>}/>
        </Routes>
        <SiteFooter />
      </Router>
    </>
  );
}


export default App;

