import React, { useEffect, useRef } from "react";
import { Container, Typography, IconButton } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import './ChatArea.css';
import axiosInstance from '../../axois';
import fileDownload from 'js-file-download'


const ChatArea = () => {
    const receiver = useSelector(state => state.chat.receiver);
    const all_messages = useSelector(state => state.chat.otherUserMessages);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth"});
    }

    const handleDownloadClick = (fileId, fileName) => {
        axiosInstance.get(`chat/download/${fileId}/`, {responseType: 'blob',})
        .then(response => {
            // // let blob = new Blob(response.data, {type: 'text/plain'})
            // let contentType = response.headers['content-type']
            // const url = window.URL.createObjectURL(new Blob())
            fileDownload(response.data, fileName);
            console.log(response);
        })
        .catch(err => console.error(err))
    }

    useEffect(scrollToBottom, [all_messages[receiver[0]]]);

    return (
        <div style={{
            // minHeight: '200px',
            maxHeight: '100%',
            paddingTop: '10px',
        }}>
            {all_messages[receiver[0]] && all_messages[receiver[0]].map((message, index) => {
                const color = message.align === 'left' ? '#e8e9eb' : '#5994D6';
                const fontColor = color === '#e8e9eb' ? 'black' : 'white';
                return (
                    <div key={index} style={{
                        margin: 0,
                        // borderRadius: '10px',
                        // padding: '7px',
                        marginBottom: '3px',
                        textAlign: message.align,
                    }}>
                        {   message.type==='1' ?
                            (   
                                <Typography sx={{ fontSize: '1.05rem' }}>
                                <span className={message.align === 'left' ? "message-text-left" : "message-text-right"}>
                                    {message.message}
                                </span>
                                </Typography>
                            ) : (
                                <Typography sx={{ fontSize: '1.05rem', minHeight: '3.35rem' }}>
                                <span className={message.align === 'left' ? "message-text-left" : "message-text-right"} style={{display: 'inline-block'}}>
                                    {message.message}
                                    <IconButton 
                                        color={message.align==='right'?'primary':'success'} 
                                        sx={{margin: '0 10px 0 10px'}} 
                                        onClick={() => {handleDownloadClick(message.fileId, message.message)}}
                                    >
                                        <DownloadForOfflineIcon />
                                    </IconButton>
                                </span>
                                </Typography>
                            )
                        }
                        <Typography variant="subtitle2">{message.timestamp}</Typography>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default ChatArea;