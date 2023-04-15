import React from "react";
import PropTypes from "prop-types";
import "@components/chat/window/message-display/MessageDisplay.scss";
import { Utils } from "@services/utils/utils.service";

function MessageDisplay({ chatMessages, profile, updateMessageReaction, deleteChatMessage }) {
  return (
    <div className="message-page" data-testid="message-page">
      <div key={Utils.generateString(10)} className="message-chat" data-testid="message-chat">
        <div className="message-date-group">
          <div className="message-chat-date" data-testid="message-chat-date">
            {/* {timeAgo.chatMessageTransform(chat.createdAt)} */} 24 devember 2023
          </div>
        </div>
      </div>
    </div>
  );
}

MessageDisplay.propTypes = {
  chatMessages: PropTypes.array,
  profile: PropTypes.object,
  updateMessageReaction: PropTypes.func,
  deleteChatMessage: PropTypes.func
};

export default MessageDisplay;
