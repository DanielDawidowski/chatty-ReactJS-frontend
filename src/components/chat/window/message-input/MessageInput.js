import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FaPaperPlane } from "react-icons/fa";
import loadable from "@loadable/component";
import Input from "@components/input/Input";
import Button from "@components/button/Button";
import gif from "@assets/images/gif.png";
import photo from "@assets/images/photo.png";
import feeling from "@assets/images/feeling.png";
import "@components/chat/window/message-input/MessageInput.scss";
import GiphyContainer from "@components/chat/giphy-container/GiphyContainer";
import { ImageUtils } from "@services/utils/image-utils.service";
import ImagePreview from "@components/chat/image-preview/ImagePreview";

const EmojiPickerComponent = loadable(() => import("./EmojiPicker"), {
  fallback: <p id="loading">Loading...</p>
});

const MessageInput = ({ setChatMessage }) => {
  const [showEmojiContainer, setShowEmojiContainer] = useState(false);
  const [showGifContainer, setShowGifContainer] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [base64File, setBase64File] = useState("");
  const [file, setFile] = useState();
  const fileInputRef = useRef();

  const handleGiphyClick = () => {};

  const addToPreview = async (file) => {
    ImageUtils.checkFile(file);
    setFile(URL.createObjectURL(file));
    const result = await ImageUtils.readAsBase64(file);
    setBase64File(result);
    setShowImagePreview(!showImagePreview);
    setShowEmojiContainer(false);
    setShowGifContainer(false);
    console.log(base64File);
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {showEmojiContainer && (
        <EmojiPickerComponent
          onEmojiClick={(event, eventObject) => {
            console.log(eventObject, event);
          }}
          pickerStyle={{ width: "352px", height: "447px" }}
        />
      )}
      {showGifContainer && <GiphyContainer handleGiphyClick={handleGiphyClick} />}
      <div className="chat-inputarea" data-testid="chat-inputarea">
        {showImagePreview && (
          <ImagePreview
            image={file}
            onRemoveImage={() => {
              setFile("");
              setBase64File("");
              setShowImagePreview(!showImagePreview);
            }}
          />
        )}
        <form>
          <ul className="chat-list" style={{ borderColor: "#50b5ff" }}>
            <li
              className="chat-list-item"
              onClick={() => {
                fileInputClicked();
                setShowEmojiContainer(false);
                setShowGifContainer(false);
              }}
            >
              <Input
                ref={fileInputRef}
                id="image"
                name="image"
                type="file"
                className="file-input"
                placeholder="Select file"
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                  }
                }}
                handleChange={(event) => addToPreview(event.target.files[0])}
              />
              <img src={photo} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowGifContainer(!showGifContainer);
                setShowEmojiContainer(false);
                setShowImagePreview(false);
              }}
            >
              <img src={gif} alt="" />
            </li>
            <li
              className="chat-list-item"
              onClick={() => {
                setShowEmojiContainer(!showEmojiContainer);
                setShowGifContainer(false);
                setShowImagePreview(false);
              }}
            >
              <img src={feeling} alt="" />
            </li>
          </ul>
          <Input
            id="message"
            name="message"
            type="text"
            className="chat-input"
            labelText=""
            placeholder="Enter your message..."
          />
        </form>
        <Button label={<FaPaperPlane />} className="paper" />
      </div>
    </>
  );
};

MessageInput.propTypes = {
  setChatMessage: PropTypes.func
};

export default MessageInput;
