import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Main_logo from '../assets/main_logo.svg'
import { useSelector, useDispatch } from 'react-redux';
import AccountIcon from '../assets/Gallery Icons/Profile Logo.svg'
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import ListAlt from '@mui/icons-material/ListAlt';
import PopOverMenu from './ControlFields/Color Picker/PopOverMenu';
import { Tooltip } from '@mui/material';
import TransitionsModal from './Header/Share.js'
import axiosInstance from '../axois';
import { useSnackbar } from 'notistack';
import * as MuiIcons from '@mui/icons-material'
import { Box, Menu, MenuItem, Grid, Tab, Tabs, Toolbar, Typography, TextField, Icon, Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';
import { LISTNAME } from '../store/actions';

const lightColor = 'rgba(255, 255, 255, 0.7)';
const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
    background: theme.palette.primary.main,
    color: '#212121',
  },
  header: {
    padding: 8,
    background: theme.palette.primary.main,
    color: '#212121',
  },
  margin: {
    margin: theme.spacing(1),
  },
  menuButton: {
    marginLeft: -theme.spacing(4),
  },
  iconButtonAvatar: {
    padding: 3,
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
    marginLeft: 25,
    // indicator: theme.palette.error.main,
    '& .MuiTabs-indicator': {
      // backgroundColor: theme.palette.error.main,
      color: theme.palette.error.main
    }
  },
  button: {
    borderColor: lightColor,
  },
  hov: {
    margin: theme.spacing(0),
  },
});

