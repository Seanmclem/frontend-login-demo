import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { handleLogin } from "../services/AuthService";
import { User, useAuthStore } from "../stores/AuthStore";
import { useHistory } from "react-router-dom";

interface props {}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginFormContainer = styled.div`
  background-color: lightgray;
  /* min-height: 300px; */
  padding: 50px;

  form: {
    display: flex;
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding-bottom: 15px;
`;

export const LoginSignupPage: React.FC<props> = () => {
  const history = useHistory();
  const [formType, setFormType] = useState<"login" | "signup">("signup");
  const setLoginUser = useAuthStore((state) => state.setLoginUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (formType === "login") {
      console.log(formType, { ...data });
      const user: User = await handleLogin(data.email);
      setLoginUser(user);
      if (user) {
        history.push("/user");
      }
    }
    if (formType === "signup") {
      console.log(formType, { ...data });
    }
  };

  return (
    <Container>
      <LoginFormContainer>
        <NavContainer>
          <button onClick={() => setFormType("login")}>Login</button>
          <button onClick={() => setFormType("signup")}>Signup</button>
        </NavContainer>
        {formType === "login" && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="email">
              Email:
              <input
                id="email"
                type="text"
                {...register("email", { required: true })}
              />
            </Label>
            <input type="submit" value="Login" />
          </Form>
        )}
        {formType === "signup" && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Label htmlFor="firstname">
              First Name:
              <input
                id="firstname"
                type="text"
                {...register("firstname", { required: true })}
              />
            </Label>
            <Label htmlFor="lastname">
              Last Name:
              <input
                id="lastname"
                type="text"
                {...register("lastname", { required: true })}
              />
            </Label>
            <Label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
            </Label>
            <Label htmlFor="phone">
              Phone:
              <input
                id="phone"
                type="text"
                {...register("phone", { required: true })}
              />
            </Label>
            <Label htmlFor="address">
              Address:
              <input
                id="address"
                type="text"
                {...register("address", { required: true })}
              />
            </Label>
            <Label htmlFor="role">
              Role:
              <select {...register("role", { required: true })}>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
                <option selected value="user">
                  User
                </option>
              </select>
            </Label>
            <Label htmlFor="clientid">
              Client id:
              <input
                id="clientid"
                type="text"
                {...register("clientid", { required: true })}
              />
            </Label>
            <input type="submit" value="Signup" />
          </Form>
        )}
      </LoginFormContainer>
    </Container>
  );
};
