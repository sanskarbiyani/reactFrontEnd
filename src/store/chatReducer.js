import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        wsConn: null,
        receiver: [],
        isChatOpen: false,
        otherUsers: [],
        otherUserMessages: {},
        unreadMessages: false
    },
    reducers: {
        setReceiver: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                receiver: payload
            }
        },
        setConnection: (state, action) => {
            const { payload } = action; 
            return {
                ...state,
                wsConn: payload
            }
        },
        setIsChatOpen: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                isChatOpen: payload
            }
        },
        setOtherUsers: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                otherUsers: payload
            }
        },
        setOtherUserMessages: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                otherUserMessages: payload
            }
        },
        addNewMessage: (state, action) => {
            const { payload:{ receiver, message, includeCount } } = action;
            const previousMessages = JSON.parse(JSON.stringify(state.otherUserMessages));
            const prevOtherUser = JSON.parse(JSON.stringify(state.otherUsers));
            let status = false;
            let count = 0;
            const newOtherUser = prevOtherUser.filter(user => {
                if (user[0] === receiver[0]){
                    status = user[2];
                    if (includeCount)
                        count = user[3];
                } else {
                    return user;
                }
            });
            // console.log('Receiver: ', receiver);
            if (previousMessages[receiver[0]]){
                previousMessages[receiver[0]] = [...previousMessages[receiver[0]], message];
            } else {
                previousMessages[receiver[0]] = [message];
            }

            let newList = [...new Set([[...receiver], ...newOtherUser])];
            if (includeCount){
                newList = [...new Set([[...receiver, count], ...newOtherUser])]
            } else {
                newList = [...new Set([[...receiver], ...newOtherUser])]
            }
            return {
                ...state,
                otherUsers: newList,
                otherUserMessages: previousMessages
            }
        },
        addNewOtherUser: (state, action) => {
            const { payload } = action;
            console.log(payload);
            const prevOtherUsersString = JSON.stringify(state.otherUsers);
            const prevOtherUsers = JSON.parse(prevOtherUsersString);
            const payloadString = JSON.stringify(payload)
            if(prevOtherUsersString.indexOf(payloadString) !== -1){
                return {...state};
            } else {
                return {
                    ...state,
                    otherUsers: [payload, ...prevOtherUsers]
                }
            }
        },
        setUserStatus: (state, action) => {
            const { payload: { status, userEmail } } = action;
            const prevOtherUser = JSON.parse(JSON.stringify(state.otherUsers));
            const newOtherUsers = prevOtherUser.map(otherUser => {
                if (otherUser[0]===userEmail){
                    otherUser[2] = status;
                }
                return otherUser;
            })
            return {
                ...state,
                otherUsers: [...newOtherUsers]
            }
        },
        updateUnreadMessages: (state, action) => {
            const { payload: { count, userEmail } } = action;
            const prevOtherUser = JSON.parse(JSON.stringify(state.otherUsers));
            let receiver = JSON.parse(JSON.stringify(state.receiver));
            let newOtherUser = [];
            let unread = JSON.parse(JSON.stringify(state.unreadMessages));
            if (count === 0){
                // console.log('Setting Count to 0');
                receiver[3] = 0;
                newOtherUser = prevOtherUser.map(otherUser => {
                    if (otherUser[0]===userEmail){
                        unread = false;
                        otherUser[3] = 0;
                    }
                    return otherUser;
                });
            } else {
                // console.log('Incrementing Count');
                newOtherUser = prevOtherUser.map(otherUser => {
                    if (otherUser[0]===userEmail){
                        otherUser[3] = otherUser[3] + count;
                        unread = true;
                    }
                    return otherUser;
                });
            }
            console.log('Unread Messages Present: ', unread);
            return {
                ...state,
                receiver: receiver,
                otherUsers: [...newOtherUser],
                unreadMessages: unread
            }
        },
        setUnreadMessages: (state, action) => {
            return {
                ...state,
                unreadMessages: false
            }
        }
    }
})

export const { setReceiver, setConnection, setIsChatOpen, setOtherUsers, setOtherUserMessages, addNewMessage, addNewOtherUser, setUserStatus, updateUnreadMessages } = chatSlice.actions
export default chatSlice.reducer