function Header(props) {
  const { classes } = props;
  const listname = useSelector((state) => state.customization.listname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = React.useState(props.select);
  // console.log(location.state === null ? props.select:location.state.select)
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUsers] = useState(JSON.parse(localStorage.getItem('user')))
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userName, setUsername] = useState('');
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    console.log('Header loading.. please wait.');
    const userDetails = localStorage.getItem('user');
    if (userDetails) {
      const { email } = JSON.parse(userDetails);
      console.log(email)
      axiosInstance.get(`getusername/${email}`)
        .then((response) => {
          setUsername(response.data.message);
        })
        .catch(err => console.error('Some error occured: ', err));
    }
  }, [])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // console.log(props.listname[0]['modelname'])
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onChangeUpdate = (item) => {
    const listdetail = JSON.parse(localStorage.getItem('listname'))
    axiosInstance.put(`editModelname/${listdetail['modelname']}/`, { color: item })
      .then(res => {
        console.log(res.data)
        dispatch({ type: LISTNAME, listname: { modelname: res.data['modelname'], color: res.data['color'], icon: res.data['icon'], description: res.data['description'] } });
        enqueueSnackbar(`Icon color Updated Successfully`, {
          variant: 'success',
        })
        localStorage.removeItem('listname')
        localStorage.setItem('listname', JSON.stringify(res.data))
      }).catch(e => {
        enqueueSnackbar(`Try Again`, {
          variant: 'error',
        })
      })
    console.log(listdetail)
    console.log(item)
  }

  const onChangeIcon = (item) => {
    const listdetail = JSON.parse(localStorage.getItem('listname'))
    axiosInstance.put(`editModelname/${listdetail['modelname']}/`, { icon: item })
      .then(res => {
        console.log(res.data)
        dispatch({ type: LISTNAME, listname: { modelname: res.data['modelname'], color: res.data['color'], icon: res.data['icon'], description: res.data['description'] } });
        enqueueSnackbar(`$Icon Change Update Successfully`, {
          variant: 'success',
        })
        localStorage.removeItem('listname')
        localStorage.setItem('listname', JSON.stringify(res.data))
      }).catch(e => {
        enqueueSnackbar(`Try Again`, {
          variant: 'error',
        })
      })
    console.log(item)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getUser = () => {
    try {
      return user['email']
    }
    catch (err) {
      navigate('/authentication/login')
    }
  }

  return (
    <>
      <AppBar className={classes.header} position="static" elevation={0}  >
        <Toolbar>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item style={{ marginLeft: -20, marginBottom: 0 }}>
              <img src={Main_logo} alt="Applus IDIADA" height='50' width='150' />
            </Grid>
            {
              props.isList && (
                <>
                  <Grid item>
                    <div className="login-badges">
                      {badgeMenu.map((item, i) => {
                        return (
                          <PopOverMenu
                            onChange={onChangeUpdate}
                            onChangeIcon={onChangeIcon}
                            key={i}
                            icon={<Icon component={MuiIcons[listname['icon']]} style={{ fontSize: 40, color: listname['color'] }} ></Icon>}
                            where={"header"}
                            menu={item.menu}
                          />
                        );
                      })}
                    </div>
                  </Grid>
                  <Grid item>
                    <Tooltip title={listname['modelname']} placement="right-start" arrow >
                      <TextField defaultValue={listname['modelname']} onBlur={(e) => {
                        // const listdetail =  JSON.parse(localStorage.getItem('listname'))
                        if ((e.target.value).length != 0) {
                          axiosInstance.put(`editModelname/${listname['modelname']}/`, { modelname: e.target.value })
                            .then(res => {
                              console.log(res.data)
                              dispatch({ type: LISTNAME, listname: { modelname: res.data['modelname'], color: res.data['color'], icon: res.data['icon'], description: res.data['description'] } });
                              enqueueSnackbar(`${e.target.value} Update Successfully`, {
                                variant: 'success',
                              })
                              localStorage.removeItem('listname')
                              localStorage.setItem('listname', JSON.stringify(res.data))
                            }).catch(e => {
                              enqueueSnackbar(`Try Again`, {
                                variant: 'error',
                              })
                            })
                        }
                        else
                          navigate('/')
                      }} />
                    </Tooltip>
                  </Grid>
                  <Grid item xs />
                  <Grid item style={{ marginRight: 25, marginLeft: 25 }}>
                    <TransitionsModal listname={props.listname[0]['modelname']} />
                  </Grid>
                </>
              )
              ||
              (<Grid item xs />)
            }
            <Grid item />
            <Box sx={{ flexGrow: 0 }}>
              <center>
                <Tooltip title="Open settings">
                  <IconButton color="inherit" className={classes.iconButtonAvatar} onClick={handleOpenUserMenu} sx={{ p: 0 }}  >
                    <img src={AccountIcon} height="35" alt="Account" />
                  </IconButton>
                </Tooltip>
                <Typography variant='caption' display='block' align='center' sx={{ fontStyle: 'italic', color: 'black' }}  >
                  {userName}
                </Typography>
              </center>
              <Menu
                color='inherit'
                sx={{ mt: '45px' }}
                id="menu-appbar"
                variant="selectedMenu"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* <MenuItem key={'Profile'} onClick={handleCloseUserMenu}>
                              <Typography textAlign="center">{'Profile'}</Typography>
                            </MenuItem> */}
                <MenuItem key={'Logout'} onClick={handleCloseUserMenu} component={NavLink} to={"/authentication/logout"}>
                  <Typography textAlign="center">{'Logout'}</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Grid>
        </Toolbar>
      </AppBar>
      {
        props.isList && (
          <AppBar component="div" position="static" elevation={0} className={classes.secondaryBar} style={{ marginTop: -22 }}>
            <Grid container   >
              <Grid item sm={1} />
              <Tabs value={value} onChange={handleChange} className={classes.tab}
                textColor="secondary"
                TabIndicatorProps={{
                  style: {
                    height: "1px",
                    alignContent: 'center',
                    alignItems: 'center',
                  }
                }}>
                <Tab textColor="inherit" label="Dashboard" value="dashboard" className={classes.link} onClick={handleClickOpen} />
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  style={{ padding: 20 }}
                >
                  <DialogContent style={{ height: 80, width: 300 }}>
                    <DialogContentText id="alert-dialog-description" style={{ fontSize: '25px', textAlign: 'center' }}>
                      Go to Dashboard?
                      </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 160 }} onClick={handleClose}>Cancel</Button>
                    <Button color="warning" style={{ color: '#00ff00', fontSize: "20px", width: 160 }}
                      component={NavLink} to={`/`}
                      autoFocus>
                      Confirm
                      </Button>
                  </DialogActions>
                </Dialog>
                {/* {props.permisssion && <Tab textColor="inherit" label="Fields" value="overview" className={classes.link} component={NavLink} to={`/list-dashboard`} />
                } */}
                <Tab textColor="inherit" label="Fields" value="overview" className={classes.link} component={NavLink} to={`/list/list-dashboard`} />
                <Tab textColor="inherit" label="List" value="list" className={classes.link} component={NavLink} to={`/list/display-list-data`} />
                <Tab textColor="inherit" label="Log History" value="log" className={classes.link} component={NavLink} to={`/list/log-entries`} />
                {/* <Tab textColor="inherit"  label="Messages" value="messages" className={classes.link} disabled/>
                    <Tab textColor="inherit"  label="Archives" value="archives" className={classes.link} disabled/> */}
              </Tabs>
            </Grid>
          </AppBar>
        )
        ||
        (
          <AppBar component="div" position="static" elevation={0} className={classes.secondaryBar} style={{ marginTop: -48 }} >
            <Grid container   >
              <Grid item sm={1} />
              <Tabs value={value} onChange={handleChange} className={classes.tab}
                textColor="secondary"
                TabIndicatorProps={{
                  style: {
                    height: "1px",
                    alignContent: 'center',
                    alignItems: 'center',
                  }
                }}>
                <Tab textColor="inherit" label="Dashboard" value="dashboard" className={classes.link} component={NavLink} to={"/"} />
                <Tab textColor="inherit" label="List" value="list" className={classes.link} component={NavLink} to={`/create-new-list/self/${getUser()}`} />
                <Tab textColor="inherit" label="Group" value="group" className={classes.link} component={NavLink} to={`/create-new-group`} />
                <Tab textColor="inherit" label="Parser" value="parser" className={classes.link} component={NavLink} to={`/parser/parse-through`} />
              </Tabs>
            </Grid>
          </AppBar>
        )
      }
    </>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

