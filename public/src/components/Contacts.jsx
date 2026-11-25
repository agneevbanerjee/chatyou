import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Logout from "./Logout";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const loadUser = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    loadUser();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ChatYou</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="user-info">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentUserImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h2>{currentUserName}</h2>
              </div>
            </div>
            <Logout showLabel />
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 64px 1fr 76px;
  overflow: hidden;
  background-color: #080420;
  border-right: 1px solid #ffffff14;
  min-height: 0;
  .brand {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    justify-content: center;
    border-bottom: 1px solid #ffffff14;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
      letter-spacing: 0.05rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    padding: 0.75rem 0;
    gap: 0.65rem;
    &::-webkit-scrollbar {
      width: 0.25rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff14;
      min-height: 4.25rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.6rem;
      padding: 0.5rem 0.85rem;
      display: flex;
      gap: 0.9rem;
      align-items: center;
      transition: background-color 0.2s ease-in-out;
      &:hover {
        background-color: #ffffff24;
      }
      .avatar {
        flex-shrink: 0;
        img {
          height: 2.75rem;
        }
      }
      .username {
        min-width: 0;
        h3 {
          color: white;
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
    .selected {
      background-color: #9a86f3;
      &:hover {
        background-color: #9a86f3;
      }
    }
  }

  .current-user {
    background-color: #0d0d30;
    border-top: 1px solid #ffffff14;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    gap: 0.75rem;
    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      min-width: 0;
    }
    .avatar {
      flex-shrink: 0;
      img {
        height: 3rem;
        max-inline-size: 100%;
      }
    }
    .username {
      min-width: 0;
      h2 {
        color: white;
        font-size: 1.05rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
`;
