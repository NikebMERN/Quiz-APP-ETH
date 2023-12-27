import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import QuestionList from "./components/QuestionList";
import Dashboard from "./components/Dashboard";
import QuestionForm from "./components/QuestionForm";
import UserList from "./components/UserList";

const App = () => {
  const navigate = useNavigate();
  const isUserLoggedIn = !!localStorage.getItem("adminToken");

  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [navigate, isUserLoggedIn]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/question/list" element={<QuestionList />} />
      <Route path="/user/list" element={<UserList />} />
      <Route path="/upload" element={<QuestionForm />} />
      <Route index element={<Dashboard />} />
    </Routes>
  );
};

export default App;
