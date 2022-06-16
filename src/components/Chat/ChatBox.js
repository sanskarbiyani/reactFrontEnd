import React, { useState, useEffect, useRef } from 'react';
import { Paper, Box, Input, Button, Container, Typography, Autocomplete, TextField, IconButton, Tooltip } from '@mui/material'
import ChatArea from './ChatArea';
import axiosInstance from '../../axois';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers, setOtherUserMessages, setReceiver, addNewMessage, addNewOtherUser, setUserStatus, updateUnreadMessages } from '../../store/chatReducer';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/Circle';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextFieldsIcon from '@mui/icons-material/TextFields';

const ChatBox = (() => {
    const [msg, setMsg] = useState('');
    const [fileInput, setFileInput] = useState(false);
    const [file, setFile] = useState();
    const curr_user = useSelector(state => state.customization.isUser);
    const otherUsers = useSelector(state => state.chat.otherUsers);
    const dispatch = useDispatch();
    const ws = useSelector(state => state.chat.wsConn);
    const receiver = useSelector(state => state.chat.receiver);
    const chatOpen = useSelector(state => state.chat.isChatOpen);
    const [allUsersEmail, setAllUsersEmail] = useState([]);

    const handleMsgInput = (event) => {
        setMsg(event.target.value);
    }

    const handleFileInput = (event) => {
        setFile(event.target.files[0]);
    }

    const addMessage = (msg, user, sender = null) => {
        const dateTime = new Date();
        const time = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} -- ${dateTime.getHours()}:${dateTime.getMinutes()}`;
        const align = user ? 'right' : 'left';
        const messageObj = { align: align, message: msg, timestamp: time, type: '1' };
        if (sender) {
            dispatch(addNewMessage({ receiver: sender, message: messageObj, includeCount: true }));
        } else {
            dispatch(addNewMessage({ receiver: receiver, message: messageObj, includeCount: false }));
        }

    }

    const addFileMessage = (fileId, fileName, user, sender = null) => {
        const dateTime = new Date();
        const time = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} -- ${dateTime.getHours()}:${dateTime.getMinutes()}`;
        const align = user ? 'right' : 'left';
        const messageObj = { align: align, fileId: fileId, message: fileName, timestamp: time, type: '2' };
        if (sender) {
            dispatch(addNewMessage({ receiver: sender, message: messageObj, includeCount: true }));
        } else {
            dispatch(addNewMessage({ receiver: receiver, message: messageObj, includeCount: false }));
        }
    }

    const handleReceivedMsgInput = (event, open) => {
        const response = JSON.parse(event.data).message;
        const { type } = response;
        console.log('Is chat Open: ', open);
        if (type === 'message') {
            const { message, sender } = response;
            console.log('Is chat open: ', chatOpen);
            if (!open || sender[0] !== receiver[0]) {
                console.log('Notification Received.')
                dispatch(updateUnreadMessages({ userEmail: sender[0], count: 1 }));
            } else {
                console.log('Chat Area for receiver open.');
            }
            addMessage(message, false, sender);
        } else if (type === 'status') {
            console.log('Status Message Received.');
            const { status, sender } = response;
            console.log(status, sender);
            dispatch(setUserStatus({ status: status, userEmail: sender }));
        } else if (type === 'file') {
            console.log('File received.')
            const { fileId, fileName, sender } = response;
            if (!open || sender[0] !== receiver[0]) {
                console.log('Notification Received.')
                dispatch(updateUnreadMessages({ userEmail: sender[0], count: 1 }));
            } else {
                console.log('Chat Area for receiver open.');
            }
            addFileMessage(fileId, fileName, false, sender);
        }
    }

    useEffect(() => {
        if(receiver && receiver.length > 0){
            dispatch(updateUnreadMessages({ count: 0, userEmail: receiver[0] }));
        }
    }, [])

    useEffect(() => {
        if (ws) {
            ws.onmessage = event => {handleReceivedMsgInput(event, true)}
        }
        return () => {
            console.log('Is chat open: ', chatOpen);
            if (ws) {
                ws.onmessage = event => {handleReceivedMsgInput(event, false)}
            }
        }
    }, [ws, receiver, chatOpen]);

    useEffect(() => {
        axiosInstance.get('chat/users')
            .then(response => {
                response = response.data;
                let allUsers = [];
                response.map(res => {
                    allUsers.push(res.email);
                })
                setAllUsersEmail(allUsers);
            })
            .catch(err => console.error('Error while fetching emails: ', err.message));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if (fileInput) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('to', receiver[0]);
            const config = {
                headers: {
                    'content-type': 'multipart/form-data',
                }
            }
            // Sending the file to Server for storage
            axiosInstance.post('chat/upload/', formData, config)
                .then(response => {
                    response = response.data;
                    const fileId = response.fileId;
                    ws.send(JSON.stringify({
                        'type': 'file',
                        'fileId': fileId,
                        'fileName': file.name,
                        'receiver': receiver[0]
                    }));
                    addFileMessage(fileId, file.name, true)
                })
                .catch(err => console.log(err));
        }
        else {
            const newUser = otherUsers.filter(user => user[0] === receiver[0]);
            console.log(newUser);
            if (newUser.length === 0)
                dispatch(addNewOtherUser(receiver));
            ws.send(JSON.stringify({
                'type': 'message',
                'message': msg,
                'receiver': receiver[0],
            }));
            addMessage(msg, true);
            setMsg('');
        }
    }

    const get_user_messages = () => {
        axiosInstance.get(`chat/users/${curr_user.user.email}/`)
            .then(response => {
                response = response.data;
                let all_users = [];
                let all_messages = {};
                response.map(res => {
                    const { messages, user1, user2, unread_count } = res;
                    const ind_messages = messages.map(msg => {
                        const dateTime = new Date(msg.timestamp);
                        const time = `${dateTime.getDate()}/${dateTime.getMonth()}/${dateTime.getFullYear()} -- ${dateTime.getHours()}:${dateTime.getMinutes()}`;
                        const align = curr_user.user.email == msg.sender_email.email ? 'right' : 'left';
                        return { align: align, message: msg.message, timestamp: time, type: msg.msg_type, fileId: msg.fileId };
                    })
                    // console.log(ind_messages);
                    if (user1.email === curr_user.user.email) {
                        if (!user2.is_online)
                            user2.is_online = false
                        all_users.push([user2.email, user2.user_name, user2.is_online, unread_count]);
                        all_messages[user2.email] = ind_messages;
                    } else {
                        if (!user1.is_online)
                            user1.is_online = false
                        all_users.push([user1.email, user1.user_name, user1.is_online, unread_count]);
                        all_messages[user1.email] = ind_messages;
                    }
                })
                dispatch(setOtherUsers(all_users));
                dispatch(setOtherUserMessages(all_messages));
            })
            .catch(err => console.error('Error during fetching messages: ', err.message));
    }

    const getUserNameFromEmail = (event, value, reason) => {
        // Set a state variable to check if it is indeed a new user or not.
        if (reason === 'selectOption') {
            axiosInstance.get(`chat/getusername/${value}`)
                .then(response => {
                    response = response.data;
                    console.log(response);
                    if (!response.is_online)
                        response.is_online = false;
                    dispatch(setReceiver([value, response.user_name, response.is_online, 0]));
                })
        }
    }

    const handleUserChange = (newReceiver) => {
        if (receiver[0] === newReceiver[0]) {
            console.log('Selected user same as the receiver.');
            return;
        }
        dispatch(setReceiver(newReceiver));
        axiosInstance.post('chat/messages/', { 'receiver': newReceiver[0] })
            .then(response => {
                // console.log(response);
                dispatch(updateUnreadMessages({ count: 0, userEmail: newReceiver[0] }));
            })
            .catch(err => err.message);
    }

    // useEffect(() => {
    //     // Sending the request to mark the messages as read when receiver messages are displayed.
    //     // console.log('Receiver Changed.');
    //     console.log('Receiver from useEffect: ', receiver);
    // }, [receiver])

    useEffect(() => {
        if (otherUsers.length === 0 && curr_user.isLoggedIn)
            get_user_messages();
    }, [])

    return (
        <Container sx={{
            position: 'fixed',
            bottom: '12vh',
            right: '1vw',
            zIndex: '2',
            width: '850px',
            height: '570px',
        }} >
            <Paper elevation={12} sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                padding: '10px',
                background: '#e8e9eb',
                borderRadius: '0',
                borderRadius: '10px'
            }}>
                <Box sx={{
                    flexGrow: '3',
                    width: '33%',
                    // background: 'black',
                    padding: '7px 10px 7px 0px',
                    borderRight: '2px solid white',
                    borderRadius: '20px'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        background: 'white',
                        borderRadius: '20px',
                        boxSizing: 'border-box',
                        padding: '5px',
                    }}>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={allUsersEmail}
                            sx={{ margin: '5px 0 20px 18px', width: '85%' }}
                            renderInput={(params) => <TextField {...params} label="Search Users" size='small' />}
                            onChange={getUserNameFromEmail}
                        />
                        {otherUsers.map((otherUser, index) => {
                            const color = otherUser[0] === receiver[0] ? '#e8e9eb' : 'none';
                            return (
                                <Box key={index}
                                    onClick={() => { console.log('Clicked.'); handleUserChange(otherUser) }}
                                    sx={{
                                        padding: '8px 10px',
                                        margin: '2px 0',
                                        borderRadius: '10px',
                                        // background: 'grey',
                                        // borderBottom: '1px solid grey',
                                        height: '4rem',
                                        boxSizing: 'border-box',
                                        backgroundColor: color,
                                        cursor: 'pointer',
                                        '&:hover': {
                                            background: '#e8e9eb'
                                        },
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <span sx={{ alignSelf: 'center' }}>
                                        {otherUser[2] ? <CircleIcon color='success' fontSize='small' /> : <CircleIcon fontSize='small' />}
                                    </span>
                                    <Typography sx={{ lineHeight: 3, justifySelf: 'start' }}>{otherUser[1]}</Typography>
                                    {/* {otherUser[3] && <span style={{fontSize: '16px', color: 'white', padding:'6px 4px', backgroundColor: 'green', borderRadius:'50%' }} >
                                        {otherUser[3]>0  ? otherUser[3] : ""}
                                    </span>} */}
                                    {otherUser[3] ? (
                                        <span style={{ fontSize: '16px', color: 'white', padding: '6px 4px', backgroundColor: 'green', borderRadius: '50%' }} >
                                            {otherUser[3] > 0 ? otherUser[3] : ""}
                                        </span>
                                    ) : (
                                        <span style={{ fontSize: '16px', borderRadius: '50%' }} >
                                            {otherUser[3] > 0 ? otherUser[3] : ""}
                                        </span>
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                </Box>
                <Box sx={{
                    width: '60%',
                    flexGrow: '3',
                    padding: '7px 0px 7px 9px',
                    // background: 'green',
                    borderLeft: '1px solid white',
                    borderRadius: '20px'
                }}>
                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        background: 'white',
                        borderRadius: '20px',
                        boxSizing: 'border-box',
                        padding: '0.9rem',
                        position: 'relative',
                    }}>
                        <Box sx={{
                            height: '3.5rem',
                            paddingLeft: '2rem',
                            borderBottom: '2px solid #e8e9eb',
                            position: 'relative',
                        }}>
                            <Typography variant='h3'>{receiver[1]}</Typography>
                            <Typography variant='subtitle1'>{receiver[0]}</Typography>
                        </Box>
                        <Box sx={{
                            minWidth: '50%',
                            background: 'light-blue',
                            height: '80%',
                            overflowY: 'auto',
                            marginTop: '0.8rem',
                        }}>
                            <ChatArea />
                        </Box>
                        <Box sx={{
                            // position: 'absolute',
                            // bottom: '1rem',
                            // width: '100%'
                            marginBottom: '5px',
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}>
                            {
                                !fileInput ?
                                    <TextField
                                        variant='filled'
                                        size='medium'
                                        value={msg}
                                        onChange={handleMsgInput}
                                        placeholder='Enter Message'
                                        // multiline= 'true'
                                        inputProps={{
                                            style: {
                                                fontSize: '1.1rem',
                                                paddingTop: '5px',
                                                lineHeight: '1.3',
                                                height: '1.5rem',
                                            }
                                        }}
                                        sx={{
                                            flex: '1.05',
                                            height: '1.5rem',
                                        }}
                                    />
                                    : (<Input
                                        type='file'
                                        onChange={handleFileInput}
                                        sx={{
                                            flex: '1.05',
                                            height: '2rem',
                                            padding: '0.5rem',
                                        }}
                                        inputProps={{
                                            style: {
                                                // fontSize: '1.1rem',
                                                paddingTop: '5px',
                                                lineHeight: '1.3',
                                                height: '1.5rem',
                                            }
                                        }}
                                    />
                                    )
                            }

                            <Tooltip title='Send Message'>
                                <IconButton fontSize='large' color='success' onClick={handleSubmit}  >
                                    <SendIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Attach File'>
                                <IconButton
                                    variant='contained'
                                    onClick={() => { setFileInput(prev => !prev) }}
                                    sx={{ cursor: 'pointer' }} >
                                    {!fileInput ? <AttachFileIcon /> : <TextFieldsIcon />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Container>
    )
})

export default ChatBox;