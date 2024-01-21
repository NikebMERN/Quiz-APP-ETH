import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginContainer = styled.div`
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #ff7300;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Paragraph = styled.p`
  margin-top: 10px;
  font-size: 14px;
`;

const SignINLink = styled(Link)`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [icon, setIcon] = useState(true);
    const [error, setError] = useState("");
    const [onShow, setOnShow] = useState("password");
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            await axios
                .post("http://localhost:3000/api/user/login", {
                    email: data.email,
                    registrationNumber: data.regnum,
                    password: data.password,
                })
                .then((res) => {
                    localStorage.setItem("x-auth-token", res.data.token);
                    console.log(res);
                    navigate("/");
                })
                .catch((err) => {
                    console.log(err);
                    setError(err.response.data.error);
                });
        } catch (error) {
            throw error;
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
            <h1>Login</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Error: <ErrorMessage>{error}</ErrorMessage>
                </Label>
                <Label>Email:</Label>
                <Input
                    type="email"
                    name="Email"
                    placeholder="E-mail"
                    {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                    <ErrorMessage role="alert">Enter E-mail!</ErrorMessage>
                )}

                <Label>Registration Number:</Label>
                <Input
                    type="number"
                    name="registrationNumber"
                    placeholder="Registeration NO"
                    {...register("regnum", {
                        required: true,
                        minLength: 7,
                        maxLength: 7,
                    })}
                />
                {errors.regnum?.type === "required" && (
                    <ErrorMessage role="alert">
                        Enter Your Registation Number!
                    </ErrorMessage>
                )}
                {errors.regnum?.type === "minLength" && (
                    <ErrorMessage role="alert">The min length is 7!</ErrorMessage>
                )}
                {errors.regnum?.type === "maxLength" && (
                    <ErrorMessage role="alert">The max length is 7!</ErrorMessage>
                )}

                <Label>Password:</Label>
                <div>
                    <Input
                        type={onShow}
                        name="password"
                        placeholder="Password"
                        {...register("password", {
                            required: true,
                            minLength: 8,
                            maxLength: 20,
                        })}
                        style={{ width: 380 }}
                    />
                    {icon && (
                        <VisibilityIcon
                            onClick={show}
                            style={{ marginLeft: -35, marginBottom: -6 }}
                        />
                    )}
                    {!icon && (
                        <VisibilityOffIcon
                            onClick={show}
                            style={{ marginLeft: -35, marginBottom: -6 }}
                        />
                    )}
                </div>
                {errors.password?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your Password!</ErrorMessage>
                )}
                {errors.password?.type === "minLength" && (
                    <ErrorMessage role="alert">At least enter 8 character!</ErrorMessage>
                )}
                {errors.password?.type === "maxLength" && (
                    <ErrorMessage role="alert">
                        Your password length must be below 20!
                    </ErrorMessage>
                )}

                <Button type="submit">Login</Button>
            </Form>
            <Paragraph>
                You don't have an account.
                <SignINLink to="/register">Create on here.</SignINLink>
            </Paragraph>
        </LoginContainer>
    );
};

export default Login;
