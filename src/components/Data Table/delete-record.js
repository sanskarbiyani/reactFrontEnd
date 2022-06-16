import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import axiosInstance from '../../axois';

export default function DeleteDialog(props) {
  const list_group = useSelector((state) => state.customization.group_list);
  const [open, setOpen] = React.useState(true);
    const {id} = useParams()
    let navigate = useNavigate()
    
  const handleClickOpen = () => {
    
    setOpen(true);
  };

  const handleClose = () => {
    axiosInstance.delete(`models/single/${list_group['list']}/${list_group['group']}/${id}/`)
    .then((res)=>{
      
    navigate('/list/display-list-data')
    }).catch((e)=>{console.log(e)})
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        .
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Record Deleted Successfully!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Click Here</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}


