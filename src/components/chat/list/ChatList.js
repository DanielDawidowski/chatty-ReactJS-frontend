import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaTimes } from "react-icons/fa";
import { find } from "lodash";
import { useSearchParams } from "react-router-dom";
import Avatar from "@components/avatar/Avatar";
import Input from "@components/input/Input";
import { Utils } from "@services/utils/utils.service";
import "@components/chat/list/ChatList.scss";
import SearchList from "./search-list/SearchList";
import { userService } from "@services/api/user/user.service";
import useDebounce from "@hooks/useDebounce";
import { ChatUtils } from "@services/utils/chat-utils.service";
import { chatService } from "@services/api/chat/chat.service";
import { setSelectedChatUser } from "@redux/reducers/chat/chat.reducer";

function ChatList() {
  const { profile } = useSelector((state) => state.user);
  const { chatList } = useSelector((state) => state.chat);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [componentType, setComponentType] = useState("chatList");
  const [chatMessageList, setChatMessageList] = useState([]);
  const debouncedValue = useDebounce(search, 1000);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const searchUsers = useCallback(
    async (query) => {
      setIsSearching(true);
      try {
        setSearch(query);
        if (query) {
          const response = await userService.searchUsers(query);
          setSearchResult(response.data.search);
          setIsSearching(false);
        }
      } catch (error) {
        setIsSearching(false);
        Utils.dispatchNotification(error.response.data.message, "error", dispatch);
      }
    },
    [dispatch]
  );

  const addSelectedUserToList = useCallback(
    (user) => {
      const newUser = {
        receiverId: user?._id,
        receiverUsername: user?.username,
        receiverAvatarColor: user?.avatarColor,
        receiverProfilePicture: user?.profilePicture,
        senderUsername: profile?.username,
        senderId: profile?._id,
        senderAvatarColor: profile?.avatarColor,
        senderProfilePicture: profile?.profilePicture,
        body: ""
      };
      ChatUtils.joinRoomEvent(user, profile);
      ChatUtils.privateChatMessages = [];
      const findUser = find(
        chatMessageList,
        (chat) => chat.receiverId === searchParams.get("id") || chat.senderId === searchParams.get("id")
      );
      if (!findUser) {
        const newChatList = [newUser, ...chatMessageList];
        setChatMessageList(newChatList);
        if (!chatList.length) {
          dispatch(setSelectedChatUser({ isLoading: false, user: newUser }));
          const userTwoName =
            newUser?.receiverUsername !== profile?.username ? newUser?.receiverUsername : newUser?.senderUsername;
          chatService.addChatUsers({ userOne: profile?.username, userTwo: userTwoName });
        }
      }
    },
    [chatList, chatMessageList, dispatch, searchParams, profile]
  );

  const removeSelectedUserFromList = (event) => {};

  useEffect(() => {
    if (debouncedValue) {
      searchUsers(debouncedValue);
    }
  }, [debouncedValue, searchUsers]);

  useEffect(() => {
    if (selectedUser && componentType === "searchList") {
      addSelectedUserToList(selectedUser);
    }
  }, [addSelectedUserToList, componentType, selectedUser]);

  useEffect(() => {
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
          <Input
            id="message"
            name="message"
            value={search}
            type="text"
            className="search-input"
            labelText=""
            placeholder="Search"
            handleChange={(event) => {
              setIsSearching(true);
              setSearch(event.target.value);
            }}
          />
          {search && (
            <FaTimes
              className="times"
              onClick={() => {
                setSearch("");
                setIsSearching(false);
                setSearchResult([]);
              }}
            />
          )}
        </div>

        <div className="conversation-container-body">
          <div className="conversation">
            {chatMessageList.map((data) => (
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
