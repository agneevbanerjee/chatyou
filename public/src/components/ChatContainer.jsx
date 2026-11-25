import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    };
    fetchMessages();
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => {
          return (
            <div ref={scrollRef} key={message._id || index}>
              <div
                className={`message ${
                  message.fromSelf ? "sended" : "recieved"
                }`}
              >
                <div className="content">
                  <p>{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px 1fr 76px;
  overflow: hidden;
  min-height: 0;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    background-color: #080420;
    border-bottom: 1px solid #ffffff14;
    .user-details {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      .avatar {
        img {
          height: 2.75rem;
        }
      }
      .username {
        h3 {
          color: white;
          font-size: 1.05rem;
        }
      }
    }
  }
  .chat-messages {
    padding: 1.25rem 1.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    overflow-y: auto;
    min-height: 0;
    &::-webkit-scrollbar {
      width: 0.25rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 65%;
        overflow-wrap: break-word;
        padding: 0.75rem 1.1rem;
        font-size: 1rem;
        line-height: 1.4;
        border-radius: 1rem;
        color: #ebe7ff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 75%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4e0eff;
        color: #ffffff;
        border-bottom-right-radius: 0.25rem;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #ffffff1a;
        color: #ebe7ff;
        border-bottom-left-radius: 0.25rem;
      }
    }
  }
`;
