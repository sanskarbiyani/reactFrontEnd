import React from 'react';
import { Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { setIsChatOpen } from '../../store/chatReducer';

const ChatHeader = ({receiver}) => {
    const dispatch = useDispatch();
    const closeChatBox = () => {
        dispatch(setIsChatOpen(false));
    }
    return (
        <Box sx={{
            height: '70px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }}>
            <Typography variant='h4'>To: <Typography> { receiver } </Typography> </Typography>
            <Typography sx={{cursor: 'pointer'}} onClick={closeChatBox} ><CloseIcon/></Typography>
        </Box>
    )
}

export default ChatHeader;