import { useState } from "react";
import Avatar from "@components/avatar/Avatar";
import "@pages/social/notifications/Notifications.scss";
import { FaCircle, FaRegCircle, FaRegTrashAlt } from "react-icons/fa";
import { Utils } from "@services/utils/utils.service";
import { useDispatch, useSelector } from "react-redux";
import useEffectOnce from "@hooks/useEffectOnce";
import { notificationService } from "@services/api/notifications/notifications.service";

const Notification = () => {
  const { profile } = useSelector((state) => state.user);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [notificationDialogContent, setNotificationDialogContent] = useState({
  //   post: "",
  //   imgUrl: "",
  //   comment: "",
  //   reaction: "",
  //   senderName: ""
  // });
  const dispatch = useDispatch();

  const getUserNotifications = async () => {
    try {
      const response = await notificationService.getUserNotifications();
      setNotifications(response.data.notifications);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Utils.dispatchNotification(error.response.data.message, "error", dispatch);
    }
  };
  console.log(profile);
  useEffectOnce(() => {
    getUserNotifications();
  });

  return (
    <div className="notifications-container">
      <div className="notifications">Notifications</div>
      {notifications && notifications.length > 0 && (
        <div className="notifications-box">
          {[].map((notification, index) => (
            <div className="notification-box" data-testid="notification-box" key={index}>
              <div className="notification-box-sub-card">
                <div className="notification-box-sub-card-media">
                  <div className="notification-box-sub-card-media-image-icon">
                    <Avatar
                      name={notification?.userFrom?.username}
                      bgColor={notification?.userFrom?.avatarColor}
                      textColor="#ffffff"
                      size={40}
                      avatarSrc={notification?.userFrom?.profilePicture}
                    />
                  </div>
                  <div className="notification-box-sub-card-media-body">
                    <h6 className="title">
                      {notification?.message}
                      <small data-testid="subtitle" className="subtitle">
                        <FaRegTrashAlt className="trash" />
                      </small>
                    </h6>
                    <div className="subtitle-body">
                      <small className="subtitle">
                        {!notification?.read ? <FaCircle className="icon" /> : <FaRegCircle className="icon" />}
                      </small>
                      <p className="subtext">1 hr ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {loading && !notifications.length && <div className="notifications-box"></div>}
      {!loading && !notifications.length && (
        <h3 className="empty-page" data-testid="empty-page">
          You have no notification
        </h3>
      )}
    </div>
  );
};
export default Notification;
