import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";

import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";

import Home from "./Pages/Home";
import Menu from "./Pages/Volcano";

import VolcanoInfo from "./Pages/volcano-info";
import RegisterPage from "./Pages/Register";
import LoginPage from "./Pages/Login";
import UnknownPage from "./Pages/404";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />{" "}
          <Route path="/volcano" element={<Menu />} />{" "}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/map" element={<VolcanoInfo />} />
          <Route path="/*" element={<UnknownPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
