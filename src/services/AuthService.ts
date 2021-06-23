import { User } from "../stores/AuthStore";

const path = "http://localhost:3100";

export const handleLogin = async (email: string) => {
  const userData = await fetch(`${path}/login?email=${email}`);
  const userDataJSON = await userData.json();
  const user = userDataJSON?.user;
  return user;
};

export const getUsers = async (email: string) => {
  const usersData = await fetch(`${path}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
    }),
  });
  const usersDataJSON = await usersData.json();
  debugger;
  const users = usersDataJSON?.users || [];
  return users;
};

export const searchUsers = async (email: string, query: string) => {
  const usersData = await fetch(`${path}/users?search=${query || ""}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const usersDataJSON = await usersData.json();
  debugger;
  const users = usersDataJSON?.users || [];
  return users;
};

export const getUserById = async (email: string, id: string) => {
  const usersData = await fetch(`${path}/users?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });
  const usersDataJSON = await usersData.json();
  debugger;
  const user = usersDataJSON?.users;
  return user;
};

export const createUser = async (newUserData: User, creator: User) => {
  const usersData = await fetch(`users/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newUser: newUserData,
      creator,
    }),
  });
  const usersDataJSON = await usersData.json();
  debugger;
  const { users, newUser } = usersDataJSON;
  return { users, newUser };
};
