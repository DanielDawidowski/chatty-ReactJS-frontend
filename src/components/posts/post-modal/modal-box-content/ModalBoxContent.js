// import { useCallback, useEffect } from "react";
import Avatar from "@components/avatar/Avatar";
// import SelectDropdown from "@components/select-dropdown/SelectDropdown";
// import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
// import { privacyList } from "@services/utils/static.data";
// import { FaGlobe } from "react-icons/fa";
import { useSelector } from "react-redux";
// import { find } from "lodash";

const ModalBoxContent = () => {
  const { profile } = useSelector((state) => state.user);
  // const { privacy } = useSelector((state) => state.post);
  // const { feeling } = useSelector((state) => state.modal);
  // const privacyRef = useRef(null);
  // const [selectedItem, setSelectedItem] = useState({
  //   topText: "Public",
  //   subText: "Anyone on Chatty",
  //   icon: <FaGlobe className="globe-icon globe" />
  // });
  // const [tooglePrivacy, setTogglePrivacy] = useDetectOutsideClick(privacyRef, false);

  // const displayPostPrivacy = useCallback(() => {
  //   if (privacy) {
  //     const postPrivacy = find(privacyList, (data) => data.topText === privacy);
  //     setSelectedItem(postPrivacy);
  //   }
  // }, [privacy]);

  // useEffect(() => {
  //   displayPostPrivacy();
  // }, [displayPostPrivacy]);

  return (
    <div className="modal-box-content" data-testid="modal-box-content">
      <div className="user-post-image" data-testid="box-avatar">
        <Avatar
          name={profile?.username}
          bgColor={profile?.avatarColor}
          textColor="#ffffff"
          size={40}
          avatarSrc={profile?.profilePicture}
        />
      </div>
      <div className="modal-box-info">
        <h5 className="inline-title-display" data-testid="box-username">
          Danny
        </h5>
        <p className="inline-display" data-testid="box-feeling">
          is feeling <img className="feeling-icon" src="" alt="" /> <span>Happy</span>
        </p>
        <div data-testid="box-text-display" className="time-text-display">
          <div className="selected-item-text" data-testid="box-item-text">
            Feeling
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};
export default ModalBoxContent;
