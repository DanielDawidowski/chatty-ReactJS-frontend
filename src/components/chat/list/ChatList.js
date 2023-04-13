import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import Avatar from "@components/avatar/Avatar";
import Input from "@components/input/Input";
import { Utils } from "@services/utils/utils.service";
import "@components/chat/list/ChatList.scss";
import SearchList from "./search-list/SearchList";

function ChatList() {
  const { profile } = useSelector((state) => state.user);
  const { chatList } = useSelector((state) => state.chat);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [componentType, setComponentType] = useState("chatList");
  const [chatMessageList, setChatMessageList] = useState([]);

  const removeSelectedUserFromList = (event) => {};

  useEffect(() => {
    console.log(selectedUser, componentType, chatMessageList);
    setChatMessageList(chatList);
  }, [chatList, selectedUser, componentType, chatMessageList]);

  return (
    <div data-testid="chatList">
      <div className="conversation-container">
        <div className="conversation-container-header">
          <div className="header-img">
            <Avatar
              name={profile?.username}
              bgColor={profile?.avatarColor}
              textColor="#ffffff"
              size={40}
              avatarSrc={profile?.profilePicture}
            />
          </div>
          <div className="title-text">{profile?.username}</div>
        </div>

        <div className="conversation-container-search" data-testid="search-container">
          <FaSearch className="search" />
          <Input id="message" name="message" type="text" className="search-input" labelText="" placeholder="Search" />
          <FaTimes className="times" />
        </div>

        <div className="conversation-container-body">
          <div className="conversation">
            {[].map((data) => (
              <div data-testid="conversation-item" className="conversation-item" key={Utils.generateString(10)}>
                <div className="avatar">
                  <Avatar name="placeholder" bgColor="red" textColor="#ffffff" size={40} avatarSrc="" />
                </div>
                <div className="title-text">Danny</div>
                <div className="created-date">1 hr ago</div>
                <div className="created-date" onClick={removeSelectedUserFromList}>
                  <FaTimes />
                </div>
                <div className="conversation-message">
                  <span className="message-deleted">message deleted</span>
                </div>
                <div className="conversation-message">
                  <span className="message-deleted">message deleted</span>
                </div>
              </div>
            ))}
          </div>
          <SearchList
            searchTerm={search}
            result={searchResult}
            isSearching={isSearching}
            setSearchResult={setSearchResult}
            setIsSearching={setIsSearching}
            setSearch={setSearch}
            setSelectedUser={setSelectedUser}
            setComponentType={setComponentType}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatList;
