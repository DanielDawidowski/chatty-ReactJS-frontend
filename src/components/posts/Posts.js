import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Utils } from "@services/utils/utils.service";
import Post from "@components/posts/post/Post";
// import PostSkeleton from "@components/posts/post/PostSkeleton";
import "@components/posts/Posts.scss";
import { PostUtils } from "@services/utils/post-utils.service";
import PostSkeleton from "@components/posts/post/PostSkeleton";

const Posts = ({ allPosts, userFollowing, postsLoading }) => {
  const { profile } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPosts(allPosts);
    setFollowing(userFollowing);
    setLoading(postsLoading);
  }, [allPosts, userFollowing, postsLoading]);

  return (
    <div className="posts-container" data-testid="posts">
      {!loading &&
        posts.length > 0 &&
        posts.map((post) => (
          <div key={Utils.generateString(10)} data-testid="posts-item">
            {(!Utils.checkIfUserIsBlocked(profile?.blockedBy, post?.userId) || post?.userId === profile?._id) && (
              <>
                {PostUtils.checkPrivacy(post, profile, following) && (
                  <>
                    <Post post={post} showIcons={true} />
                  </>
                )}
              </>
            )}
          </div>
        ))}

      {loading &&
        !posts.length &&
        [1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index}>
            <PostSkeleton />
          </div>
        ))}
    </div>
  );
};
Posts.propTypes = {
  allPosts: PropTypes.array.isRequired,
  userFollowing: PropTypes.array.isRequired,
  postsLoading: PropTypes.bool
};
export default Posts;
