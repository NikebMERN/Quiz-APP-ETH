import React, { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
`;

const LoginHeader = styled.h2`
  color: #333;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginLabel = styled.label`
  margin-bottom: 10px;
  color: #333;
`;

const LoginInput = styled.input`
  padding: 8px;
  padding-right: 220px;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  margin-bottom: 10px;
`;

const LoginButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [icon, setIcon] = useState(true);
  const [err, setErr] = useState("");
  const [onShow, setOnShow] = useState("password");

  const onSubmit = async (data) => {
    try {
      // Make an API request to the backend for admin login
      await api
        .post("/api/admin/login", data)
        .then((response) => {
          // Assuming the backend sends a token upon successful login
          const token = response.data.admin.token;

          // Save the token in localStorage or a state management solution
          localStorage.setItem("adminToken", token);

          // Navigate to the admin dashboard or other protected routes
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
          setErr(err.response.data.error);
        });
    } catch (error) {
      console.error("Login error:", error);
      // Handle login failure, show error message, etc.
    }
  };

  const show = () => {
    if (onShow === "password") {
      setOnShow("text");
      setIcon(false);
    } else {
      setIcon(true);
      setOnShow("password");
    }
  };

  return (
    <LoginContainer>
      <LoginHeader>Admin Login</LoginHeader>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
      Error: <ErrorMessage>{err}</ErrorMessage>
        <LoginLabel>Password:</LoginLabel>
        {errors.password?.type === "required" && (
          <ErrorMessage role="alert">Enter password!</ErrorMessage>
        )}
        {errors.password?.type === "minLength" && (
          <ErrorMessage role="alert">
            The password must contain at least 8 character.
          </ErrorMessage>
        )}
        <div>
        <LoginInput
          type={onShow}
          name="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {icon && <VisibilityIcon onClick={show} style={{ marginLeft: -35, marginBottom: -6 }} />}
        {!icon && <VisibilityOffIcon onClick={show} style={{ marginLeft: -35, marginBottom: -6 }} />}
        </div>
        <LoginButton type="submit">Login</LoginButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
