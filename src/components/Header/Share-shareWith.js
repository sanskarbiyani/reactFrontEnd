import React, { useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  Grid, Typography, TextField, InputAdornment
} from '@mui/material';
import { SelectCustom } from '../ControlFields/Select'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { Form } from '../ControlFields/Form';
import { useForm } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';

const lightColor = 'rgba(255, 255, 255, 255)';
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 1, 3),
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
      color: theme.palette.warning.main,
      transition: "1s",
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

export default function Share(props) {
  console.log(props.group)
  const [open, setOpen] = React.useState(false);
  const listname = useSelector((state) => state.customization.group_list);
  const [shareData, setShareData] = React.useState({
    email: [],
    permission: 'edit',
    msg: '',
    group: props.group == undefined ? listname['group'] : props.group,
    modelname: props.listname
  })
  const classes = useStyles();
  const [Popen, setPOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      const gg = props.group == undefined ? listname['group'] : props.group
      const res = await axiosInstance.get(`user/alluser/specific/${gg}`);
      const { data } = await res;
      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!Popen) {
      setOptions([]);
    }
  }, [Popen]);

  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm({
    defaultValues: { ...shareData },
    mode: "onBlur",
  })

  const onSubmit = (shareData) => {
    console.log(JSON.stringify(shareData, null, 2))
    axiosInstance.post(`user/Share-user/abc/`, shareData)
      .then(e => {
        console.log(e)
        enqueueSnackbar("List Share Successfully", {
          variant: 'Success',
        })
      })
      .catch((e) => {
        enqueueSnackbar("Please Try Again!", {
          variant: 'Error',
        });
        enqueueSnackbar("Open the list from the groups tab in the dashboard to share lists.", {
          variant: 'Error',
        });
      })
    setShareData({
      email: [],
      permission: 'edit',
      msg: '',
      group: props.group == undefined ? listname['group'] : props.group
    })
    if (props.group != undefined) {
      props.fetch();
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container style={{ marginTop: 10, borderBottom: '1px solid #e8e8e8', }} spacing={1} >
          <Grid item sm={12}>
            <Typography variant="h4" gutterBottom>
              Invite with Email ID:
            </Typography>
          </Grid>
          <Grid item sm={12}>
            <Autocomplete
              multiple
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              id="tags-standard"
              isOptionEqualToValue={(option, value) => option.email === value.email}
              getOptionLabel={(option) => option.email}
              options={options}
              control={control}
              {...register('email')}
              name='email'
              loading={loading}
              onChange={(_event, selected) => {
                setValue('email', selected);
                console.log()

              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  key={121}
                  label={'Enter the Email Here'}
                  placeholder={'Email'}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                        <InputAdornment position="start">
                          <SelectCustom
                            {...register('permission')}
                            id="permission"
                            label="permission"
                            control={control}
                            variant="standard"
                            name="permission"
                            options={grant}
                          />
                        </InputAdornment>
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item sm={12}>
            <TextField
              control={control}
              {...register('msg')}
              label="Add a Message (optional)"
              multiline
              rows={3}
              fullWidth
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="space-between" style={{ marginTop: 20 }}>
          <Grid item >
            <Grid container>
              <NotificationsIcon className={classes.link} />
              <Typography style={{ padding: '2px' }}>Notify</Typography>
            </Grid>
          </Grid>
          <Grid item>
            <PrimaryButton
              color="primary"
              variant="contained"
              type='submit'
            >
              Share
            </PrimaryButton>
          </Grid>
        </Grid>
      </Form>
    </>
  );
}
