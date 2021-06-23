import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useAuthStore, User } from "../stores/AuthStore";
import { getUserById } from "../services/AuthService";

interface props {}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const UserDetailPage: React.FC<props> = () => {
  const { id } = useParams() as { id?: string };
  const [userDetail, setUserDetail] = useState<User | undefined>(undefined);

  const getUserDetail = async () => {
    const fetchedUser =
      (await getUserById(loggedInUser?.email || "", id || "")) || undefined;
    debugger;
    setUserDetail(fetchedUser);
  };

  useEffect(() => {
    if (id) {
      debugger;
      getUserDetail();
    }
  }, []);

  const loggedInUser = useAuthStore((state) => state.loggedInUser);
  debugger;
  return (
    <Container>
      <div>UserDetailPage</div>
      {loggedInUser?.role !== "user" && <Link to="/users">{`< Go Back`}</Link>}

      {id
        ? userDetail && (
            <ul>
              <li>{userDetail.email}</li>
              <li>{userDetail.firstname}</li>
              <li>{userDetail.lastname}</li>
              <li>{userDetail.address}</li>
              <li>{userDetail.phone}</li>
              <li>{userDetail.role}</li>
              <li>{userDetail.clientid}</li>
            </ul>
          )
        : loggedInUser && (
            <ul>
              <li>{loggedInUser.email}</li>
              <li>{loggedInUser.firstname}</li>
              <li>{loggedInUser.lastname}</li>
              <li>{loggedInUser.address}</li>
              <li>{loggedInUser.phone}</li>
              <li>{loggedInUser.role}</li>
              <li>{loggedInUser.clientid}</li>
            </ul>
          )}
    </Container>
  );
};
