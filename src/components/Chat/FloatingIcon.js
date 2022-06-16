import React, { useEffect, useState, useRef } from "react";
import { Fab, Container } from '@mui/material';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { useSelector, useDispatch } from 'react-redux';
import { setConnection, setIsChatOpen } from '../../store/chatReducer';
import ChatBox from "./ChatBox";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import {  useSnackbar } from 'notistack';

const ChatFAB = () => {
    // remove connOpen. Only for development environment.
    // React.strictMode causes element/ useEffect to render/run twice to detect errors.
    // So two connections get opened
    const dispatch = useDispatch();
    const isChatOpen = useSelector(state => state.chat.isChatOpen);
    const webServer = useSelector(state => state.chat.wsConn);
    const unread = useSelector(state => state.chat.unreadMessages);
    const [intervalName, setIntervalName] = useState(0);
    const stateRef = useRef();
    const connectionRef = useRef();
    const { enqueueSnackbar } = useSnackbar();
    stateRef.current = intervalName;
    connectionRef.current = webServer;


    const createConnection = () => {
        // console.log('Creating Connection.')
        // console.log('Webserver', webServer);
        const refresh = localStorage.getItem('refresh_token');
        if (!webServer && refresh){
            const getTokenUrl = 'http://127.0.0.1:8000/api/token/';
            const { email, password } = JSON.parse(localStorage.getItem('user'));
            axios.post(getTokenUrl, { email: email, password: password })
                .then(response => {
                    const accessToken = response.data.access;
                    const WebSocketUrl = `ws://localhost:8000/ws/chat/?token=${accessToken}`;
                    const ws = new WebSocket(WebSocketUrl);
                    ws.onopen = event => {
                        // console.log('Connection Open.');
                        dispatch(setConnection(ws));
                        // console.log('Interval Name from inside: ', stateRef.current);
                        if (stateRef.current){
                            enqueueSnackbar('Connection Re-established.', {variant: 'success'});
                            clearInterval(stateRef.current);
                            setIntervalName(0);
                        }
                    }

                    ws.onclose = event => {
                        // console.log('Connection Closed..');
                        // console.log(`Connetion closed cleanly? ${event.wasClean}`);
                        dispatch(setConnection(null));
                        if (!event.wasClean){
                            enqueueSnackbar('Server Down. Please wait a moment.', {variant: 'error'});
                            // let interval = setInterval(createConnection, 10000);
                            // setIntervalName(interval);
                        }
                    }

                    ws.onerror = event => {
                        console.error('Error during connection with websocket', event.message);
                    }
                })
                .catch(err => {
                    if (err.message !== 'Network Error'){
                        console.error(err.message);
                    } else {
                        console.log(err.message);
                    }

                });
        } else {
            console.log('Connection already exists.');
        }
    }

    const toggleChat = () => {
        dispatch(setIsChatOpen(!isChatOpen));
    }

    // useEffect(() => {
    //     console.log(`Interval ID: ${intervalName}`);
    // }, [intervalName])

    useEffect(() => {
        // console.log('Rendering Changes.');
        createConnection();
    }, []);

    // useEffect(() => {
    //     return () => {
    //         if(webServer){
    //             setCreateConn(true);
    //             console.log('Closing Connection. Good Bye..');
    //             dispatch(setConnection(null));
    //             webServer.close();
    //         }
    //     }
    // }, [])

    return (
        <Container>
            
            { isChatOpen? <ChatBox /> : <></>}
            <Fab onClick={toggleChat} sx={{
                position: 'fixed',
                right: '2.3vw',
                bottom: '3.3vh'
            }}>
                { isChatOpen ? 
                    <CloseIcon /> : 
                    <ChatIcon unread={unread} />
                }
            </Fab>
        </Container>
    )
}

const ChatIcon = ({ unread }) => {
    if (unread) {
        return <MarkChatUnreadIcon />
    } else {
        return <MarkChatReadIcon />
    }
}
 
export default ChatFAB;