let badgeMenu = [
  {
    icon: <ListAlt style={{ fontSize: 40 }} />,
    menu: [
      {
        name: 'good first issue',
        color: '#7057ff',
        description: 'Good for newcomers',
      },
      {
        name: 'help wanted',
        color: '#008672',
        description: 'Extra attention is needed',
      },
      {
        name: 'priority: critical',
        color: '#b60205',
        description: '',
      },
      {
        name: 'priority: high',
        color: '#d93f0b',
        description: '',
      },
      {
        name: 'priority: low',
        color: '#0e8a16',
        description: '',
      },
      {
        name: 'priority: medium',
        color: '#fbca04',
        description: '',
      },
      {
        name: "status: can't reproduce",
        color: '#fec1c1',
        description: '',
      },
      {
        name: 'status: confirmed',
        color: '#215cea',
        description: '',
      },
      {
        name: 'status: duplicate',
        color: '#cfd3d7',
        description: 'This issue or pull request already exists',
      },
      {
        name: 'status: needs information',
        color: '#fef2c0',
        description: '',
      },
      {
        name: 'status: wont do/fix',
        color: '#eeeeee',
        description: 'This will not be worked on',
      },
      {
        name: 'type: bug',
        color: '#d73a4a',
        description: "Something isn't working",
      },
      {
        name: 'type: discussion',
        color: '#d4c5f9',
        description: '',
      },
      {
        name: 'type: documentation',
        color: '#006b75',
        description: '',
      },
      {
        name: 'type: enhancement',
        color: '#84b6eb',
        description: '',
      },
      {
        name: 'type: epic',
        color: '#3e4b9e',
        description: 'A theme of work that contain sub-tasks',
      },
      {
        name: 'type: feature request',
        color: '#fbca04',
        description: 'New feature or request',
      },
      {
        name: 'type: question',
        color: '#d876e3',
        description: 'Further information is requested',
      },
    ]
  },
];
// export default (Header);
export default withStyles(styles)(Header);