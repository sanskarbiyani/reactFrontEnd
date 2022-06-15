import React, {useEffect, useState, useCallback} from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Autocomplete from '@mui/material/Autocomplete';
import makeStyles from '@mui/styles/makeStyles';
import {Menu,MenuItem, Icon,Box,Container,Paper, Button, CardHeader, Grid, List, 
    ListItem,ListItemText,ListItemAvatar, ListItemIcon, ListItemSecondaryAction, FormControl,InputLabel,Select,
    Dialog,DialogTitle,DialogContent,TextField,DialogActions, CardActions, Tooltip, IconButton, CardActionArea, Stack, Alert,AlertTitle
} from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import { NavLink, useNavigate } from "react-router-dom";
import LaunchIcon from '@mui/icons-material/Launch'
import AddIcon from '@mui/icons-material/Add'
import ShareIcon from '@mui/icons-material/Share';
import Skeleton from '@mui/material/Skeleton'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import DeleteIcon from '@mui/icons-material/Delete';
import * as MuiIcons from '@mui/icons-material'
import {  useSnackbar } from 'notistack';
import axiosInstance from "../../axois";
import { useDispatch } from 'react-redux';
import WarningImg from "../../assets/Select_a_Group_to_preview.svg"
import { GROUP_LIST, LISTNAME } from "../../store/actions";
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4"
];
const useStyles = makeStyles((theme) => ({
    card: {
        
        transition: "0.4s",
        boxShadow: "0 8px 30px -12px rgba(0,0,0,0.7)",
        "&:hover": {
          boxShadow: "0 16px 50px -12.125px rgba(0,0,0,0.5)"
        }
      },
      button:{
            borderRadius:'50',
            color:theme.palette.primary
      },
      media: {
        paddingTop: "56.25%"
      },
      content: {
         margin:0,
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

  
 const Groups=({data,onChange,fetch})=> {
    console.log(data)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [editButton,setEditButton] = useState(false)
    const [selectedList,setSelectedList] = useState('')
    const [selectedUser,setSelectedUser] = useState('')
    const [colorSwip,setColorSwip] = useState('primary')
    const [selectedIndex, setSelectedIndex] = React.useState();
    const [state,setState] = React.useState()
    const [anchorEl, setAnchorEl] = React.useState(false);
    const [anchorElShare, setAnchorElShare] = React.useState(false);
    const [shareWith,setShareWith] = useState(false);
    const [anchorEl1, setAnchorEl1] = React.useState(false);
    const [anchorElShare1, setAnchorElShare1] = React.useState(false);
    const [shareWith1,setShareWith1] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [user,setUsers] = useState(JSON.parse(localStorage.getItem('user')))

    const getUser = () =>{
      
        try {
          return user['email']
        }
        catch(err) {
          navigate('/login')
        }      
      }

    const handleClickShare1 = (index, event) => {
        setAnchorElShare1({ [index]: event.currentTarget });
      };
    
      const handleCloseShare1 = () => {
        setAnchorElShare1(false);
      };

    const handleClick1 = (index, event) => {
      setAnchorEl1({ [index]: event.currentTarget });
    };
  
    const handleClose1 = () => {
      setAnchorEl1(false);
    };
  

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
  
    const handleListItemClick = ( index) => {
        setSelectedIndex(index);
    };
    const colorswap = () =>{
        if (colorSwip === 'primary')
            setColorSwip('secondary')
        else
            setColorSwip('primary')
    }

    const SelectedGroup = (objects , value)=>{
        let result = true
        
        for (var liss in objects['list']){
                    // console.log(rec[1]['list'][liss] +''+ lis[0] )
                    // console.log(value[0]+' '+objects['list'][liss][0]  )
                    if(objects['list'][liss][0] === value[0]   )
                    {
                        result = false
        
                    }


        

    }
    return result
}
    const allData = () =>{
        // const user = JSON.parse(localStorage.getItem('user'))

        if(selectedList.length===0 && selectedUser.length ===0){
            <Grid item xs={12}/>
            return "Select List First"
        }
        return <>
            
                <Grid item xs={6}>
                    <Card  elevation={0}>
                        <CardHeader title="Lists"
                        action={
                            <IconButton aria-label="settings" size="large">
                            <LaunchIcon />
                            </IconButton>
                        }
                        />
                        <Paper style={{height: 460,  overflow: 'auto'}}>
                        <List >
                                <ListItem key={1} button component={NavLink} to={`/create-new-list/${selectedIndex}/${user['email']}`} >
                                            <ListItemIcon>
                                            <AddIcon />
                                            </ListItemIcon>
                                            <ListItemText id={1} primary={'Create New Blank List'}  />
                                            
                                </ListItem>
                            
                            { 
                                selectedList.length !== 0 && (
                                selectedList.map((lis,index)=>{
                                    
                                    return (
                                        <Tooltip title="double Click to View lists">
                                        <ListItem key={index} button onDoubleClick={()=>{
                                            axiosInstance.get("deleteField/".concat(lis[0]+'/'))
                                            .then(res=>{
                                                const allFields = res.data;
                                                console.log(allFields)
                                                localStorage.setItem("fields", JSON.stringify(allFields));
                                            })
                                            console.log(lis)
                                            dispatch({ type: GROUP_LIST, group_list:{  group: selectedIndex,list: lis[0] } });
                                            
                                            navigate(`/display-list-data`)
                                            dispatch({ type: LISTNAME, listname: {modelname:lis[0],color:lis[2],icon:lis[1],description:lis[4]}});
                                            }} >

                                            <ListItemIcon >
                                            <Icon component={MuiIcons[lis[1]]}  style={{ color:lis[2] }}></Icon>
                                            </ListItemIcon>
                                            <ListItemText id={index} primary={lis[0]}  />
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="comments"
                                                    onClick={()=>{
                                                        axiosInstance.delete(`deletemodel/ModelSchema/${lis[0]}/`)
                                                        .then((response) => {
                                                            // alert(response.data);
                                                            // console.log(response.data)
                                                            enqueueSnackbar(`${lis[0]} Delete Successfully`, { 
                                                            variant: 'error',
                                                            })
                                                            fetch()
                                                            
                                                        }).catch((e)=>{
                                                            console.log(e)
                                                            enqueueSnackbar(`You Havn't Permission To Modify`, { 
                                                                variant: 'error',
                                                              })
                                                            
                                                        });
                                         
                                                    }}
                                                    size="large">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        </Tooltip>
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
                <Card  elevation={0}  >
                        <CardHeader title=""
                        subheader="People"
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
                        <Paper style={{height: 460,  overflow: 'auto' }}>
                        <List>
                            
                            { 
                                selectedUser.length !== 0 &&     (
                                    selectedUser.map((user,index)=>
                                    {
                                    
                                    
                                    return (
                                        <ListItemWithWiderSecondaryAction dense key={index} button style={{ paddingRight:96 }} >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <ImageIcon />
                                                </Avatar>
                                            </ListItemAvatar>

                                            <ListItemText id={index} primary={user[0]}  />
                                            <ListItemSecondaryAction>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="age-native-simple">User Defined</InputLabel>
                                                    <Select
                                                        // defaultValue={user[1]}
                                                        variant="standard"
                                                        native
                                                        disableUnderline   
                                                        onChange={(e)=>{ 
                                                            
                                                                    axiosInstance.put(`user/Share-user/${user[2]}/${selectedIndex}/`,{group:selectedIndex,user:user[2],permission:e.currentTarget.value})
                                                                    .then((response) => {
                                                                        // alert(response.data);
                                                                        console.log(response.data)                
                                                                        enqueueSnackbar(`${user[2]} Permission Updated`, { 
                                                                        variant: 'success',
                                                                        })
                                                                        fetch()
                                                                        
                                                                    }).catch((e)=>{
                                                                        enqueueSnackbar(`You Havn't Permission To Modify`, { 
                                                                            variant: 'error',
                                                                          })
                                                                        
                                                                    });
                                                                    
                                                                    
                                                                    
                                                        }}
                                                    >
                                                        <option selected={ user[1] === 'edit'?true:false }  value={'edit'} >Can Edit List </option>
                                                        <option selected={ user[1] === 'view'?true:false } value={'view'}>Can View List</option>
                                                    </Select>
                                            </FormControl>
                                                <IconButton
                                                    edge="end"
                                                    aria-label="comments"
                                                    onClick={()=>{
                                                        axiosInstance.delete(`user/Share-user/${user[2]}/${selectedIndex}/`)
                                                        .then((response) => {
                                                            // alert(response.data);
                                                            console.log(response.data)
                                                            enqueueSnackbar(`${user[2]} Remove Successfully`, { 
                                                            variant: 'error',
                                                            })
                                                            fetch()
                                                            
                                                        }).catch((e)=>{
                                                            enqueueSnackbar(`You Havn't Permission To Modify`, { 
                                                                variant: 'error',
                                                              })
                                                            
                                                        });
                                         
                                                    }}
                                                    size="large">
                                                    <CancelIcon />
                                                </IconButton>
                                            </ListItemSecondaryAction>
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
    const allLists = () =>{
        if(selectedList.length===0){
            return <img src={WarningImg} style={{  display:'block', marginLeft:'auto',marginRight:'auto',width:'23%'  }} />
        }
        return (
            <div style={{width:'100%'}} >
                 <Stack sx={{ width: '100%' }} spacing={2}>
                    <Typography style={{margin:20, fontSize:20}}> My List</Typography>
                </Stack>
            
                <Paper style={{ height:470, overflow:'auto', padding:30,  }} elevation={0}>
                    <Grid container>
                        {
               
               selectedList.map((lis,index)=>{
                     return (
                         //    <div style={{ height: "270px", width: 200 }}>
                         //        <Paper style={{ height: 200, width: "280px", borderRadius:10 }}>

                         //    </Paper>
                         //    </div>
                         <Grid item xs={5}>

                     <Card className={classes.card} style={{ marginLeft:5,marginTop:12,  }} elevation={1} onDoubleClick={()=>{
                                            axiosInstance.get("deleteField/".concat(lis[0]+'/'))
                                            .then(res=>{
                                                const allFields = res.data;
                                                console.log(allFields)
                                                localStorage.setItem("fields", JSON.stringify(allFields));
                                            })
                                            console.log(lis)
                                            dispatch({ type: GROUP_LIST, group_list:{  group: selectedIndex,list: lis[0] } });
                                            
                                            navigate(`/display-list-data`)
                                            dispatch({ type: LISTNAME, listname: {modelname:lis[0],color:lis[2],icon:lis[1],description:lis[4]}});
                                            }}>
                         <CardActionArea>
                         <CardHeader
                         
                         avatar={
                             <Avatar style={{ backgroundColor:'white' }} >
                                 <Icon component={MuiIcons[lis[1]]}  style={{ color:lis[2] }}></Icon>
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
                                 getContentAnchorEl={null}
                                 anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                 transformOrigin={{ vertical: "top", horizontal: "center" }}
                                 >
                                 <div>
                                     <MenuItem
                                     key={index*2}
                                     
                                     onClick={(e) => handleClickShare(index*2, e)}
                                     >
                                     {'Share With'}
                                     </MenuItem>
                                     <Dialog  open={anchorElShare && Boolean(anchorElShare[index*2])}  onClose={handleClose}  >
                                                 <DialogTitle>Share  List  With  Other  Groups</DialogTitle>
                                                 <DialogContent >

                                                         <Autocomplete
                                                             
                                                             multiple
                                                             id="tags-standard"
                                                             options={Object.entries(data.groups).filter((rec,indexx)=>
                                                                 SelectedGroup(rec[1],lis)
                                                                     
                                                                     
                                                                 ).map(
                                                                     rec=> rec[1]
                                                                 )
                                                             }
                                                             getOptionLabel={(option) => option.name}
                                                             onChange={(_event, selected) => {
                                                                 setShareWith(selected)
                                                                 
                                                               }}
                                                             renderInput={(params) => (
                                                             <TextField
                                                                 {...params}
                                                                 variant="standard"
                                                                 label="Multiple values"
                                                                 placeholder="Groups"
                                                                 fullWidth
                                                             />
                                                             )}
                                                         />
                                                 </DialogContent>
                                                 <DialogActions>
                                                 <Button onClick={()=>{

                                                     setShareWith(null);
                                                     handleCloseShare()}}>Cancel</Button>
                                                 <Button onClick={
                                                     ()=>{
                                                         console.log({group:shareWith,list:lis[0]})

                                                         axiosInstance.post('links/ListThree/',{group:shareWith,list:lis[0]})
                                                         .then((response) => {
                                                             // alert(response.data);
                                                             console.log(response.data)
                                                             enqueueSnackbar(`${lis[0]} Share Successfully`, { 
                                                               variant: 'success',
                                                             })
                                                             fetch()    
                                                           }).catch((e)=>{

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
                                     
                                     onClick={()=>{
                                         axiosInstance
                                         .delete(`links/${lis[0].split(' ').join('_')}/${selectedIndex}`)
                                         .then((res)=>{
                                             // console.log(res.data)
                                             enqueueSnackbar(`${lis[0]} Remove Successfully`, { 
                                                 variant: 'error',
                                               })
                                               fetch()
                                         })
                                         .catch(e=>{
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
                                 <Typography variant="body1" style={{ fontWeight:"bold", fontSize:20 }}  > {lis[0]} </Typography>  
                             }

                             subheader={
                                <div style={{overflow: "hidden", textOverflow: "ellipsis", width: '10rem'}}> 
                                <Typography nowrap="true" className={classes.heading}>
                                    {lis[3]}
                                </Typography>
                                </div> 
                                }
                         />
                         <Divider light/>
                         <CardContent className={classes.content} style={{ overflow:'auto' }}>
                             <>
                             <div style={{ width: 'auto', whiteSpace: 'nowrap', height:70 }}>
                                
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
          <Container maxWidth={false}>
          
          <div style={{ marginTop:20, marginBottom:10}}>
              <Typography style={{ marginLeft: 15, marginBottom: 10}} variant="h5">MyLists</Typography>
          <Paper style={{ height:500, overflow:'auto', padding:30 }}>
          <Grid container spacing={0} >
          <Grid item xs={3}>
                      
                              <Card className={classes.card}  elevation={5} style={{height:200, width:280}} onDoubleClick={()=>{navigate(`/create-new-list/self/${getUser()}`,{state:{select:'list'}})}} >
                              <CardActionArea >
                                  <CardHeader
                                  
                                      title={
                                          <Typography variant="body1" style={{ fontWeight:"bold", fontSize:20 }}  > {'Add List'} </Typography>  
                                      }
                                  />
                            
                                  <Divider light/>
                                  <CardContent className={classes.content} sx={{ height:100 }}>
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
          {Object.entries(data.personalList).map((rec,index)=>{
              
                  return (
                      <Grid item xs={3}>
                      <div style={{ height: "270px", width: 100 }}>
                          <Paper style={{ height: 200, width: "280px" }}>
                              <Card className={classes.card} style={{width:280, height:200, borderRadius:15}} elevation={5} 
                              onDoubleClick={()=>{
                                axiosInstance.get("deleteField/".concat(rec[0]+'/'))
                                .then(res=>{
                                    const allFields = res.data;
                                    console.log(allFields)
                                    localStorage.setItem("fields", JSON.stringify(allFields));
                                })
                                console.log(rec[0])
                                dispatch({ type: GROUP_LIST, group_list:{  group: 'self',list: rec[0] } });
                                
                                navigate(`/display-list-data`)
                                dispatch({ type: LISTNAME, listname: {modelname:rec[0],color:rec[1][0][2],icon:rec[1][0][1],description:rec[1][0][0]}});
                                }}
                              >
                                  <CardActionArea>
                                  <CardHeader
                                  avatar={
                                      <Avatar aria-label="recipe" style={{ backgroundColor:'white' }} >
                                          
                                              <Icon component={MuiIcons[rec[1][0][1]]}  style={{ color:rec[1][0][2] }}></Icon>

                                          
                                      </Avatar>
                                  }
                                      title={
                                          <Typography variant="body1" style={{ fontWeight:"bold", fontSize:20 }}  > {rec[0]} </Typography>  
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
                                              getContentAnchorEl={null}
                                              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                                              transformOrigin={{ vertical: "top", horizontal: "center" }}
                                              >
                                              <div>
                                                  <MenuItem
                                                  key={index*2}
                                                  
                                                  onClick={(e) => handleClickShare1(index*3, e)}
                                                  >
                                                  {'Share With'}
                                                  </MenuItem>
                                                  <Dialog maxWidth={'lg'} open={anchorElShare1 && Boolean(anchorElShare1[index*3])} onClose={handleClose}>
                                                              <DialogTitle>Share List With Other Groups</DialogTitle>
                                                              <DialogContent>
      
                                                                      <Autocomplete
                                                                          multiple
                                                                          id="tags-standard"
                                                                          options={Object.entries(data.groups).filter((recc,indexx)=>
                                                                              SelectedGroup(recc[1],rec)
                                                                                  
                                                                                  
                                                                              ).map(
                                                                                  recc=> recc[1]
                                                                              )
                                                                          }
                                                                          getOptionLabel={(option) => option.name}
                                                                          onChange={(_event, selected) => {
                                                                              setShareWith1(selected)
                                                                              
                                                                            }}
                                                                          renderInput={(params) => (
                                                                          <TextField
                                                                              {...params}
                                                                              variant="standard"
                                                                              label="Multiple values"
                                                                              placeholder="Groups"
                                                                          />
                                                                          )}
                                                                      />
                                                              </DialogContent>
                                                              <DialogActions>
                                                              <Button onClick={()=>{
      
                                                                  setShareWith1(null);
                                                                  handleCloseShare1()}}>Cancel</Button>
                                                              <Button onClick={
                                                                  ()=>{
                                                                      // console.log({group:shareWith,list:lis[0]})
      
                                                                      axiosInstance.post('links/ListThree/',{group:shareWith1,list:rec[0]})
                                                                      .then((response) => {
                                                                          // alert(response.data);
                                                                          
                                                                          enqueueSnackbar(`${rec[0]} Share Successfully`, { 
                                                                            variant: 'success',
                                                                          })
                                                                         fetch() 
                                                                        }).catch((e)=>{
                                                                          enqueueSnackbar(`You Havn't Permission To Modify`, { 
                                                                              variant: 'error',
                                                                            })
                                                                           
                                                                        });
                                                                      
                                                                      setShareWith1(null)
                                                                      handleCloseShare1()
                                                                      
                                                                      // window.location.reload()
                                                                  }
                                                                  }>Save Changes</Button>
                                                              </DialogActions>
                                                          </Dialog>
                                                  </div>
                                                  <div>
                                                  <MenuItem
                                                  key={2}
                                                  
                                                  onClick={()=>{
                                                      axiosInstance
                                                      .delete(`deletemodel/ModelSchema/${rec[0]}/`)
                                                      .then((res)=>{
                                                          enqueueSnackbar(`${rec[0]} Delete Successfully`, { 
                                                              variant: 'error',
                                                            })
                                                            fetch()
                                                      })
                                                      .catch(e=>{
                                                          console.log(e)
                                                      })
      
                                                      handleClose1()
                                                      
                                                  }}
                                                  >
                                                  {'Delete List'}
                                                  </MenuItem>
                                                  </div>
                                              </Menu>
                                          </div>
                                        } 
                                  />
                            
                                  <Divider light/>
                                  <CardContent className={classes.content} style={{ overflow:'auto' }}>
                                      <>
                                      
                                      <Grid container justifyContent="space-between">
                                          
                                          <Grid item>
                                              <Typography variant="body1" > {rec[1][0][0]} </Typography> 
                                          </Grid>
                                      </Grid>
                                      </>
                              
                                  </CardContent>

                                  <CardActions >  
                                      
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
  <Divider/>
          <Paper style={{ height:550 , overflow:'auto' }}>
          <Grid container>
              <Grid item xs={3}>
              <Card style={{borderRadius:15 }} elevation={0} >
                  <CardHeader title="My Groups"
                  action={
                      <IconButton
                          aria-label="settings"
                          onClick={()=>{setEditButton(!editButton); colorswap(); }}
                          size="large">
                        <LaunchIcon color={colorSwip} />
                      </IconButton>
                    }
                  />
                    <Paper style={{height: 460,  overflow: 'auto'}}>
                    <List>
                      
                      { 
                      Object.entries(data.groups).map((rec,index)=>{
                        return (
                            <ListItem key={index} button selected={selectedIndex === rec[1]['name']}  onClick={()=>{setSelectedList(rec[1]['list']); setSelectedUser(rec[1]['users']); handleListItemClick(rec[1]['name']) }}>
                               <ListItemText id={index} primary={rec[1]['name']} style={{ color: selectedIndex === index ? '#ff6600':'#000000' }} />
                            </ListItem>
                          );
                        }
                      )
                          
                      } 
                       
    
                    </List>
                        
                    </Paper>
                </Card>
              </Grid>
              <Divider orientation="vertical" flexItem  />
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
      </div>
  );
}



export function LoadingGroups({onChange}){
    let navigate = useNavigate()
    function PostLoadingComponent({ isLoading, ...props }) {
        
		if (!isLoading) 
        {
            
            console.log(props)
        return <Groups data={props} onChange={onChange} fetch={props.fetch}/>;}
		return (
            <Container maxWidth="lg" style={{ marginTop:20 }}>
            
             <Card elevation={0}>
               <CardHeader
               title={
                   "Groups Loading"
               }
               />
               <Paper style={{height: 470, overflow: 'auto', border:1}}>
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
		loading:true,
		groups: null,
        personalList: null,
	});

    const fetchData = useCallback(async () => {
        axiosInstance
        .get('user/allinformations/')
        .then((res)=>{
        const allGroups = res.data;
        console.log(allGroups)
        axiosInstance
                .get('user/listDetails/')
                .then((res)=>{
                const allLists = res.data;
                // setAppState({ personalList: 'allGroups' });
                console.log(typeof(res.data));
                setAppState({grouploading:false,  groups: allGroups, personalList: allLists });
            }).catch(
                (e)=>{
                        alert("Please Login First");
                        navigate('/login');
                }
            );
        
        console.log(res.data);
    })
    .catch((e)=>{
        alert("Please Login First");
        navigate('/login');
    })
    ;
    
    
    }, [setAppState]);

	useEffect(() => {
        
        fetchData()
        
	}, [setAppState]);
	return (
		<div className="App">
			
			<PostLoadingComponent isLoading={appState.loading} groups={appState.groups} personalList={appState.personalList} fetch={fetchData} />
		</div>
	);
}


