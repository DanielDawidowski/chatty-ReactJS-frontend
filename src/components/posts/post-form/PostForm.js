import React from "react";
import { useSelector } from "react-redux";
import photo from "@assets/images/photo.png";
import gif from "@assets/images/gif.png";
import feeling from "@assets/images/feeling.png";
import Avatar from "@components/avatar/Avatar";
import Input from "@components/input/Input";
import "@components/posts/post-form/PostForm.scss";

function PostForm() {
  const { profile } = useSelector((state) => state.user);
  return (
    <div className="post-form" data-testid="post-form">
      <div className="post-form-row">
        <div className="post-form-header">
          <h4 className="post-form-title">Create Post</h4>
        </div>
        <div className="post-form-body">
          <div className="post-form-input-body" data-testid="input-body">
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
            <li className="post-form-list-item image-select">
              <Input name="image" type="file" className="file-input" />
              <img src={photo} alt={photo} /> Photo
            </li>
            <li className="post-form-list-item">
              <img src={gif} alt={gif} /> Gif
            </li>
            <li className="post-form-list-item">
              <img src={feeling} alt={feeling} /> Feeling
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PostForm;