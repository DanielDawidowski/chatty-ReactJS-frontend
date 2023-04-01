import "@pages/social/Social.scss";
import Streams from "./streams/streams";

const Social = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <h1>sidebar</h1>
        </div>
        <div className="dashboard-content">
          <Streams />
        </div>
      </div>
    </>
  );
};
export default Social;
