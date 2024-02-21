import React from "react";
import { styles } from "../style";

const Notification = ({ message }) => {
  return (
    <div className="notification-overlay">
      <div className="notification-message">
        {message}
      </div>
    </div>
  );
};

export default Notification;
