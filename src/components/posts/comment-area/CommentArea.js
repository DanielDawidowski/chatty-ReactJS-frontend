import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, find } from "lodash";
import { FaRegCommentAlt } from "react-icons/fa";
import Reactions from "../reactions/Reactions";
import "@components/posts/comment-area/CommentArea.scss";
import { Utils } from "@services/utils/utils.service";
import { reactionsMap } from "@services/utils/static.data";
import { useSelector, useDispatch } from "react-redux";
import { postService } from "@services/api/post/post.service";
import { addReactions } from "@redux/reducers/post/user-post-reaction.reducer";
import { socketService } from "@services/socket/socket.service";

function CommentArea({ post }) {
  const { profile } = useSelector((state) => state.user);
  let { reactions } = useSelector((state) => state.userPostReactions);
  const [userSelectedReaction, setUserSelectedReaction] = useState("");

  const dispatch = useDispatch();

  const selectedUserReaction = useCallback(
    (postReactions) => {
      const userReaction = find(postReactions, (reaction) => reaction.postId === post._id);
      const result = userReaction ? Utils.firstLetterUpperCase(userReaction.type) : "";
      setUserSelectedReaction(result);
    },
    [post]
  );

  useEffect(() => {
    selectedUserReaction(reactions);
  }, [selectedUserReaction, reactions]);

  const addReactionPost = async (reaction) => {
    try {
      const reactionResponse = await postService.getSinglePostReactionByUsername(post?._id, profile?.username);
      post = updatePostReactions(
        reaction,
        Object.keys(reactionResponse.data.reactions).length,
        reactionResponse.data.reactions?.type
      );

      const postReactions = addNewReaction(
        reaction,
        Object.keys(reactionResponse.data.reactions).length,
        reactionResponse.data.reactions?.type
      );
      reactions = [...postReactions];
      dispatch(addReactions(reactions));

      sendSocketIOReactions(
        post,
        reaction,
        Object.keys(reactionResponse.data.reactions).length,
        reactionResponse.data.reactions?.type
      );

      const reactionsData = {
        userTo: post?.userId,
        postId: post?._id,
        type: reaction,
        postReactions: post.reactions,
        profilePicture: profile?.profilePicture,
        previousReaction: Object.keys(reactionResponse.data.reactions).length
          ? reactionResponse.data.reactions?.type
          : ""
      };

      if (!Object.keys(reactionResponse.data.reactions).length) {
        await postService.addReaction(reactionsData);
      } else {
        reactionsData.previousReaction = reactionResponse.data.reactions?.type;
        if (reaction === reactionsData.previousReaction) {
          await postService.removeReaction(post?._id, reactionsData.previousReaction, post.reactions);
        } else {
          await postService.addReaction(reactionsData);
        }
      }
    } catch (error) {
      Utils.dispatchNotification(error?.response?.data?.message, "error", dispatch);
    }
  };

  const updatePostReactions = (newReaction, hasResponse, previousReaction) => {
    post = cloneDeep(post);
    if (!hasResponse) {
      post.reactions[newReaction] += 1;
    } else {
      if (post.reactions[previousReaction] > 0) {
        post.reactions[previousReaction] -= 1;
      }
      if (previousReaction !== newReaction) {
        post.reactions[newReaction] += 1;
      }
    }
    return post;
  };

  const addNewReaction = (newReaction, hasResponse, previousReaction) => {
    const postReactions = reactions.filter((reaction) => reaction?.postId !== post?._id);
    const newPostReaction = {
      avatarColor: profile?.avatarColor,
      createdAt: `${new Date()}`,
      postId: post?._id,
      profilePicture: profile?.profilePicture,
      username: profile?.username,
      type: newReaction
    };
    if (hasResponse && previousReaction !== newReaction) {
      postReactions.push(newPostReaction);
    } else if (!hasResponse) {
      postReactions.push(newPostReaction);
    }
    return postReactions;
  };

  const sendSocketIOReactions = (post, reaction, hasResponse, previousReaction) => {
    const socketReactionData = {
      userTo: post.userId,
      postId: post._id,
      username: profile?.username,
      avatarColor: profile?.avatarColor,
      type: reaction,
      postReactions: post.reactions,
      profilePicture: profile?.profilePicture,
      previousReaction: hasResponse ? previousReaction : ""
    };
    socketService?.socket?.emit("reaction", socketReactionData);
  };

  useEffect(() => {
    selectedUserReaction(reactions);
  }, [selectedUserReaction, reactions]);

  return (
    <div className="comment-area" data-testid="comment-area">
      <div className="like-icon reactions">
        <div className="likes-block" onClick={() => addReactionPost("like")}>
          <div className={`likes-block-icons reaction-icon ${userSelectedReaction.toLowerCase()}`}>
            {userSelectedReaction && (
              <div className={`reaction-display ${userSelectedReaction.toLowerCase()}`} data-testid="selected-reaction">
                <img className="reaction-img" src={reactionsMap[userSelectedReaction.toLowerCase()]} alt="" />
                <span>{userSelectedReaction}</span>
              </div>
            )}
            {!userSelectedReaction && (
              <div className="reaction-display" data-testid="default-reaction">
                <img className="reaction-img" src={`${reactionsMap.like}`} alt="" /> <span>Like</span>
              </div>
            )}
          </div>
        </div>
        <div className="reactions-container app-reactions">
          <Reactions handleClick={addReactionPost} />
        </div>
      </div>
      <div className="comment-block">
        <span className="comments-text">
          <FaRegCommentAlt className="comment-alt" /> <span>Comments</span>
        </span>
      </div>
    </div>
  );
}

CommentArea.propTypes = {
  post: PropTypes.object
};

export default CommentArea;
