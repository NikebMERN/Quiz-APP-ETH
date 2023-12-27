import React from "react";
import SignIn from "./components/SignIn";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/404Page";
import QuestionPage from "./components/Question";
import Fail from "./components/Fail";

const App = () => {
  return (
    <>
      {!localStorage.getItem("x-auth-token") ? (
        <Routes>
          <Route path="/register" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/register" element={<SignIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/fail/:id" element={<Fail />} />
          <Route path="/question/:subject/:id" element={<QuestionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

export default App;
