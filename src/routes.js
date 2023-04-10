import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import { useLocation } from "react-router-dom";
import Home from "./pages/Home";
const routes = [
  {
    path: "/",
    exact: true,
    element: <Home />,
    private: true,
  },
];

export default function Navigation() {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
