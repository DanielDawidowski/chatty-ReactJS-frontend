import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import useInfiniteScroll from "@hooks/useInfiniteScroll";
import "@pages/social/streams/Streams.scss";
import Suggestions from "@components/suggestions/Suggestions";
import { getUserSuggestions } from "@redux/api/suggestions";
import useEffectOnce from "@hooks/useEffectOnce";
import PostForm from "@components/posts/post-form/PostForm";
import Posts from "@components/posts/Posts";
import { postService } from "@services/api/post/post.service";
import { Utils } from "@services/utils/utils.service";
import { getPosts } from "@redux/api/posts";
import { uniqBy } from "lodash";
import useInfiniteScroll from "@hooks/useInfiniteScroll";

function Streams() {
  const { allPosts } = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  const dispatch = useDispatch();
  let appPosts = useRef([]);
  useInfiniteScroll(bodyRef, bottomLineRef, fetchPostData);

  const PAGE_SIZE = 8;

  function fetchPostData() {
    let pageNum = currentPage;
    console.log(currentPage, Math.round(totalPostsCount / PAGE_SIZE));
    if (currentPage <= Math.round(totalPostsCount / PAGE_SIZE)) {
      pageNum += 1;
      setCurrentPage(pageNum);
      getAllPosts();
    }
  }

  const getAllPosts = async () => {
    try {
      const response = await postService.getAllPosts(1);
      if (response.data.posts.length > 0) {
        appPosts = [...posts, ...response.data.posts];
        const allPosts = uniqBy(appPosts, "_id");
        setPosts(allPosts);
        console.log(allPosts);
      }
      setLoading(false);
    } catch (error) {
      Utils.dispatchNotification(error.response.data.message, "error", dispatch);
    }
  };

  useEffectOnce(() => {
    dispatch(getUserSuggestions());
  });

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    setLoading(allPosts?.isLoading);
    setPosts(allPosts?.posts);
    setTotalPostsCount(allPosts?.totalPostsCount);
  }, [allPosts]);

  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef} style={{ backgroundColor: "white" }}>
          <PostForm />
          <Posts allPosts={posts} postsLoading={loading} userFollowing={[]} />
          <div>Post Items</div>
          <div ref={bottomLineRef} style={{ marginBottom: "50px", height: "50px" }}></div>
        </div>
        <div className="streams-suggestions">
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default Streams;
