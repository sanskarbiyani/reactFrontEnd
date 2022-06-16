import React, { useEffect } from "react";
import axiosInstance from "../../axois";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IS_USER } from "../../store/actions";
import {
  setOtherUsers,
  setOtherUserMessages,
  setReceiver,
  setConnection,
  setIsChatOpen,
} from "../../store/chatReducer";

export default function SignUp() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const webServer = useSelector((state) => state.chat.wsConn);
  useEffect(() => {
    if (!user.remember) {
      const response = axiosInstance.post("user/logout/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      console.log("Removing.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
    axiosInstance.defaults.headers["Authorization"] = null;
    dispatch({ type: IS_USER, isUser: { isLoggedIn: false, user: null } });
    dispatch(setOtherUsers([]));
    dispatch(setOtherUserMessages({}));
    dispatch(setReceiver(""));
    dispatch(setIsChatOpen(false));
    if (webServer) {
      webServer.close();
      dispatch(setConnection(null));
    }
    navigate("/authentication/login");
  });
  return <div>Logout</div>;
}
