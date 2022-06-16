import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import {
  Tab, Grid, Tabs, AppBar, Typography, Button, Box
  , Container, IconButton,
} from '@mui/material';
import PropTypes from 'prop-types';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import ShareWith from './Share-shareWith';
import AddMemeber from './Share-addMember'

const lightColor = 'rgba(255, 255, 255, 255)';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    background: '#ffffff',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
  },
  secondaryBar: {
    zIndex: 0,
    background: lightColor,
    color: theme.palette.main,
    border: 0,
    borderRadius: 3,
    borderBottom: '1px solid #e8e8e8',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.common.black,
    minWidth: 40,
    '&:hover': {
      color: theme.palette.error.main,
      boxShadow: 2,
      //  text-shadow: .1em .1em .2em rgba(0, 0, 0, 0.6),
    },
  },
  tab: {
    marginBottom: 0,
    textColor: theme.palette.error.main,

    indicator: theme.palette.error.main,
    '& .MuiTabs-indicator': {
      backgroundColor: theme.palette.error.main,
    }
  },
  button: {
    borderColor: lightColor,
  },
  hov: {
    margin: theme.spacing(0),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${index}`}
      aria-labelledby={`${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>
            {children}
          </Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function MainShare(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('share');
  const [newCopyLinkValue, setNewCopyLinkValue] = React.useState('Copy Link');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    const oldvalue = value
    setValue(newValue);
    if (newValue === "Copy Link") {
      setNewCopyLinkValue("Link Copied");
      setValue(oldvalue);
    }
    if (newValue === "Link Copied") {
      setNewCopyLinkValue("Copy Link");
      setValue(oldvalue);
    }
  };

  return (
    <div>
      <IconButton onClick={handleOpen} >
        {/* <img src={Share_Icon} alt="Share" height="45" /> */}
        <ShareSharpIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        disableBackdropClick
      >
        <Fade in={open} style={{ borderRadius: '2%' }} >
          <div className={classes.paper} >
            <Grid container>
              <Grid item sm={12}>
                <AppBar component="div" position="static" elevation={0} className={classes.secondaryBar} >
                  <Grid container>
                    <Grid item>
                      <Typography variant="h3" color="secondary.dark" padding={2}> {props.listname} </Typography>
                    </Grid>
                    <Grid container justifyContent="flex-end">
                      <Tabs value={value} onChange={handleChange} className={classes.tab}
                        textColor="secondary"
                        TabIndicatorProps={{
                          style: {
                            height: "1px",
                            alignContent: 'center',
                            alignItems: 'center',
                          }
                        }}>
                        <Tab disableRipple label={newCopyLinkValue} value={newCopyLinkValue} className={classes.link} style={{fontSize:'17.5px'}}/>
                        <Tab label="Share" value="share" className={classes.link} style={{fontSize:'17.5px'}} />
                        <Tab label="Added Members" value="addedmember" className={classes.link} style={{fontSize:'17.5px'}}/>
                      </Tabs>
                    </Grid>
                  </Grid>
                </AppBar>
              </Grid>
            </Grid>
            <Box style={{ width: 900, height: 300, overflow: 'auto' }} >
              <TabPanel value={value} index={'share'}>
                <ShareWith listname={props.listname} />
              </TabPanel>
              <TabPanel value={value} index={'addedmember'} >
                <AddMemeber />
              </TabPanel>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}