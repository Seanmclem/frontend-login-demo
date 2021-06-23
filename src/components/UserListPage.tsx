import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { createUser, getUsers } from "../services/AuthService";
import { useAuthStore, User } from "../stores/AuthStore";
import { SearchForm } from "./SearchForm";

interface props {}

const Container = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  padding: 15px;
  margin: 15px;
  background: aliceblue;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

export const UserListPage: React.FC<props> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const loggedInUser = useAuthStore((state) => state.loggedInUser);

  const getUsersListings = async () => {
    const fetchedUsers = (await getUsers(loggedInUser?.email || "")) || [];
    debugger;
    setUsers(fetchedUsers);
  };

  const history = useHistory();

  useEffect(() => {
    if (!loggedInUser) {
      history.push("/");
    } else {
      getUsersListings();
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    console.log("data", { ...data });
    debugger;
    if (loggedInUser) {
      const { users } = await createUser(data, loggedInUser);
      setUsers(users);
      event.target.reset();
    }
    //   const newUserData = await createUser(data, data);

    //   if (newUserData.newUser) {
    //     setLoginUser(newUserData.newUser);
    //     history.push("/users");
    //   }
  };

  return (
    <Container>
      <h4>Client Id: {loggedInUser?.clientid}</h4>
      {loggedInUser && (
        <SearchForm setUsers={setUsers} loggedInUser={loggedInUser} />
      )}
      <ul>
        {users.map((user) => (
          <li>
            <Link to={`/user/${user.objectId}`}>
              {user.email}, {user.firstname}, {user.lastname}, clientid:
              {user.clientid}
            </Link>
          </li>
        ))}
      </ul>
      {loggedInUser?.role !== "user" && (
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
              defaultValue={
                loggedInUser?.role === "client" ? loggedInUser?.clientid : ""
              }
              readOnly={loggedInUser?.role === "client"}
              {...register("clientid", { required: true })}
            />
          </Label>
          <input type="submit" value="Create User" />
        </Form>
      )}
    </Container>
  );
};
