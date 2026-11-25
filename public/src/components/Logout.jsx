import React from "react";
import { useNavigate } from "react-router-dom";
import { BiPowerOff } from "react-icons/bi";
import styled from "styled-components";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
export default function Logout({ showLabel = false }) {
  const navigate = useNavigate();
  const handleClick = async () => {
    try {
      const stored = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (stored) {
        const { _id } = JSON.parse(stored);
        if (_id) {
          await axios.get(`${logoutRoute}/${_id}`);
        }
      }
    } catch (err) {
      // Proceed with local logout even if the server request fails
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };
  return (
    <Button onClick={handleClick} title="Logout" aria-label="Logout">
      <BiPowerOff />
      {showLabel && <span>Logout</span>}
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.65rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  color: #ebe7ff;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.2s ease, transform 0.1s ease;
  &:hover {
    background-color: #7c66e3;
  }
  &:active {
    transform: scale(0.96);
  }
  svg {
    font-size: 1.25rem;
    color: #ebe7ff;
  }
`;
