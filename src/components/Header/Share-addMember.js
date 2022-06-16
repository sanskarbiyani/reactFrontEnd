import React, { useState, useEffect, useCallback } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  MenuItem, Select, Grid, Typography
  , Card, CardHeader,
  Container,
  CardContent,
  Paper,
  FormControl
} from '@mui/material';
import axiosInstance from '../../axois';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { Form } from '../ControlFields/Form';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

const lightColor = 'rgba(255, 255, 255, 255)';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: '100%'
  },
  secondaryBar: {
    zIndex: 0,
    background: lightColor,
    color: theme.palette,
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

const grant = [
  {
    value: 'edit',
    label: 'Editor'
  },
  {
    value: "view",
    label: "Viewer"
  },
]
export function AddMemeberDisplay({ users, onChange, fetch }) {
  const classes = useStyles();
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar()
  const [data, setData] = useState(
    badgeMenu
  );

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
  })
  // console.log(`${group} djdsjkjsd ${list}`)
  const onSubmitAddmemeber = (AddMemeberData) => {
    console.log(AddMemeberData)
  }

  const updatePersonalInfo = (des, index) => {
    let newArr = users.map((item, i) => {
      if (index == i) {
        return { ...item, ['permission']: des }
      }
      else {
        return item
      }
    });
    setData(newArr);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmitAddmemeber)}>
      <Paper elevation={0} className={classes.paper} style={{ height: 231 }}>
        <Grid container style={{ marginTop: 10, }} spacing={1} >
          {(users).map((user, index) => {
            console.log(user)
            return (
              <Grid item sm={6}>
                <Paper elevation={0}>
                  <Card className={classes.root} >
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {user['user__user_name'].slice(0, 2)}
                        </Avatar>
                      }
                      action={
                        <FormControl className={classes.formControl}>
                          <Select
                            // defaultValue={user[1]}
                            variant="standard"
                            native
                            disableUnderline
                            onChange={(e) => {

                              axiosInstance.put(`user/Share-user/${user['user__user_name']}/${listname['group']}/`, { group: listname['group'], user: user['user__user_name'], permission: e.currentTarget.value })
                                .then((response) => {
                                  // alert(response.data);
                                  console.log(response.data)
                                  enqueueSnackbar(`${user['user__user_name']} Permission Updated`, {
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
                            <option selected={user['permission'] === 'edit' ? true : false} value={'edit'} >Can Edit List </option>
                            <option selected={user['permission'] === 'view' ? true : false} value={'view'}>Can View List</option>
                          </Select>
                        </FormControl>
                      }
                      title={user['user__user_name']}
                      subheader={user['user__email']}
                    />
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Paper>
      <Grid container justifyContent="space-between" alignItems="flex-end" style={{ marginTop: 20, borderTop: '1px solid #e8e8e8', }}>
        {/* <Grid item >
                                        <Grid container>    
                                            <NotificationsIcon/>
                                            <Typography>Notify</Typography>
                                        </Grid>
                                    </Grid> */}
        <Grid style={{ marginTop: 3 }}>
          {/* <PrimaryButton
                                        color="primary"
                                        variant="contained"
                                        type='submit'
                                        
                                    >
                                        Save
                                    </PrimaryButton> */}
        </Grid>
      </Grid>
    </Form>
  );
}

export default function AddMemeber({ onChange }) {
  let navigate = useNavigate();
  const { group } = useParams();
  const listname = useSelector((state) => state.customization.group_list);
  function PostLoadingComponent({ isLoading, ...props }) {
    if (!isLoading) {
      console.log("Hello")
      console.log(props)
      return <AddMemeberDisplay users={props.users} onChange={onChange} fetch={props.fetch} />;
    }
    return (
      <Container maxWidth="lg" style={{ marginTop: 20 }}>
        <Card elevation={0}>
          <CardHeader
            title={
              "Groups Loading"
            }
          />
          <Paper style={{ height: 470, overflow: 'auto', border: 1 }}>
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
    users: null,
  });

  const fetchData = useCallback(async () => {
    console.log("Jo")
    axiosInstance
      .get(`user/Share-user/specific/${listname['group']}`)
      .then((res) => {
        const allGroups = res.data;
        setAppState({ loading: false, users: allGroups })
      })
      .catch((e) => {
        console.log(e)
        alert("Please Login First");
        // navigate('/login');
      })
      ;
  }, [setAppState]);

  useEffect(() => {
    fetchData()
  }, [setAppState]);
  return (
    <div className="App">
      <PostLoadingComponent isLoading={appState.loading} users={appState.users} fetch={fetchData} />
    </div>
  );
}

let badgeMenu = [
  {
    name: 'SnehalRaj Chaugh',
    email: 'snehalraj2021@gmail.com',
    description: 'edit',
  },
  {
    name: 'Himanshu Chaudhari',
    email: 'himanshuchaudhari2346@gmail.com',
    description: 'edit',
  },
  {
    name: 'Piyush Kirange',
    email: 'piyushKirange@gmail.com',
    description: 'edit',
  },
  {
    name: 'Prashant Kirange',
    email: 'prashantkirange@gmail.com',
    description: 'edit',
  },
];
