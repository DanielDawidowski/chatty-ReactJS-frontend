import React, { useRef } from "react";
// import useInfiniteScroll from "@hooks/useInfiniteScroll";
import "@pages/social/streams/Streams.scss";

function Streams() {
  const bodyRef = useRef(null);
  const bottomLineRef = useRef();
  return (
    <div className="streams" data-testid="streams">
      <div className="streams-content">
        <div className="streams-post" ref={bodyRef} style={{ backgroundColor: "white" }}>
          <div>Post Form</div>
          <div>Post Items</div>
          <div ref={bottomLineRef} style={{ marginBottom: "50px", height: "50px" }}></div>
        </div>
        <div className="streams-suggestions">
          <h1>USER Suggestions</h1>
        </div>
      </div>
    </div>
  );
}

export default Streams;
