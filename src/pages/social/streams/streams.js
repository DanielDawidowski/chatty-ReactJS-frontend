import React, { useRef } from "react";
// import useInfiniteScroll from "@hooks/useInfiniteScroll";
import "@pages/social/streams/Streams.scss";
import Suggestions from "@components/suggestions/Suggestions";

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
          <Suggestions />
        </div>
      </div>
    </div>
  );
}

export default Streams;
