import { Input } from '../ControlFields/TextField';
import React, { useState, useEffect } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, Typography, Paper, Icon } from '@mui/material';
import axiosInstance from '../../axois';
import { useSnackbar } from 'notistack';
import { Formik } from "formik";
import { Grid, Box, Tooltip, Badge, CardHeader, CardActionArea, ListItem } from '@mui/material';
import { DropzoneDialog } from 'material-ui-dropzone';
import IconButton from '@mui/material/IconButton';
import { PrimaryButton } from '../ControlFields/SubmitButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate } from 'react-router-dom';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from '../ControlFields/Form';
import { useForm } from 'react-hook-form';
import * as MuiIcons from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import CircleIcon from '@mui/icons-material/CheckCircle';
import * as yup from "yup";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';
const lightColor = 'rgba(255, 255, 255, 255)';


const icons = [
  'ListAlt', 'PlaylistAddCheckCircle', 'PlaylistAddCheckCircleRounded', 'AccessAlarms', 'Timer', 'MonetizationOn',
  'AccountBalanceWallet', 'AddShoppingCart', 'CreditScore', 'AssignmentTurnedInSharp', 'PendingActionsSharp', 'TrackChanges', 'WorkspacePremiumOutlined',
  'DateRangeSharp', 'ScheduleSendSharp', 'Upcoming', 'EventBusySharp', 'EventAvailableSharp', 'People', 'Groups', 'FlashOn', 'OfflineBolt', 'TimelapseSharp', 'BatchPredictionRounded',
  'PublicRounded', 'LinkedIn', 'Settings', 'LaptopMacSharp', 'PhoneIphone', 'CheckCircleOutlineRounded', 'ShoppingBagRounded', 'LocalAtmRounded', 'RequestQuoteRounded',
  'PriceChangeRounded', 'AddBusinessRounded', 'PlaylistRemoveRounded', 'LeakRemoveSharp', 'QrCodeScannerSharp', 'IntegrationInstructionsSharp', 'Campaign', 'BusinessCenter',
  'Email', 'HomeRounded', 'CommuteRounded', 'FlightSharp', 'BadgeRounded', 'EmojiEvents', 'Calculate', 'AlternateEmail', 'ContactMail', 'Google', 'NaturePeople',
  'BarChart'
]
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field")
  ,
});
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

