import React, { useEffect, useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/material/Autocomplete';
import makeStyles from '@mui/styles/makeStyles';
import ListAlt from '@mui/icons-material/ListAlt';
import {
    Menu, MenuItem, Icon, Box, Container, Paper, Button, CardHeader, Grid, List, Modal, Fade,
    ListItem, ListItemText, ListItemAvatar, ListItemIcon, ListItemSecondaryAction, FormControl, InputLabel, Select,
    Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, CardActions, Tooltip, IconButton, CardActionArea,
} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import withStyles from '@mui/styles/withStyles';
import PopOverMenu from '../ControlFields/Color Picker/PopOverMenu';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch'
import AddIcon from '@mui/icons-material/Add'
import Skeleton from '@mui/material/Skeleton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import * as MuiIcons from '@mui/icons-material'
import { useSnackbar } from 'notistack';
import axiosInstance from "../../axois";
import { useDispatch } from 'react-redux';
import WarningImg from "../../assets/Select_a_Group_to_preview.svg"
import Plus from "../../assets/AuthIcon/plus-svgrepo-com.svg"
import { GROUP_LIST, LISTNAME } from "../../store/actions";
import ShareWith from "../Header/Share-shareWith";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';
import { useSelector } from 'react-redux';
import { createBrowserHistory } from "history";


const theme = createTheme({
    palette: {
        primary: blue,
    },
});
const faces = [
    "http://i.pravatar.cc/300?img=1",
    "http://i.pravatar.cc/300?img=2",
    "http://i.pravatar.cc/300?img=3",
    "http://i.pravatar.cc/300?img=4"
];
const useStyles = makeStyles((theme) => ({
    paper: {
        background: '#ffffff',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 1, 3),
        width: '600px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px',
    },
    card: {

        transition: "0.4s",
        boxShadow: "0 8px 30px -12px rgba(0,0,0,0.7)",
        "&:hover": {
            boxShadow: "0 16px 50px -12.125px rgba(0,0,0,0.5)"
        }
    },
    button: {
        borderRadius: '50',
        color: theme.palette.primary
    },
    media: {
        paddingTop: "56.25%"
    },
    content: {
        margin: 0,
        textAlign: "left",
        padding: theme.spacing.unit * 3
    },
    divider: {
        margin: `${theme.spacing.unit * 3}px 0`
    },
    heading: {
        fontWeight: "bold"
    },
    subheading: {
        lineHeight: 1.8
    },
    avatar: {
        display: "inline-block",
        border: "2px solid white",
        "&:not(:first-of-type)": {
            marginLeft: -theme.spacing.unit
        }
    }
}));
const ListItemWithWiderSecondaryAction = withStyles({
    secondaryAction: {
        paddingRight: 96
    }
})(ListItem);

