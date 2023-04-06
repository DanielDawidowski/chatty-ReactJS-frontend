import { closeModal } from "@redux/reducers/modal/modal.reducer";
import { clearPost, updatePostItem } from "@redux/reducers/post/post.reducer";
import { postService } from "@services/api/post/post.service";
import { Utils } from "./utils.service";

export class PostUtils {
  static selectBackground(bgColor, postData, setTextAreaBackground, setPostData, setDisable) {
    postData.bgColor = bgColor;
    setTextAreaBackground(bgColor);
    setPostData(postData);
    setDisable(false);
  }

  static postInputEditable(textContent, postData, setPostData) {
    postData.post = textContent;
    setPostData(postData);
  }

  static closePostModal(dispatch) {
    dispatch(closeModal());
    dispatch(clearPost());
  }

  static clearImage(postData, post, inputRef, dispatch, setSelectedPostImage, setPostImage, setPostData) {
    postData.gifUrl = "";
    postData.image = "";
    setSelectedPostImage(null);
    setPostImage("");
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef.current.textContent = !post ? postData?.post : post;
        if (post) {
          postData.post = post;
        }
        setPostData(postData);
      }
    });
    dispatch(updatePostItem({ gifUrl: "", image: "", imgId: "", imgVersion: "" }));
  }

  static postInputData(imageInputRef, postData, post, setPostData) {
    setTimeout(() => {
      if (imageInputRef?.current) {
        imageInputRef.current.textContent = !post ? postData?.post : post;
        if (post) {
          postData.post = post;
        }
        setPostData(postData);
      }
    });
  }

  static dispatchNotification(message, type, setApiResponse, setLoading, dispatch) {
    setApiResponse(type);
    setLoading(false);
    Utils.dispatchNotification(message, type, dispatch);
  }

  static async sendPostWithFileRequest(type, postData, imageInputRef, setApiResponse, setLoading, dispatch) {
    try {
      if (imageInputRef?.current) {
        imageInputRef.current.textContent = postData.post;
      }
      const response = await postService.createPostWithImage(postData);
      if (response) {
        setApiResponse("success");
        setLoading(false);
      }
    } catch (error) {
      PostUtils.dispatchNotification(error.response.data.message, "error", setApiResponse, setLoading, dispatch);
    }
  }

  static checkPrivacy(post, profile, following) {
    const isPrivate = post?.privacy === "Private" && post?.userId === profile?._id;
    const isPublic = post?.privacy === "Public";
    const isFollower =
      post?.privacy === "Followers" && Utils.checkIfUserIsFollowed(following, post?.userId, profile?._id);
    return isPrivate || isPublic || isFollower;
  }
}
