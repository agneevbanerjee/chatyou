import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && parsed.username) setUserName(parsed.username);
    }
  }, []);
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  text-align: center;
  padding: 2rem;
  gap: 0.75rem;
  img {
    max-height: 18rem;
    max-width: 85%;
    height: auto;
  }
  h3 {
    color: #b8b8d1;
    font-weight: 400;
  }
  span {
    color: #9a86f3;
  }
`;
