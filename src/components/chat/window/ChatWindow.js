import React from "react";
import Avatar from "@components/avatar/Avatar";
import { useSelector } from "react-redux";
import "@components/chat/window/ChatWindow.scss";

function ChatWindow() {
  const { profile } = useSelector((state) => state.user);
  return (
    <div className="chat-window-container" data-testid="chatWindowContainer">
      <div data-testid="chatWindow">
        <div className="chat-title" data-testid="chat-title">
          <div className="chat-title-avatar">
            <Avatar
              name={profile?.username}
              bgColor={profile.avatarColor}
              textColor="#ffffff"
              size={40}
              avatarSrc={profile?.profilePicture}
            />
          </div>
          <div className="chat-title-items">
            <div className="chat-name">Sammy</div>
            <span className="chat-active">Online</span>
          </div>
        </div>
        <div className="chat-window">
          <div className="chat-window-message">Message display component</div>
          <div className="chat-window-input">Message input component</div>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;
