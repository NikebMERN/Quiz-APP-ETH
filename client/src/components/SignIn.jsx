import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import styled from "styled-components";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SignInContainer = styled.div`
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

const Select = styled.select`
  margin-bottom: 10px;
  padding: 8px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #4caf50;
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

const LoginLink = styled(Link)`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Registration = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [icon, setIcon] = useState(true);
    const [onShow, setOnShow] = useState("password");

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await axios
                .post("http://localhost:3000/api/user/register", {
                    email: data.email,
                    registrationNumber: data.regnum,
                    name: data.name.toUpperCase(),
                    woredaNumber: data.woreda,
                    schoolName: data.school,
                    city: data.city,
                    age: data.age,
                    gender: data.gender,
                    password: data.password,
                })
                .then((res) => {
                    localStorage.setItem("x-auth-token", res.data.token);
                    // console.log(res);
                    navigate("/");
                })
                .catch((error) => {
                    setError(error.response.data.error);
                    console.log(error);
                });
        } catch (error) {
            throw error;
        }
    };
    console.log(error)

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
        <SignInContainer>
            <h1>Registration</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>Error: <ErrorMessage>{error}</ErrorMessage></Label>
                <Label>Email *:</Label>
                <Input
                    type="email"
                    name="Email"
                    placeholder="E-mail"
                    {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                    <ErrorMessage role="alert">Enter E-mail!</ErrorMessage>
                )}

                <Label>Registration Number *:</Label>
                <Input
                    type="number"
                    name="registrationNumber"
                    placeholder="Registration NO"
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

                <Label>Name *:</Label>
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your Name!</ErrorMessage>
                )}

                <Label>Woreda Number *:</Label>
                <Input
                    type="number"
                    name="woredaNumber"
                    placeholder="Woreda NO"
                    {...register("woreda", { required: true })}
                />
                {errors.woreda?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your Woreda NO!</ErrorMessage>
                )}

                <Label>School Name *:</Label>
                <Input
                    type="text"
                    name="schoolName"
                    placeholder="School Name"
                    {...register("school", { required: true })}
                />
                {errors.school?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your School Name!</ErrorMessage>
                )}

                <Label>City *:</Label>
                <Input
                    type="text"
                    name="city"
                    placeholder="Capital City"
                    {...register("city", { required: true })}
                />
                {errors.city?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your City Name!</ErrorMessage>
                )}

                <Label>Age *:</Label>
                <Input
                    type="number"
                    name="age"
                    placeholder="Age"
                    {...register("age", { required: true })}
                />
                {errors.age?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your Age!</ErrorMessage>
                )}

                <Label>Gender *:</Label>
                <Select name="gender" {...register("gender", { required: true })}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </Select>
                {errors.gender?.type === "required" && (
                    <ErrorMessage role="alert">Enter Your Gender!</ErrorMessage>
                )}

                <Label>Password *:</Label>
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

                <Button type="submit">Register</Button>
            </Form>
            <Paragraph>
                Already have an account? <LoginLink to="/login">Login</LoginLink>
            </Paragraph>
        </SignInContainer>
    );
};

export default Registration;
