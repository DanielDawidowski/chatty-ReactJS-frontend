import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import photo from "@assets/images/photo.png";
import gif from "@assets/images/gif.png";
import feeling from "@assets/images/feeling.png";
import Avatar from "@components/avatar/Avatar";
import Input from "@components/input/Input";
import { openModal, toggleFeelingModal, toggleGifModal, toggleImageModal } from "@redux/reducers/modal/modal.reducer";
import "@components/posts/post-form/PostForm.scss";
import AddPost from "../post-modal/post-add/AddPost";
import { ImageUtils } from "@services/utils/image-utils.service";
import EditPost from "../post-modal/post-edit/EditPost";

function PostForm() {
  const { profile } = useSelector((state) => state.user);
  const { type, isOpen, openFileDialog, gifModalIsOpen, feelingsIsOpen } = useSelector((state) => state.modal);
  const [selectedPostImage, setSelectedPostImage] = useState();
  const fileInputRef = useRef();
  const dispatch = useDispatch();

  const openPostModal = () => {
    dispatch(openModal({ type: "add" }));
  };

  const openImageModal = () => {
    fileInputRef.current.click();
    dispatch(openModal({ type: "add" }));
    dispatch(toggleImageModal(!openFileDialog));
  };

  const openFeelingsComponent = () => {
    dispatch(openModal({ type: "add" }));
    dispatch(toggleFeelingModal(!feelingsIsOpen));
  };

  const openGifModal = () => {
    dispatch(openModal({ type: "add" }));
    dispatch(toggleGifModal(!gifModalIsOpen));
  };

  const handleFileChange = (event) => {
    ImageUtils.addFileToRedux(event, "", setSelectedPostImage, dispatch, "image");
  };

  return (
    <>
      <div className="post-form" data-testid="post-form">
        <div className="post-form-row">
          <div className="post-form-header">
            <h4 className="post-form-title">Create Post</h4>
          </div>
          <div className="post-form-body">
            <div className="post-form-input-body" data-testid="input-body" onClick={() => openPostModal()}>
              <Avatar
                name={profile?.username}
                bgColor={profile?.avatarColor}
                textColor="#ffffff"
                size={50}
                avatarSrc={profile?.profilePicture}
              />
              <div className="post-form-input" data-placeholder="Write something here..."></div>
            </div>
            <hr />
            <ul className="post-form-list" data-testid="list-item">
              <li className="post-form-list-item image-select" onClick={() => openImageModal()}>
                <Input
                  name="image"
                  type="file"
                  className="file-input"
                  ref={fileInputRef}
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = null;
                    }
                  }}
                  handleChange={handleFileChange}
                />
                <img src={photo} alt={photo} /> Photo
              </li>
              <li className="post-form-list-item" onClick={() => openGifModal()}>
                <img src={gif} alt={gif} /> Gif
              </li>
              <li className="post-form-list-item" onClick={() => openFeelingsComponent()}>
                <img src={feeling} alt={feeling} /> Feeling
              </li>
            </ul>
          </div>
        </div>
      </div>
      {isOpen && type === "add" && <AddPost selectedImage={selectedPostImage} />}
      {isOpen && type === "edit" && <EditPost />}
    </>
  );
}

export default PostForm;
