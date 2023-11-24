import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import store from "./redux/store"; // Import the Redux store

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./modules/forms/Login";
import Register from "./modules/forms/Register";
import HomePage from "./modules/pages/HomePage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  </Provider>
);

reportWebVitals();
