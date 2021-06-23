import React, { useState } from "react";
import styled from "styled-components";
import { searchUsers } from "../services/AuthService";
import { User } from "../stores/AuthStore";

interface props {
  loggedInUser: User;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Container = styled.div`
  margin-left: 15px;
`;

export const SearchForm: React.FC<props> = ({ setUsers, loggedInUser }) => {
  const [value, setValue] = useState<string>("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSearch = async () => {
    // setValue(event.target.value);
    const newUsers = await searchUsers(loggedInUser.email, value);
    debugger;
    setUsers(newUsers);
  };
  const handleClearSearch = async () => {
    setValue("");
    const newUsers = await searchUsers(loggedInUser.email, "");
    debugger;
    setUsers(newUsers);
  };
  return (
    <Container>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleSearch}>Search</button>
      {value && <button onClick={handleClearSearch}>Reset</button>}
    </Container>
  );
};
