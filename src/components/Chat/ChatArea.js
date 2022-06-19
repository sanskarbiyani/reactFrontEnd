import React, { useEffect, useRef, useState } from "react";
import { Typography, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import "./ChatArea.css";
import axiosInstance from "../../axois";
import fileDownload from "js-file-download";

const ChatArea = () => {
  const receiver = useSelector((state) => state.chat.receiver);
  const all_messages = useSelector((state) => state.chat.otherUserMessages);
  const messagesEndRef = useRef(null);
  const allMessagesRef = useRef();
  allMessagesRef.current = all_messages;
  const [currMessageList, setCurrMessageList] = useState(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadClick = (fileId, fileName) => {
    axiosInstance
      .get(`chat/download/${fileId}/`, { responseType: "blob" })
      .then((response) => {
        fileDownload(response.data, fileName);
        console.log(response);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    setCurrMessageList(allMessagesRef.current[receiver[0]]);
  }, [receiver]);

  useEffect(scrollToBottom, [currMessageList]);

  return (
    <div
      style={{
        // minHeight: '200px',
        maxHeight: "100%",
        paddingTop: "10px",
      }}
    >
      {all_messages[receiver[0]] &&
        all_messages[receiver[0]].map((message, index) => {
          return (
            <div
              key={index}
              style={{
                margin: 0,
                // borderRadius: '10px',
                // padding: '7px',
                marginBottom: "3px",
                textAlign: message.align,
              }}
            >
              {message.type === "1" ? (
                <Typography sx={{ fontSize: "1.05rem" }}>
                  <span
                    className={
                      message.align === "left"
                        ? "message-text-left"
                        : "message-text-right"
                    }
                  >
                    {message.message}
                  </span>
                </Typography>
              ) : (
                <Typography sx={{ fontSize: "1.05rem", minHeight: "3.35rem" }}>
                  <span
                    className={
                      message.align === "left"
                        ? "message-text-left"
                        : "message-text-right"
                    }
                    style={{ display: "inline-block" }}
                  >
                    {message.message}
                    <IconButton
                      color={message.align === "right" ? "primary" : "success"}
                      sx={{ margin: "0 10px 0 10px" }}
                      onClick={() => {
                        handleDownloadClick(message.fileId, message.message);
                      }}
                    >
                      <DownloadForOfflineIcon />
                    </IconButton>
                  </span>
                </Typography>
              )}
              <Typography variant="subtitle2">{message.timestamp}</Typography>
            </div>
          );
        })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatArea;