export const ParseThrough = ({ onChange }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = { 'JD_File_Input': [], 'Resumes_File_Input': [], 'CV_Num_Input': 5, 'Percent_Input': 50 };
  const classes = useStyles();
  const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
  const [dropzoneOpen1, setDropzoneOpen1] = React.useState(false);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [flag_colour, setFlagColour] = React.useState(true);
  const [flag_colour1, setFlagColour1] = React.useState(true);

  const handleClickColour = () => {
    setFlagColour(!flag_colour);
  };
  const handleClickColour1 = () => {
    setFlagColour1(!flag_colour1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [data, setValues] = useState({
    name: '',
    description: '',
    icon: 'ListAlt',
    color: '#7057ff',
  });
  const listname = useSelector((state) => state.customization.group_list);
  // const [data1, setValues1] = useState({
  //   modelname: listname['list'],
  //   name: "EMAIL",
  //   data_type: "character",
  //   max_length: 30,
  //   null: true,
  //   unique: false,
  //   input_type: "string",
  //   description: "email of candidate",
  //   columns: {
  //     default_val: "",
  //     require_val: true,
  //     validations: []
  //   }
  // })
  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })
  const [user, setUsers] = useState(JSON.parse(localStorage.getItem('user')))
  const { grp, SetGroup } = useState(JSON.parse(localStorage.getItem('group')))

  const { list, id } = useParams();
  const getUser = () => {

    try {
      return user['email']
    }
    catch (err) {
      navigate('/authentication/login')
    }
  }
  const [selectedIndex, setSelectedIndex] = React.useState();

  const [showdisplay, setDisplay] = React.useState(false);



  // const [formValue,SerFormData] = useState([fieldData])
  // const list_group = useSelector((state) => state.customization.group_list);
  const onSubmit1 = (data) => {
    console.log(JSON.stringify(data, null, 2))
    setValues(data)
    axiosInstance
      .post('/parser/registerModel1/', {
        modelname: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
        created_by: getUser(),
        group: 'self',
      })
      .then((response) => {

        axiosInstance.post('addFields/',
          {
            modelname: data.name,
            name: "RANK",
            data_type: "character",
            max_length: 1000,
            null: true,
            unique: false,
            input_type: "string",
            description: "rank of candidate",
            columns: {
              default_val: "",
              require_val: true,
              validations: []
            }
          }).then((response_two) => {
            axiosInstance.post('addFields/',
              {
                modelname: data.name,
                name: "NAME",
                data_type: "character",
                max_length: 1000,
                null: true,
                unique: false,
                input_type: "string",
                description: "name of candidate",
                columns: {
                  default_val: "",
                  require_val: true,
                  validations: []
                }
              }).then((response_three) => {
                axiosInstance.post('addFields/',
                  {
                    modelname: data.name,
                    name: "EMAIL",
                    data_type: "character",
                    max_length: 1000,
                    null: true,
                    unique: false,
                    input_type: "string",
                    description: "email of candidate",
                    columns: {
                      default_val: "",
                      require_val: true,
                      validations: []
                    }
                  }).then((response_four) => {
                    axiosInstance.post('addFields/',
                      {
                        modelname: data.name,
                        name: "PHONE NUMBER",
                        data_type: "character",
                        max_length: 1000,
                        null: true,
                        unique: false,
                        input_type: "string",
                        description: "phone number of candidate",
                        columns: {
                          default_val: "",
                          require_val: true,
                          validations: []
                        }
                      }).then((response_seven) => {
                        axiosInstance.post('addFields/',
                          {
                            modelname: data.name,
                            name: "SUMMARY",
                            data_type: "character",
                            max_length: 5000,
                            null: true,
                            unique: false,
                            input_type: "string",
                            description: "SUMMARY of candidate",
                            columns: {
                              default_val: "",
                              require_val: true,
                              validations: []
                            }
                          }).then((response_five) => {
                            axiosInstance.post('addFields/',
                              {
                                modelname: data.name,
                                name: "FILE",
                                data_type: "file",
                                max_length: 20000,
                                null: true,
                                unique: false,
                                input_type: "document",
                                description: "",
                                columns: {
                                  default_val: "",
                                  document_type: "",
                                  validations: []
                                }
                              }).then(async (response_six) => {
                                let URL = 'models/single/';
                                URL += `${data.name}/abcd/`;
                                try {
                                  for (let i = 0; i < email.length; ++i) {

                                    let respone = await axiosInstance.get(`parser/getFiles/${email[i].resume_fname}/`, { responseType: 'blob' }
                                    )
                                    // let file = new Blob([respone.data], {type: 'application/pdf'}); 
                                    // file.name = email[i].resume_fname;
                                    const myBlob = new Blob([respone.data], { type: "application/pdf,.doc,.docx,application/docx" })
                                    const myFile = new File([Object.values(email[i].finalcv)], {
                                      type: "application/pdf,.doc,.docx,application/docx",
                                    });

                                    const file = new File([myBlob], email[i].resume_fname, { type: "application/pdf,.doc,.docx,application/docx" });
                                    console.log(file)
                                    file.filename = email[i].resume_fname;
                                    let listEntry1 = new FormData();
                                    listEntry1.append('file', file);
                                    listEntry1.append('name', email[i].resume_name);
                                    listEntry1.append('email', email[i].resume_email);
                                    listEntry1.append('phone_number', email[i].resume_phone);
                                    listEntry1.append('file_name', email[i].resume_fname);
                                    listEntry1.append('rank', email[i].resume_rank);
                                    listEntry1.append('summary', email[i].resume_summary);

                                    respone = await axiosInstance.post(URL, listEntry1, config)
                                    //console.log(respone);
                                    // const blob = new Blob([respone.data], {type: 'application/pdf'})
                                    //   let url = window.URL.createObjectURL(blob);
                                    // window.open(url, '_blank');
                                    // let a = document.createElement("a");
                                    // console.log(url);
                                    // a.href = url;
                                    // a.download = email[i].resume_fname;
                                    // document.body.appendChild(a);
                                    // a.click();
                                  }
                                } catch (err) {
                                  console.log(err);
                                }
                              })
                          })
                      })
                  })
              })




            // console.log(response.data);
            enqueueSnackbar(response.data, {
              variant: 'success',
            })
            localStorage.setItem("listname", JSON.stringify(data));
            // onChange({modelname:data.name,description:data.description,disable:false,color:data.color,icon:data.icon})
            setOpen(false);
          }).catch((e) => {
            enqueueSnackbar("List Already Exists", {
              variant: 'error',
            })
          });

      })
    }
  useEffect(() => {
        localStorage.removeItem("listname");
        localStorage.setItem("listname", JSON.stringify({ modelname: 'ListName', description: 'Create New List!!', disable: true, color: '#878783' }));
      }, [])

  const [colorsel, setColorVal] = useState(0);
    const [iconsel, setIconVal] = useState(0);

    return (
      <div className="App">
        <Formik
          initialValues={initialValues}
          onSubmit={(values, actions) => {
            console.log(values)
            console.log(actions)
            let formData2 = new FormData();
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            console.log(values['Resumes_File_Input'])
            //formData1.append('JD_File_Input',values['JD_File_Input'])
            //formData1.append('Resumes_File_Input',values['Resumes_File_Input'])
            formData2.append('CV_Num_Input', values['CV_Num_Input'])
            formData2.append('Percent_Input', values['Percent_Input'])
            for (let i = 0; i < values['Resumes_File_Input'].length; i++) {
              formData2.append('Resumes_File_Input', values['Resumes_File_Input'][i])
            }
            for (let i = 0; i < values['JD_File_Input'].length; i++) {
              formData2.append('JD_File_Input', values['JD_File_Input'][i])
            }
            axiosInstance
              .post('/parser/parse-through/', formData2, config)
              .then((response) => {
                navigate('/parser/parse-through/')
                console.log(response.data)
                setEmail(response.data);
                setPhone(response.data);

                enqueueSnackbar("Successful! Scroll down to see your results", {
                  variant: 'success',

                })
                setDisplay(false)
                console.log(response.data)
                //localStorage.setItem("listname", JSON.stringify(data));
                // onChange({modelname:data.name,description:data.description,disable:false,color:data.color,icon:data.icon})
              }).catch((e) => {
                enqueueSnackbar("Error! Try Again...", {
                  variant: 'error',
                })
              });
            // navigate('/parser/results/')   
          }
          }
        >
          {props => {
            return (
              <form onSubmit={props.handleSubmit}>
                <Grid container spacing={2} padding={5}>
                  <DropzoneDialog showPreviewsInDropzone={true} name={'Resumes_File_Input'} key={1} showPreviews={false} filesLimit={500} showFileNamesInPreview={true} showFileNames={true}
                    acceptedFiles={["application/pdf,.doc,.docx,application/docx"]}
                    open={dropzoneOpen} onClose={() => { setDropzoneOpen(false); }} onSave={(event) => {
                      console.log(event[0]);
                      props.setFieldValue('Resumes_File_Input', event);
                      setDropzoneOpen(false);
                      handleClickColour(true)
                    }} />
                  <Card className={classes.card} elevation={5} style={{ height: 500, width: 550, position: 'absolute', top: 200, left: 200 }}>
                    <CardActionArea >
                      <CardHeader
                        title={
                          <Typography variant="body1" style={{ fontWeight: "bold", fontSize: 20 }}  > {'Upload CVs'} </Typography>
                        }
                      />

                      <Divider light />
                      <CardContent className={classes.content} >
                        <Grid container justifyContent="space-between" wrap="nowrap" alignItems={'center'}>
                          <Grid item>
                            <Button
                              color={flag_colour ? "warning" : "success"}
                              style={{ padding: 30, textAlign: "center", marginLeft: 100, height: 300, width: 300, fontSize: 30 }}
                              startIcon={<Badge invisible={false}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                badgeContent={<Tooltip title={"Upload File"} arrow><span>
                                  <IconButton
                                    onClick={() => { setDropzoneOpen(true); }}
                                    className={classes.btnUploadWrapper}
                                    disabled={false}
                                    size="small">
                                    {<AttachFileIcon color={flag_colour ? "warning" : "success"} className={classes.btnUpload} style={{ height: 40, width: 40, paddingRight: 30 }} />}
                                  </IconButton>
                                </span></Tooltip>}
                              >
                              </Badge>}
                            >
                              Browse Resumes
                          </Button>
                            <Typography variant="body1" style={{ textAlign: "center", paddingLeft: 70, fontSize: 16 }} >Upload Your Resumes above. <p>Some of your files may not be parsed if corrupt!</p></Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea >
                  </Card>
                  <Card className={classes.card} elevation={5} style={{ height: 500, width: 300, position: 'absolute', top: 200, left: 775 }}>
                    <CardActionArea>
                      <CardHeader title={
                        <Typography variant="body1" style={{ fontWeight: "bold", fontSize: 20 }}  > {'Controls'} </Typography>}>

                      </CardHeader><Divider light />
                      <CardContent style={{ textAlign: 'center' }}>
                        <div>
                          <Typography variant="body1" style={{ fontSize: 16 }}  > {'Required number of CVs: '} </Typography>
                          <Input type="number" style={{ width: 100, textAlign: "center" }} name="CV_Num_Input" onChange={props.handleChange} value={props.values['CV_Num_Input']} />
                          <Typography variant="body1" style={{ fontSize: 16 }}  > {'Percentage Match: '} </Typography>
                          <Input type="number" style={{ width: 100, textAlign: "center" }} name="Percent_Input" onChange={props.handleChange} value={props.values['Percent_Input']} />
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'flex-start',
                              p: 2,
                              marginTop: 5
                            }}
                          >
                            <Grid container direction="row" spacing={2}>
                              <Grid item>
                                <PrimaryButton
                                  color="primary"
                                  variant="contained"
                                  type='submit'
                                  onClick={() => {
                                    setDisplay(true)
                                  }}
                                >
                                  Save details
                              </PrimaryButton>
                              </Grid>
                              <Grid item>
                                <PrimaryButton
                                  color="secondary"
                                  variant="contained"
                                  onClick={() => { navigate("/") }}
                                >
                                  Cancel
                              </PrimaryButton>
                              </Grid>
                            </Grid>                            
                          </Box>
                          <Grid>
                              <Typography style={{color: "red"}}>
                                Maximum number of resumes cannot exceed 500
                              </Typography>
                            </Grid>
                        </div>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                  <DropzoneDialog showPreviewsInDropzone={true} name={'JD_File_Input'} key={2} showPreviews={false} filesLimit={1} showFileNamesInPreview={true} showFileNames={true}
                    acceptedFiles={["application/pdf"]}
                    open={dropzoneOpen1} onClose={() => { setDropzoneOpen1(false); }} onSave={(event) => {
                      console.log(event);
                      props.setFieldValue('JD_File_Input', event);
                      setDropzoneOpen1(false);
                      handleClickColour1(true)
                    }} />
                  <Card className={classes.card} elevation={5} style={{ height: 500, width: 550, position: 'absolute', top: 200, left: 1100 }}>
                    <CardActionArea >
                      <CardHeader

                        title={
                          <Typography variant="body1" style={{ fontWeight: "bold", fontSize: 20 }}  > {'Upload JD'} </Typography>
                        }
                      />
                      <Divider light />
                      <CardContent className={classes.content}>
                        <Grid container justifyContent="space-between" wrap="nowrap">
                          <Grid item>
                            <Button
                              color={flag_colour1 ? "warning" : "success"}
                              style={{ padding: 30, textAlign: "center", marginLeft: 100, height: 300, width: 300, fontSize: 30 }}
                              startIcon={<Badge invisible={false}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }}
                                badgeContent={<Tooltip title={"Upload FIle"} arrow><span>
                                  <IconButton
                                    onClick={() => { setDropzoneOpen1(true); }}
                                    className={classes.btnUploadWrapper}
                                    disabled={false}
                                    size="small">
                                    {<AttachFileIcon color={flag_colour1 ? "warning" : "success"} className={classes.btnUpload} style={{ height: 40, width: 40, paddingRight: 30 }} />}
                                  </IconButton>
                                </span></Tooltip>}
                              >
                              </Badge>}
                            >
                              Browse JD
                          </Button>
                            <Typography variant="body1" style={{ textAlign: "center", paddingLeft: 70, fontSize: 16 }} >Upload your Job Description above. <p>It should be just one file!</p></Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </CardActionArea >
                  </Card>

                </Grid>

              </form>
            );
          }}
        </Formik>
        {
          showdisplay ?
            <Box style={{ height: 'auto', width: 1450, position: 'absolute', top: 750, left: 200 }}>
              <Typography>Parsing Files...</Typography>
              <LinearProgress color="success" />
            </Box>
            :
            <></>
        }
        <Card className={classes.card} elevation={5} style={{ height: 'auto', width: 1450, position: 'absolute', top: 800, left: 200 }}>
          <CardHeader>
          </CardHeader>
          <CardContent>
            <div className="container" style={{ marginLeft: 30 }}>
              <h1>Results:</h1>
              <Button variant="outlined" onClick={handleClickOpen} style={{ position: 'absolute', top: 100, right: 60 }} color="secondary">
                Make List
                      </Button>

              <Dialog open={open} onClose={handleClose} style={{ width: 2000, height: 1000 }}>
                <DialogTitle>Make List</DialogTitle>
                <Form onSubmit={handleSubmit(onSubmit1)}>
                  <Card elevation={0}>

                    <Paper style={{ height: 550, overflow: 'auto', border: 1 }}>
                      <CardContent>

                        <Grid container rowspacing={2} columnspacing={{ xs: 1, sm: 2, md: 1 }}>
                          <Grid item xs={12} style={{ marginTop: 20 }} >

                            <Grid container rowspacing={2} columnspacing={{ xs: 0, sm: 0, md: 0 }} spacing={2}  >

                              <Grid item xs={12}>
                                <Input
                                  {...register('name')}
                                  id="name"
                                  type="text"
                                  label="Name"
                                  control={control}
                                  error={!!errors.name}
                                  helperText={errors?.name?.message}
                                  onChange={(e) => { console.log(e) }}
                                />
                              </Grid>


                              <Grid item xs={12}>
                                <Input
                                  {...register('description')}
                                  id="description"
                                  type="text"
                                  label="Description"
                                  multiline
                                  rows={4}
                                  control={control}
                                  error={!!errors.name}
                                  helperText={errors?.name?.message}

                                />
                              </Grid>
                              <Grid item xs={6} >
                                <Paper>
                                  <Grid container  >

                                    {
                                      badgeMenu.map((item, i) => {
                                        return (
                                          <Grid item xs={4}>
                                            <ListItem key={i} style={{ alignItems: 'center' }} onClick={() => { setValue('color', item.color); setColorVal(i) }} selected={colorsel === i} >
                                              <IconButton size="large">
                                                <CircleIcon style={{ color: item.color, fontSize: 30 }} />
                                              </IconButton>
                                            </ListItem>
                                          </Grid>
                                        );
                                      })
                                    }

                                  </Grid>
                                </Paper>
                              </Grid>
                              <Grid item xs={6} >
                                <Paper style={{ height: 420, overflow: 'auto' }}>
                                  <Grid container  >

                                    {
                                      icons.map((module, i) => {

                                        return (
                                          <Grid item xs={4}>
                                            <ListItem key={i} style={{ alignItems: 'center' }} onClick={() => { setValue('icon', module); setIconVal(i) }} selected={iconsel === i}>
                                              <IconButton size="large">
                                                {/* <img src={module[1]}  width={30} height={30} style={{display:'flex', alignItems:'center'}}    /> */}
                                                <Icon component={MuiIcons[icons[i]]} style={{ width: 30, height: 30 }}   ></Icon>
                                              </IconButton>

                                            </ListItem>
                                          </Grid>
                                        );
                                      })


                                    }

                                  </Grid>
                                </Paper>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>

                    </Paper>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                      }}
                    >
                      <Grid container direction="row-reverse" spacing={2} >
                        <Grid item >
                          <PrimaryButton
                            color="secondary"
                            variant="contained"
                            onClick={handleClose}
                          >
                            Cancel
                                  </PrimaryButton>
                        </Grid>
                        <Grid item xs={3}>
                          <PrimaryButton
                            color="primary"
                            variant="contained"
                            type='submit'

                          >
                            Create List
                                  </PrimaryButton>
                        </Grid>
                      </Grid>
                    </Box>

                  </Card>
                </Form>
              </Dialog>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="left">Rank</TableCell>
                      <TableCell align="left">Name</TableCell>
                      <TableCell align="left">Email</TableCell>
                      <TableCell align="left">Phone No.</TableCell>
                      <TableCell align="left">File Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {email && email.map((email, index) => (
                      <TableRow
                        data-index={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >

                        <TableCell align="left">{email.id}</TableCell>
                        <TableCell align="left">{email.resume_rank}</TableCell>
                        <TableCell align="left">{email.resume_name}</TableCell>
                        <TableCell align="left">{email.resume_email}</TableCell>
                        <TableCell align="left">{email.resume_phone}</TableCell>
                        <TableCell align="left">{email.resume_fname}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
        </Card>
        {/* <div>
          {email && email.map(mail => {
            return(
            <p>
            <ol>
              <li>{mail.resume_email}</li>
              <li>{mail.resume_phone}</li>
            </ol>
            </p> 
            )
          })}
        </div> */}

        {/* <Button  type="submit" onDoubleClick={()=>{navigate(`/create-new-list/self/${getUser()}`,{state:{select:'list'}})}}>
            {'Make List'}
        </Button> */}
        <div>
          {/* <Form onSubmit={handleSubmit(onSubmit1)}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Make List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            List Name
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="List name"
            type="character"
            variant="standard"
          />
          </DialogContent>
          <DialogContent>
          <DialogContentText>
            Description
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            type="character"
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <PrimaryButton
                    color="primary"
                    variant="contained"
                    type='submit'
                    
                >
                    Create List
                </PrimaryButton>
        </DialogActions>
      </Dialog>
      </Form> */}

        </div>
      </div>

    )


  }
  let badgeMenu = [


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

  ];