import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { getUsers } from "../services/AuthService";
import { useAuthStore, User } from "../stores/AuthStore";

interface props {}

const Container = styled.div``;

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

  return (
    <Container>
      <ul>
        {users.map((user) => (
          <li>
            {user.email}, {user.firstname}, {user.lastname}, clientid:
            {user.clientid}
          </li>
        ))}
      </ul>
    </Container>
  );
};