const Groups = ({ data, onChange, fetch, searchState, myRules }) => {
    // console.log(data)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editButton, setEditButton] = useState(false)
    const [selectedList, setSelectedList] = useState('')
    const [selectedUser, setSelectedUser] = useState('')
    const [selectedGroup, setSelectedGroup] = useState('')
    const [colorSwip, setColorSwip] = useState('primary')
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [state, setState] = React.useState()
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [anchorElShare, setAnchorElShare] = React.useState(false);
    const [shareWith, setShareWith] = useState(false);
    const [anchorEl1, setAnchorEl1] = React.useState(false);
    const [anchorElShare1, setAnchorElShare1] = React.useState(false);
    const [shareWith1, setShareWith1] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUsers] = useState(JSON.parse(localStorage.getItem('user')))
    const [open, setOpen] = React.useState(false);
    const [openDeleteList, setOpenDeleteList] = React.useState(false);
    const [openEditList, setOpenEditList] = React.useState(false);
    const [openDeleteGroup, setOpenDeleteGroup] = React.useState(false);
    const [openDeleteUser, setOpenUser] = React.useState(false);
    const [listToBeDeleted, setListToBeDeleted] = React.useState(null);
    const [listToBeEdited, setListToBeEdited] = React.useState(null);
    const [listIconToBeEdited, setIconToBeEdited] = React.useState(null);
    const [listColourToBeEdited, setColourToBeEdited] = React.useState(null);

    const location = useLocation();
    let history = createBrowserHistory();

    history.listen(({ action, location }) => {
        console.log(
            `The current URL is ${location.pathname}${location.search}${location.hash}`
        );
        console.log(`The last navigation action was ${action}`);
    });

    const getUser = () => {
        try {
            return user['email']
        }
        catch (err) {
            navigate('/authemtication/login')
        }
    }

    const handleClickShare1 = (index, event) => {
        setAnchorElShare1({ [index]: event.currentTarget });
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
    const handleCloseShare1 = () => {
        setAnchorElShare1(false);
    };
    const handleClick1 = (index, event) => {
        setAnchorEl1({ [index]: event.currentTarget });
    };
    const handleClose1 = () => {
        setAnchorEl1(false);
    };
    const listname = useSelector((state) => state.customization.listname);
    const handleClickShare = (index, event) => {
        setAnchorElShare({ [index]: event.currentTarget });
    };
    const handleCloseShare = () => {
        setAnchorElShare(false);
    };
    const handleClick = (index, event) => {
        setAnchorEl({ [index]: event.currentTarget });
    };
    const handleClose = () => {
        setAnchorEl(false);
    };

    const handleClose2 = () => {
        setOpen(false);
    };

    //Delete List
    const handleClickOpenDeleteList = (name) => {
        setListToBeDeleted(name);
        setOpenDeleteList(true)
    }

    const handleCloseDeleteList = (name) => {
        setListToBeDeleted(name);
        setOpenDeleteList(false)
    }

    //Delete Group
    const handleClickOpenDeleteGroup = () => {
        setOpenDeleteGroup(true)
    }

    const handleCloseDeleteGroup = () => {
        setOpenDeleteGroup(false)
    }

    //User
    const handleClickOpenUser = () => {
        setOpenUser(true)
    }

    const handleCloseUser = () => {
        setOpenUser(false)
    }

    //Edit
    const handleClickOpenEditList = (name,iname,cname) => {
        setListToBeEdited(name);
        setIconToBeEdited(iname);
        setColourToBeEdited(cname);
        setOpenEditList(true)
    }

    const handleCloseEditList = (name,iname,cname) => {
        setListToBeEdited(name);
        setIconToBeEdited(iname);
        setColourToBeEdited(cname);
        setOpenEditList(false)
    }


    const handleListItemClick = (index) => {
        setSelectedIndex(index);
    };
    const colorswap = () => {
        if (colorSwip === 'primary')
            setColorSwip('secondary')
        else
            setColorSwip('primary')
    }
    const SelectedGroup = (objects, value) => {
        let result = true
        for (var liss in objects['list']) {
            // console.log(rec[1]['list'][liss] +''+ lis[0] )
            // console.log(value[0]+' '+objects['list'][liss][0]  )
            if (objects['list'][liss][0] === value[0]) {
                result = false
            }
        }
        return result
    }

    const [setnamekush, setNameKush] = useState([]);

    function addItemToCart(e) {
      const item = e.target.value;
      console.log(item);
      setNameKush([...setnamekush, item]);
    }


    const allData = () => {
        // const user = JSON.parse(localStorage.getItem('user'))

        if (selectedList.length === 0 && selectedUser.length === 0) {
            <Grid item xs={12} />
            return "Select List First"
        }
        return <>
            <Grid item xs={6}>
                <Card elevation={0} style={{ borderRight: '0.2px solid lightgrey', borderRadius: 0 }}>
                    <CardHeader title="LISTS"
                        action={
                            <>
                                <IconButton aria-label="settings" size="large" onClick={() => {
                                    setOpen(true);
                                }}>
                                    <LaunchIcon />
                                </IconButton>
                                <Modal
                                    aria-labelledby="transition-modal-title"
                                    aria-describedby="transition-modal-description"
                                    className={classes.modal}
                                    open={open}
                                    onClose={() => { handleClose2(); }}
                                    closeAfterTransition
                                    disableBackdropClick
                                >
                                    <Fade in={open} style={{ borderRadius: '2%' }} >
                                        <div className={classes.paper}>
                                            <ShareWith listname="self" group={selectedIndex} fetch={fetch} />
                                        </div>
                                    </Fade>
                                </Modal>
                            </>
                        }
                    />
                    <Paper style={{ height: 460, overflow: 'auto' }}>
                        <List >
                            <ListItem key={1} button component={NavLink} to={`/create-new-list/${selectedIndex}/${user['email']}`} >
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText id={1} primary={'Create New Blank List'} />
                            </ListItem>
                            {
                                selectedList.length !== 0 && (
                                    selectedList.map((lis, index) => {
                                        return (
                                            <ListItem key={index} button onDoubleClick={() => {
                                                axiosInstance.get("deleteField/".concat(lis[0] + '/'))
                                                    .then(res => {
                                                        const allFields = res.data;
                                                        console.log(allFields)
                                                        localStorage.setItem("fields", JSON.stringify(allFields));
                                                    })
                                                console.log(lis)
                                                dispatch({ type: GROUP_LIST, group_list: { group: selectedIndex, list: lis[0] } });

                                                navigate(`/list/display-list-data`)
                                                dispatch({ type: LISTNAME, listname: { modelname: lis[0], color: lis[2], icon: lis[1], description: lis[4] } });
                                            }} >

                                                <ListItemIcon >
                                                    <Icon component={MuiIcons[lis[1]]} style={{ color: lis[2] }}></Icon>
                                                </ListItemIcon>
                                                <Tooltip title="Double Click To View Lists">
                                                    <ListItemText id={index} primary={lis[0]} />
                                                </Tooltip>
                                                <ListItemSecondaryAction>
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="comments"
                                                        onClick={handleClickOpenDeleteGroup}
                                                        size="large">
                                                        <DeleteIcon />
                                                    </IconButton>
                                                    <Dialog
                                                        open={openDeleteGroup}
                                                        onClose={handleCloseDeleteGroup}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                        style={{ padding: 20 }}
                                                    >
                                                        <DialogContent style={{ height: 80, width: 300 }}>
                                                            <DialogContentText id="alert-dialog-description" style={{ fontSize: '25px', textAlign: 'center' }}>
                                                                Delete List For Sure?
                                                            </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                            <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 160 }} onClick={handleCloseDeleteGroup}>Cancel</Button>
                                                            <Button color="warning" style={{ color: '#00ff00', fontSize: "20px", width: 160 }} onClick={() => {
                                                                axiosInstance.delete(`deletemodel/ModelSchema/${lis[0]}/`)
                                                                    .then((response) => {
                                                                        // alert(response.data);
                                                                        // console.log(response.data)
                                                                        enqueueSnackbar(`${lis[0]} Delete Successfully`, {
                                                                            variant: 'error',
                                                                        })
                                                                        fetch()
                                                                    }).catch((e) => {
                                                                        console.log(e)
                                                                        enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                            variant: 'error',
                                                                        })
                                                                    });
                                                            }} autoFocus>
                                                                Confirm
                                                            </Button>
                                                        </DialogActions>
                                                    </Dialog>
                                                </ListItemSecondaryAction>
                                            </ListItem>

                                        );
                                    }
                                    )
                                )
                            }
                        </List>
                    </Paper>
                </Card>
            </Grid>
            {/* <Divider orientation="vertical"   flexItem style={{ marginLeft:10, marginRight:10 }} /> */}
            <Grid item xs={6} >
                <Card elevation={0}>
                    <CardHeader title="PEOPLE"
                        subheader=""
                        action={
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">User Defined</InputLabel>
                                <Select
                                    native
                                    variant="standard"
                                    disableUnderline
                                >
                                    <option aria-label="None" value="" />
                                    <option value={10}>Force editor rights to all</option>
                                    <option value={20}>Force viewer rights to all</option>
                                </Select>
                            </FormControl>
                        }
                    />
                    <Paper style={{ height: 460, overflow: 'auto' }}>
                        <List>
                            {
                                selectedUser.length !== 0 && (
                                    selectedUser.map((user, index) => {
                                        return (
                                            <ListItemWithWiderSecondaryAction dense key={index} button style={{ paddingRight: 96 }} >
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <PersonIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                {user[0] === getUser() ?
                                                    <ListItemText id={index} primary='Me' /> :
                                                    <ListItemText id={index} primary={user[0]} />
                                                }

                                                {myRules[selectedGroup] === 'edit' && user[0] !== getUser() ?
                                                    <ListItemSecondaryAction>
                                                        <FormControl className={classes.formControl}>
                                                            <Select
                                                                // defaultValue={user[1]}
                                                                variant="standard"
                                                                native
                                                                disableUnderline
                                                                onChange={(e) => {
                                                                    axiosInstance.put(`user/Share-user/${user[2]}/${selectedIndex}/`, { group: selectedIndex, user: user[2], permission: e.currentTarget.value })
                                                                        .then((response) => {
                                                                            // alert(response.data);
                                                                            console.log(response.data)
                                                                            console.log(user)
                                                                            console.log(JSON.parse(localStorage.getItem('user')).email)
                                                                            enqueueSnackbar(`${user[2]} Permission Updated`, {
                                                                                variant: 'success',
                                                                            })
                                                                            fetch()
                                                                        }).catch((e) => {
                                                                            enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                                variant: 'error',
                                                                            })
                                                                        });
                                                                }}
                                                            >
                                                                <option selected={user[1] === 'edit' ? true : false} value={'edit'} >Can Edit List </option>
                                                                <option selected={user[1] === 'view' ? true : false} value={'view'} >Can View List</option>
                                                            </Select>
                                                        </FormControl>
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="comments"
                                                            onClick={handleClickOpenUser}
                                                            size="large">
                                                            <CancelIcon />
                                                        </IconButton>
                                                        <Dialog
                                                            open={openDeleteUser}
                                                            onClose={handleCloseUser}
                                                            aria-labelledby="alert-dialog-title"
                                                            aria-describedby="alert-dialog-description"
                                                            style={{ padding: 20 }}
                                                        >
                                                            <DialogContent style={{ height: 80, width: 300 }}>
                                                                <DialogContentText id="alert-dialog-description" style={{ fontSize: '25px', textAlign: 'center' }}>
                                                                    Remove User?
                                                            </DialogContentText>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 160 }} onClick={handleCloseUser}>Cancel</Button>
                                                                <Button color="warning" style={{ color: '#00ff00', fontSize: "20px", width: 160 }} onClick={() => {
                                                                    axiosInstance.delete(`user/Share-user/${user[2]}/${selectedIndex}/`)
                                                                        .then((response) => {
                                                                            // alert(response.data);
                                                                            console.log(response.data)
                                                                            enqueueSnackbar(`${user[2]} Remove Successfully`, {
                                                                                variant: 'error',
                                                                            })
                                                                            fetch()
                                                                        }).catch((e) => {
                                                                            enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                                variant: 'error',
                                                                            })
                                                                        });
                                                                }} autoFocus>
                                                                    Confirm
                                                            </Button>
                                                            </DialogActions>
                                                        </Dialog>
                                                    </ListItemSecondaryAction> :
                                                    <></>
                                                }
                                            </ListItemWithWiderSecondaryAction>
                                        );
                                    }
                                    )
                                )
                            }
                        </List>
                    </Paper>
                </Card>
            </Grid>
        </>;
    }
    const allLists = () => {
        if (selectedList.length === 0) {
            return <img src={WarningImg} style={{ display: 'block', marginTop: 50, marginLeft: 'auto', marginRight: 'auto', width: '23%' }} />
        }
        return (
            <div style={{ width: '100%' }} >
                {/* 
                    <Typography style={{margin:20, fontSize:20}}> My List</Typography>
                </Stack> */}
                <Grid container style={{ margin: 20 }} direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start" >
                    <Grid item>
                        <Typography style={{ fontSize: 20 }}>MY LISTS</Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ '& > :not(style)': { width: 350 } }} >
                            <FormControl variant="standard">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={searchState ? searchState : []}
                                    sx={{ margin: '5px 0 20px 18px', width: '85%' }}
                                    renderInput={params => {
                                        return <TextField {...params} label="Enter List to Work on" size='small' />
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
                <Paper style={{ height: 490, overflow: 'auto', padding: 30, }} elevation={0}>
                    <Grid container spacing={2}>
                        {
                            selectedList.map((lis, index) => {
                                return (
                                    //    <div style={{ height: "270px", width: 200 }}>
                                    //        <Paper style={{ height: 200, width: "280px", borderRadius:10 }}>

                                    //    </Paper>
                                    //    </div>
                                    <Grid item xs={4}>
                                        <Card className={classes.card} style={{ marginTop: 12, }} elevation={1} onDoubleClick={() => {
                                            axiosInstance.get("deleteField/".concat(lis[0] + '/'))
                                                .then(res => {
                                                    const allFields = res.data;
                                                    console.log(allFields)
                                                    localStorage.setItem("fields", JSON.stringify(allFields));
                                                })
                                            console.log(lis)
                                            dispatch({ type: GROUP_LIST, group_list: { group: selectedIndex, list: lis[0] } });
                                            navigate(`/list/display-list-data`)
                                            dispatch({ type: LISTNAME, listname: { modelname: lis[0], color: lis[2], icon: lis[1], description: lis[4] } });
                                        }}>
                                            <CardActionArea>
                                                <CardHeader
                                                    avatar={
                                                        <Avatar style={{ backgroundColor: 'white' }} >
                                                            <Icon component={MuiIcons[lis[1]]} style={{ color: lis[2] }}></Icon>
                                                        </Avatar>
                                                    }
                                                    action={
                                                        <Box >
                                                            <IconButton onClick={(e) => handleClick(index, e)} size="large">
                                                                <MoreVertIcon />

                                                            </IconButton>
                                                            <Menu
                                                                anchorEl={anchorEl && anchorEl[index]}
                                                                keepMounted
                                                                open={anchorEl && Boolean(anchorEl[index])}
                                                                onClose={handleClose}
                                                                // getContentAnchorEl={null}
                                                                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                                                transformOrigin={{ vertical: "top", horizontal: "center" }}
                                                            >
                                                                <div>
                                                                    <MenuItem
                                                                        key={index * 2}
                                                                        onClick={(e) => handleClickShare(index * 2, e)}
                                                                    >
                                                                        {'Share With'}
                                                                    </MenuItem>
                                                                    <Dialog open={anchorElShare && Boolean(anchorElShare[index * 2])} onClose={handleClose}  >
                                                                        <DialogTitle style={{ fontSize: "30px", textAlign: 'center' }}>Share  List  With  Other  Groups</DialogTitle>
                                                                        <DialogContent style={{ width: 500, lineHeight: 10, color: "#000000", padding: "30px" }}>
                                                                            <Autocomplete
                                                                                multiple
                                                                                id="tags-standard"
                                                                                options={Object.entries(data.groups).filter((rec, indexx) =>
                                                                                    SelectedGroup(rec[1], lis)
                                                                                ).map(
                                                                                    rec => rec[1]
                                                                                )
                                                                                }
                                                                                getOptionLabel={(option) => option.name}
                                                                                onChange={(_event, selected) => {
                                                                                    setShareWith(selected)
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        variant="outlined"
                                                                                        label="Multiple values"
                                                                                        placeholder="Groups"
                                                                                        fullWidth
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            <Button style={{ color: "#FF0000", fontSize: "20px", width: 265 }} onClick={() => {
                                                                                setShareWith(null);
                                                                                handleCloseShare()
                                                                            }}>Cancel</Button>
                                                                            <Button style={{ color: "#00FF00", fontSize: "20px", width: 265 }} onClick={
                                                                                () => {
                                                                                    console.log({ group: shareWith, list: lis[0] })
                                                                                    axiosInstance.post('links/ListThree/', { group: shareWith, list: lis[0] })
                                                                                        .then((response) => {
                                                                                            // alert(response.data);
                                                                                            console.log(response.data)
                                                                                            enqueueSnackbar(`${lis[0]} Share Successfully`, {
                                                                                                variant: 'success',
                                                                                            })
                                                                                            fetch()
                                                                                        }).catch((e) => {
                                                                                            enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                                                variant: 'error',
                                                                                            })
                                                                                        });
                                                                                    setShareWith(null)
                                                                                    handleCloseShare()
                                                                                    // window.location.reload()
                                                                                }
                                                                            }>Save Changes</Button>
                                                                        </DialogActions>
                                                                    </Dialog>
                                                                </div>
                                                                <div>
                                                                    <MenuItem
                                                                        key={2}
                                                                        onClick={() => {
                                                                            axiosInstance
                                                                                .delete(`links/${lis[0].split(' ').join('_')}/${selectedIndex}`)
                                                                                .then((res) => {
                                                                                    // console.log(res.data)
                                                                                    enqueueSnackbar(`${lis[0]} Remove Successfully`, {
                                                                                        variant: 'error',
                                                                                    })
                                                                                    fetch()
                                                                                })
                                                                                .catch(e => {
                                                                                    console.log(e)
                                                                                    enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                                        variant: 'error',
                                                                                    })
                                                                                })
                                                                            handleClose()
                                                                        }}
                                                                    >
                                                                        {'Remove List From Group'}
                                                                    </MenuItem>
                                                                </div>
                                                            </Menu>
                                                        </Box>
                                                    }
                                                    title={
                                                        <Grid container wrap="nowrap" style={{ width: '10rem' }} >
                                                            <Grid item xs zeroMinWidth>
                                                                <Typography variant="body1" style={{ fontWeight: "bold", fontSize: 20 }} noWrap > {lis[0]} </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                    subheader={
                                                        <Grid container wrap="nowrap" style={{ width: '10rem' }} >
                                                            <Grid item xs zeroMinWidth>
                                                                <Typography noWrap >
                                                                    {lis[3]}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    }
                                                />
                                                <Divider light />
                                                <CardContent className={classes.content} style={{ overflow: 'auto' }}>
                                                    <>
                                                        <div style={{ width: 'auto', whiteSpace: 'nowrap', height: 70 }}>
                                                            <Box
                                                                component="div"
                                                                sx={{
                                                                    textOverflow: 'ellipsis',
                                                                    overflow: 'hidden',
                                                                    my: 1,
                                                                    p: 1,
                                                                }}
                                                            >
                                                                {lis[4]}
                                                            </Box>
                                                        </div>
                                                        {/* <Box
                                fontSize="h5.fontSize"
                                component="div" 
                                overflow="hidden"            
                                whiteSpace="pre-line"
                                textOverflow="ellipsis"
                                height={70}          
                            >
                                   <Typography variant="body1" gutterBottom > { lis[4]}</Typography> 
                            </Box>
                              */}
                                                    </>

                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Paper>
            </div>
        );
    }
    const classes = useStyles()
    if (!data || data.length === 0) return <p>Can not find any groups, sorry</p>;
    return (
        <div className="App">
            {/* <Container maxWidth={false}> */}
            <div style={{ marginTop: 20, marginBottom: 10, marginLeft: 50 }}>
                <Paper style={{ height: 500, overflow: 'auto', padding: 30 }}>
                    <Grid container direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start" >
                        <Grid item>
                            <Typography variant="h5" style={{ textAlign: 'center', fontSize: '20px' }}>MY LISTS: </Typography>
                            <Typography>Available: {Object.entries(data.personalList).length}</Typography>
                        </Grid>
                        <Grid item>
                            <Box sx={{ '& > :not(style)': { width: 400, marginBottom: 4 } }} >
                                <FormControl variant="standard">
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={searchState ? searchState : []}
                                        sx={{ margin: '5px 0 20px 18px', width: '85%' }}
                                        renderInput={params => {
                                            return <TextField {...params} label="Search" size='small' />
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0} >
                        <Grid item xs={3}>
                            <Card className={classes.card} elevation={5} style={{ height: 220, width: 360 }} onDoubleClick={() => { navigate(`/create-new-list/self/${getUser()}`, { state: { select: 'list' } }) }} >
                                <CardActionArea >
                                    <CardHeader
                                        avatar={
                                            <Avatar aria-label="recipe" style={{ backgroundColor: 'white' }} >
                                                <img src={Plus} />
                                            </Avatar>
                                        }
                                        title={
                                            <Typography variant="body1" style={{ fontWeight: "bold", fontSize: 22 }}  >    {'Add List'} </Typography>
                                        }
                                    />
                                    <Divider light />
                                    <CardContent className={classes.content} sx={{ height: 100 }}>
                                        <>
                                            <Grid container justifyContent="space-between" wrap="nowrap">
                                                <Grid item>
                                                    <Typography variant="body1" > Double Click To add List</Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                                    </CardContent>
                                </CardActionArea >
                            </Card>
                        </Grid>

                        {Object.entries(data.personalList).map((rec, index) => {
                            // console.log(rec)
                            // console.log(index)
                            return (
                                <Grid item xs={3}>
                                    <div style={{ height: "270px", width: 100 }}>
                                        <Paper style={{ height: 200, width: "280px" }}>
                                            <Card className={classes.card} style={{ width: 360, height: 220, borderRadius: 15 }} elevation={5}
                                                onDoubleClick={() => {
                                                    axiosInstance.get("deleteField/".concat(rec[0] + '/'))
                                                        .then(res => {
                                                            const allFields = res.data;
                                                            console.log(allFields)
                                                            localStorage.setItem("fields", JSON.stringify(allFields));
                                                        })
                                                    console.log(rec[0])
                                                    dispatch({ type: GROUP_LIST, group_list: { group: 'self', list: rec[0] } });
                                                    navigate(`/list/display-list-data`)
                                                    dispatch({ type: LISTNAME, listname: { modelname: rec[0], color: rec[1][0][2], icon: rec[1][0][1], description: rec[1][0][0] } });
                                                }}
                                            >
                                                <CardActionArea>
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar aria-label="recipe" style={{ backgroundColor: 'white' }} >
                                                                <Icon component={MuiIcons[rec[1][0][1]]} style={{ color: rec[1][0][2], height: 40, width: 40 }}></Icon>
                                                            </Avatar>
                                                        }

                                                        title={
                                                            <Typography variant="body1" style={{
                                                                fontWeight: "bold", fontSize: 22, textOverflow: 'ellipsis'
                                                                , wordBreak: 'break-all'
                                                            }}  > {rec[0]} </Typography>
                                                        }
                                                        action={
                                                            <div>
                                                                <IconButton onClick={(e) => handleClick1(index, e)} size="large">
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                                <Menu
                                                                    anchorEl={anchorEl1 && anchorEl1[index]}
                                                                    keepMounted
                                                                    open={anchorEl1 && Boolean(anchorEl1[index])}
                                                                    onClose={handleClose1}
                                                                    // getContentAnchorEl={null}
                                                                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                                                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                                                                >
                                                                    <div>
                                                                        <MenuItem
                                                                            key={index * 2}
                                                                            onClick={(e) => handleClickShare1(index * 3, e)}
                                                                        >
                                                                            {'Share With'}
                                                                        </MenuItem>
                                                                        <Dialog open={anchorElShare1 && Boolean(anchorElShare1[index * 3])} onClose={handleClose}>
                                                                            <DialogTitle style={{ fontSize: "30px", textAlign: 'center' }}>Share List With Other Groups</DialogTitle>
                                                                            <DialogContent style={{ width: 500, lineHeight: 10, color: "#000000", padding: "30px" }}>
                                                                                <Autocomplete
                                                                                    multiple
                                                                                    id="tags-standard"
                                                                                    options={Object.entries(data.groups).filter((recc, indexx) =>
                                                                                        SelectedGroup(recc[1], rec)
                                                                                    ).map(
                                                                                        recc => recc[1]
                                                                                    )
                                                                                    }
                                                                                    getOptionLabel={(option) => option.name}
                                                                                    onChange={(_event, selected) => {
                                                                                        setShareWith1(selected)
                                                                                    }}
                                                                                    renderInput={(params) => (
                                                                                        <TextField
                                                                                            {...params}
                                                                                            variant="outlined"
                                                                                            label="Multiple values"
                                                                                            placeholder="Groups"
                                                                                        />
                                                                                    )}
                                                                                />
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button style={{ color: "#FF0000", fontSize: "20px", width: 265 }} onClick={() => {
                                                                                    setShareWith1(null);
                                                                                    handleCloseShare1()
                                                                                }}>Cancel</Button>
                                                                                <Button style={{ color: "#00ff00", fontSize: "20px", width: 265 }} onClick={
                                                                                    () => {
                                                                                        // console.log({group:shareWith,list:lis[0]})
                                                                                        axiosInstance.post('links/ListThree/', { group: shareWith1, list: rec[0] })
                                                                                            .then((response) => {
                                                                                                // alert(response.data);
                                                                                                enqueueSnackbar(`${rec[0]} Share Successfully`, {
                                                                                                    variant: 'success',
                                                                                                })
                                                                                                fetch()
                                                                                            }).catch((e) => {
                                                                                                enqueueSnackbar(`You Havn't Permission To Modify`, {
                                                                                                    variant: 'error',
                                                                                                })
                                                                                            });
                                                                                        setShareWith1(null)
                                                                                        handleCloseShare1()
                                                                                        // window.location.reload()
                                                                                    }
                                                                                }>Save</Button>
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </div>
                                                                    <div>
                                                                        <MenuItem
                                                                            key={2}
                                                                            onClick={() => { handleClickOpenDeleteList(rec[0]) }}
                                                                        >
                                                                            {'Delete List'}
                                                                        </MenuItem>
                                                                        <Dialog
                                                                            open={openDeleteList}
                                                                            onClose={handleCloseDeleteList}
                                                                            aria-labelledby="alert-dialog-title"
                                                                            aria-describedby="alert-dialog-description"
                                                                            style={{ padding: 20 }}
                                                                        >
                                                                            <DialogContent style={{ height: 80, width: 300 }}>
                                                                                <DialogContentText id="alert-dialog-description" style={{ fontSize: '25px', textAlign: 'center' }}>
                                                                                    Delete List?
                                                                                </DialogContentText>
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 160 }} onClick={handleCloseDeleteList}>Cancel</Button>
                                                                                <Button color="warning" style={{ color: '#00ff00', fontSize: "20px", width: 160 }}
                                                                                    onClick={() => {
                                                                                        axiosInstance
                                                                                            .delete(`deletemodel/ModelSchema/${listToBeDeleted}/`)
                                                                                            .then((res) => {
                                                                                                enqueueSnackbar(`${listToBeDeleted} Delete Successfully`, {
                                                                                                    variant: 'error',
                                                                                                })
                                                                                                fetch()
                                                                                            })
                                                                                            .catch(e => {
                                                                                                console.log(e)
                                                                                            })
                                                                                        // handleClose1()
                                                                                    }} autoFocus>
                                                                                    Confirm
                                                                                </Button>
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </div>
                                                                    <div>
                                                                        <MenuItem
                                                                            key={3}
                                                                            onClick={() => { console.log(rec) ;handleClickOpenEditList(rec[0],rec[1][0][1],rec[1][0][2]) }}
                                                                        >
                                                                            {'Edit List'}
                                                                        </MenuItem>
                                                                        <Dialog
                                                                            open={openEditList}
                                                                            onClose={handleCloseEditList}
                                                                            aria-labelledby="alert-dialog-title"
                                                                            aria-describedby="alert-dialog-description"
                                                                            style={{ padding: 20 }}
                                                                        >                                                                            
                                                                            <DialogContent style={{ width: 350, lineHeight: 3.5, color: "#000000", padding: "30px" }}>
                                                                                New Name:
                                                                                <Grid container spacing={1} alignItems="flex-end">
                                                                                    <Grid item xs={3} alignContent='top'>
                                                                                        <div className="login-badges">
                                                                                            {badgeMenu.map((item, i) => {
                                                                                                return (
                                                                                                    <PopOverMenu
                                                                                                        onChange={onChangeUpdate}
                                                                                                        onChangeIcon={onChangeIcon}
                                                                                                        key={i}
                                                                                                        icon={<Icon component={MuiIcons[listIconToBeEdited]} style={{ color: listColourToBeEdited, height: 40, width: 40 }} ></Icon>}
                                                                                                        where={"header"}
                                                                                                        menu={item.menu}
                                                                                                    />
                                                                                                );
                                                                                            })}
                                                                                        </div>
                                                                                    </Grid>
                                                                                    <Grid item xs={9}>
                                                                                        <Tooltip title={listToBeEdited} placement="right-start" arrow >
                                                                                            <TextField defaultValue={listToBeEdited}
                                                                                                sx={{
                                                                                                    width: '90%',
                                                                                                }}
                                                                                                onBlur={(e) => {
                                                                                                    // const listdetail =  JSON.parse(localStorage.getItem('listname'))
                                                                                                    if ((e.target.value).length != 0) {
                                                                                                        axiosInstance.put(`editModelname/${listToBeEdited}/`, { modelname: e.target.value })
                                                                                                            .then(res => {
                                                                                                                console.log(res.data)                                                                                                              
                                                                                                                dispatch({ type: LISTNAME, listname: { modelname: res.data['modelname'], color: res.data['color'], icon: res.data['icon'], description: res.data['description'] } });
                                                                                                                enqueueSnackbar(`${e.target.value} Updated Successfully. Please Reload`, {
                                                                                                                    variant: 'success',
                                                                                                                })
                                                                                                                fetch()                                                                                                          
                                                                                                                localStorage.removeItem('listname')
                                                                                                                localStorage.setItem('listname', JSON.stringify(res.data))
                                                                                                                
                                                                                                               
                                                                                                            }).catch(e => {
                                                                                                                enqueueSnackbar(`Try Again`, {
                                                                                                                    variant: 'error',
                                                                                                                })
                                                                                                            })
                                                                                                    }
                                                                                                    else
                                                                                                        navigate(`/`)
                                                                                                }} />
                                                                                        </Tooltip>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </DialogContent>
                                                                            <DialogActions>
                                                                                <Button color="warning" style={{ color: '#ff0000', fontSize: "20px", width: 400 }} onClick={() => 
                                                                                    {
                                                                                        handleCloseEditList();
                                                                                    }
                                                                                    }>Close</Button>                                                                                
                                                                            </DialogActions>
                                                                        </Dialog>
                                                                    </div>
                                                                    {/* <div>
                                                                        <MenuItem
                                                                            key={4}
                                                                            onClick={async () => {
                                                                                try {
                                                                                    let newModel = (await axiosInstance.get(`allLists/${rec[0]}/`)).data;
                                                                                    delete newModel['id'];
                                                                                    let ogModelName = rec[0];
                                                                                    newModel.modelname = `${newModel.modelname}_Copy`; //urls not firing
                                                                                    newModel.created_by = getUser();
                                                                                    newModel.group = 'self';
                                                                                    let response = await axiosInstance.post('registerModel/', newModel);
                                                                                    console.log(response.data);
                                                                                    let fields = (await axiosInstance.get(`deleteField/${rec[0]}/`)).data;
                                                                                    for (let i = 0; i < fields.length; ++i) {
                                                                                        delete fields[i]['id'];
                                                                                        fields[i].modelname = newModel.modelname;
                                                                                        let res = await axiosInstance.post('addFields/', fields[i]);
                                                                                        console.log(`Field ${fields[i].name} created: `, res.data);
                                                                                    }
                                                                                    let data = (await axiosInstance.get(`models/single/${ogModelName}/self`)).data;
                                                                                    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                                                                                    for (let i = 0; i < data.length; ++i) {
                                                                                        delete data[i]['id'];
                                                                                        const formData = new FormData();
                                                                                        Object.entries(data[i]).map(entry => {
                                                                                            if (entry[0] === 'id')
                                                                                                return;
                                                                                            console.log(entry[0], entry[1]);
                                                                                            formData.append(`${entry[0]}`, entry[1]);
                                                                                        })
                                                                                        console.log(formData);
                                                                                        let res = await axiosInstance.post(`models/single/${newModel.modelname}/abcd/`, formData, config);
                                                                                        console.log(res.data);
                                                                                        console.log(`Field ${data[i].name} created: `, res.data);
                                                                                    }
                                                                                    enqueueSnackbar('List Copied Successfully. Please Reload.', { variant: 'success' });
                                                                                    fetch()
                                                                                } catch (err) {
                                                                                    console.error(err);
                                                                                }
                                                                                // axiosInstance.get("deleteField/".concat(rec[0] + '/'))
                                                                                //     .then(res => {
                                                                                //         const allFields = res.data;
                                                                                //         console.log(allFields)
                                                                                //         localStorage.setItem("fields", JSON.stringify(allFields));
                                                                                //     })
                                                                                // console.log(rec[0])
                                                                                // dispatch({ type: GROUP_LIST, group_list: { group: 'self', list: rec[0] } });
                                                                                // navigate(`/display-list-data`)
                                                                                // dispatch({ type: LISTNAME, listname: { modelname: rec[0], color: rec[1][0][2], icon: rec[1][0][1], description: rec[1][0][0] } });
                                                                            }}
                                                                        >
                                                                            {'Copy List'}
                                                                        </MenuItem>
                                                                    </div>
                                                                    <div>
                                                                        <MenuItem
                                                                            key={5}
                                                                        >
                                                                            {'Pin List'}
                                                                        </MenuItem>
                                                                    </div> */}
                                                                </Menu>
                                                            </div>
                                                        }
                                                    />
                                                    <Divider light />
                                                    <Tooltip title="Double Click To View Lists">
                                                        <CardContent className={classes.content} style={{ overflow: 'auto' }}>
                                                            <>
                                                                <Grid container justifyContent="space-between">
                                                                    <Grid item>
                                                                        <Typography variant="body1" > {rec[1][0][0]} </Typography>
                                                                    </Grid>
                                                                </Grid>
                                                            </>
                                                        </CardContent>
                                                    </Tooltip>
                                                    <CardActions >
                                                        {/* <PushPinOutlinedIcon style={{ position:'relative', bottom:'0px', right:'0px' }}/> */}
                                                    </CardActions>
                                                </CardActionArea>
                                            </Card>
                                        </Paper>
                                    </div>
                                </Grid>
                            );
                        })
                        }
                    </Grid>
                </Paper>
            </div>
            <Divider />
            <Container maxWidth={false}>
                <Paper style={{ height: 350, width: "100%" }} elevation={0}>
                    <Grid container >
                        {/* style={{border: '0.5px solid lightgrey', borderRadius:15}} */}
                        <Grid item xs={3}>
                            <Card style={{ borderRadius: 15, fontWeight: 'bold', fontSize: "35px" }} elevation={0} >
                                <CardHeader style={{ textAlign: 'center', backgroundColor: '#e8e9eb' }} title="MY GROUPS"
                                    action={
                                        <ThemeProvider theme={theme}>
                                            <IconButton
                                                aria-label="settings"
                                                onClick={() => { setEditButton(!editButton); colorswap(); }}
                                                size="large">
                                                <LaunchIcon color={colorSwip} />
                                            </IconButton>
                                        </ThemeProvider>
                                    }
                                />
                                <Paper>
                                    <List>
                                        {
                                            Object.entries(data.groups).map((rec, index) => {
                                                return (
                                                    <ListItem key={index} button selected={selectedIndex === rec[1]['name']} onClick={() => { setSelectedGroup(rec[1]['name']); setSelectedList(rec[1]['list']); setSelectedUser(rec[1]['users']); handleListItemClick(rec[1]['name']); }}>
                                                        <ListItemText id={index} primary={rec[1]['name']} style={{ color: selectedIndex === index ? '#ff6600' : '#000000' }} />
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </ListItem>
                                                );
                                            }
                                            )
                                        }
                                    </List>
                                </Paper>
                            </Card>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={8}>
                            {
                                (
                                    editButton && (
                                        <Grid container>
                                            {allData()}
                                        </Grid>
                                    )
                                    ||
                                    (
                                        allLists()
                                    )
                                )
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            {/* </Container> */}
        </div>
    );
}

export function LoadingGroups({ onChange }) {
    let navigate = useNavigate()
    console.log("In Here..");
    function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) {
            // console.log(props)
            return <Groups data={props} onChange={onChange} fetch={props.fetch} searchState={props.searchState} myRules={props.myRules} />;
        }
        return (
            <Container maxWidth="lg" style={{ marginTop: 20 }}>

                <Card elevation={0}>
                    <CardHeader
                        title={
                            "Groups Loading"
                        }
                    />
                    <Paper style={{ border: 1 }}>
                        <CardContent>
                        </CardContent>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Paper>
                </Card>
            </Container>
        );
    };

    const [appState, setAppState] = useState({
        loading: true,
        groups: null,
        personalList: null,
    });

    const [searchState, setSearchState] = useState([]);
    const [myRules, setMyRules] = useState(null);

    const fetchData = useCallback(async () => {
        setSearchState([]);
        axiosInstance
            .get('user/allinformations/')
            .then((res) => {
                const allGroups = res.data;
                const { email } = JSON.parse(localStorage.getItem('user'));
                // console.log('Curr User Email: ', email);
                // console.log(allGroups);
                Object.entries(allGroups).map(entry => {
                    (entry[1].users).map(user => {
                        if (user[0] === email) {
                            setMyRules(prev => {
                                return { ...prev, [entry[1].name]: user[1] }
                            });
                        };
                    })
                    setSearchState(prev => {
                        return [...prev, entry[1].name + '  -Group'];
                    });
                });
                // console.log(newGroups);
                axiosInstance
                    .get('user/listDetails/')
                    .then((res) => {
                        const allLists = res.data;
                        // console.log(allLists);
                        Object.entries(allLists).map(entry => {
                            // console.log(entry[1][0][0]);
                            setSearchState(prev => {
                                return [...prev, entry[0] + '   -List', entry[1][0][0]];
                            });

                        });
                        setAppState({ grouploading: false, groups: allGroups, personalList: allLists });
                    }).catch(
                        (e) => {
                            alert("Please Login First");
                            navigate('/authentication/login');
                        }
                    );

            })
            .catch((e) => {
                // const user = JSON.parse(localStorage.getItem('user'))
                // if (user && user.remember) {
                //     const refreshToken = JSON.parse()
                // }
                alert("Please Login First");
                navigate('/authentication/login');
            })
            ;

    }, [setAppState]);

    useEffect(() => {
        fetchData()
    }, [setAppState]);
    return (
        <div className="App">
            <PostLoadingComponent isLoading={appState.loading} groups={appState.groups} personalList={appState.personalList} fetch={fetchData} searchState={searchState} myRules={myRules} />
        </div>
    );
}

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
