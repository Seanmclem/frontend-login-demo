import React from "react";
import styled from "styled-components";
import { useAuthStore } from "../stores/AuthStore";

interface props {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDetailPage: React.FC<props> = () => {
  const loggedInUser = useAuthStore((state) => state.loggedInUser);
  debugger;
  return (
    <Container>
      <div>UserDetailPage</div>
      {loggedInUser && (
        <>
          <div>{loggedInUser.email}</div>
          <div>{loggedInUser.firstname}</div>
          <div>{loggedInUser.lastname}</div>
          <div>{loggedInUser.address}</div>
          <div>{loggedInUser.phone}</div>
          <div>{loggedInUser.role}</div>
          <div>{loggedInUser.clientid}</div>
        </>
      )}
    </Container>
  );
};
