// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
import HomePage from "./modules/pages/HomePage";
import LoginForm from "./modules/forms/LoginForm";
import RegisterForm from "./modules/forms/RegisterForm";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);

reportWebVitals();
