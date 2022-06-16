import React, { useState, useEffect, useRef } from 'react';
import {
  Chip,
  Link,
  Card,
  Paper,
  Box,
  CardContent,
  Container,
  Select,
  MenuItem,
  IconButton,
  TextField,
  Icon,
  CardHeader,
  Typography,
  Tooltip,
  Button,

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import clsx from 'clsx';
import dateFormat from "dateformat";
import axiosInstance from '../../axois';
import Autocomplete from '@mui/material/Autocomplete';
import { Form } from '../ControlFields/Form'
import Skeleton from '@mui/material/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header'
import { NavLink } from 'react-router-dom';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EditIcon from '@mui/icons-material/Edit';
import NumberFormat from 'react-number-format';
import { DataGrid, GridActionsCellItem, GridToolbarContainer, GridToolbarExport, useGridApiRef } from '@mui/x-data-grid';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import * as MuiIcons from '@mui/icons-material'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import ReportShare from './views/report';
import { setReceiver, setIsChatOpen } from '../../store/chatReducer';

const baseURL = "deleteField/"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function timeDiffCalc(dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
  let mili = dateFuture - dateNow

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  // console.log(days+" "+hours+" "+minutes)
  let difference = '';

  if (days > 0) {
    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  }

  difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

  difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`;

  if (mili < 0)
    difference += ' past'
  return difference;
}
export function fileDownload(url, filename) {

  return axiosInstance.get(url, { responseType: 'blob' })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename[filename.length - 1]);
      document.body.appendChild(link);
      link.click();
    })
}

function importAll(r) {
  let images = {};
  r.keys().map(item => { images[item.replace('./', '')] = r(item); });
  return images;
}

function getName(value) {
  try {
    return value.split("/")[5]
  }
  catch (err) {

  }
}

export function DisplayDataEntry({ onChange }) {
  // const { list,group } = useParams();
  const list_group = useSelector((state) => state.customization.group_list);
  const connectedUsers = useSelector(state => state.chat.otherUsers);
  let navigate = useNavigate()
  const dispatch = useDispatch();
  const columsTypes = ['string', 'boolean', 'actions']
  const [open, setOpen] = React.useState(false);
  const [dateColumns, setDateColumns] = React.useState([]);
  const gridApiRef = useGridApiRef();
  // const interval = useRef();

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [

  ];
  const collectionOfdata = [

  ];
  const [appState, setAppState] = useState({
    loading: true,
    cols: null,
    data: [],
    listHistory: null,
    original: [],
    option: [],
    permisssion: false
  });
  // const [editRowsModel, setEditRowsModel] = React.useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(dateColumns);
  }, [dateColumns]);

  useEffect(() => {
    console.log(appState.data);
    return () => {
      console.log('Deleting Data');
    }
  }, [appState.data]);

  useEffect(() => {
    console.log('Loading...');
    if (appState.cols){
      const dateCols = appState.cols.map((col) => {
        if (col.hasOwnProperty('type')){
          if (col['type'] === 'dateTime'){
            console.log('Date Time Field Found.');
            console.log(col);
            setDateColumns(prev => {
              return [...prev, col['field']];
            });
          }
        }
      })
    }
    // if (!appState.loading) {
    //   console.log('Loading Completed.. Setting Interval');
    //   const inter = setInterval(() => {
    //     console.log('From Interval');
    //     updateDateEntry();
    //   }, 5000);

    //   return () => {
    //     console.log('Removing Interval');
    //     clearInterval(inter);
    //   }
    // }
  }, [appState.loading])

  const updateDateEntry = () => {
    console.log(dateColumns);
    console.log(gridApiRef.current.state);
  }

  const handleCellEditCommit = React.useCallback(
    async (params) => {
      //  console.log(params.colDef.type)
      try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        let formData = new FormData()
        if (params.colDef.type === 'date')
          formData.append(params.field, JSON.stringify(params.value).substring(1, 11));
        else
          if (params.colDef.type === 'dateTime'){
            console.log(params.value);
            console.log(typeof(params.value));
            formData.append(params.field, JSON.stringify(params.value).substring(1, 24));
          }
          else
            if (typeof (params.value) == "object")
              formData.append(params.field, JSON.stringify(params.value));
            else
              formData.append(params.field, params.value);
        // for (let [key, value] of formData.entries()) {
        //   console.log(key, ':', value);
        // }

        axiosInstance.put(`models/getCellUpdate/${list_group['list']}/abc/${params.id}/`, formData, config)
          .then(res => {
            enqueueSnackbar(`value Updated Successfully`, {
              variant: 'success',
            })
          }).catch(e => {
            enqueueSnackbar(`Please try again!!`, {
              variant: 'error',
            })

          })
        // Make the HTTP request to save in the backend
        // const response = await mutateRow({
        //   id: params.id,
        //   [params.field]: params.value,
        // });

        // setSnackbar({ children: 'User successfully saved', severity: 'success' });
        // setRows((prev) =>
        //   prev.map((row) => (row.id === params.id ? { ...row, ...response } : row)),
        // );
      } catch (error) {
        // setSnackbar({ children: 'Error while saving user', severity: 'error' });
        // // Restore the row in case of error
        // setRows((prev) => [...prev]);
        navigate("/")
      }
    },
    [],
  );

  const handleInterviewerClick = (event, email, candidate_name) => {
    console.log('Clicked On Interviewer');
    console.log(email);
    console.log(candidate_name);
    const newReceiver = connectedUsers.filter(user => {
      return user[0] === email;
    })
    if (!newReceiver.length) {
      axiosInstance.get(`chat/getusername/${email}`)
        .then(response => {
          response = response.data;
          if (!response.is_online)
            response.is_online = false;
          dispatch(setIsChatOpen(true));
          dispatch(setReceiver([email, response.user_name, response.is_online]));
        })
    } else {
      console.log(newReceiver[0]);
      dispatch(setIsChatOpen(true));
      dispatch(setReceiver(newReceiver[0]));
    }
  }

  const PostLoadingComponent = ({ isLoading, ...props }) => {
    if (!appState.loading) {
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      return (<>
        <Header listname={props.listHistory} group={list_group['group']} select='list' isList={true} permisssion={props.permisssion} />
        <Container maxWidth="false" sx={{ height: "100%", margin: 0 }}>
          <Form >
            <Box
              sx={{
                height: 660,
                backgroundColor: 'white',
                width: 1,
                '& .super-app-theme--cell': {
                  backgroundColor: 'rgba(224, 183, 60, 0.55)',
                  color: '#1a3e72',
                  fontWeight: '600',
                },
                '& .super-app.darkblue': {
                  backgroundColor: '#0070c0',
                  color: '#f5f5f5',
                  fontWeight: '600',
                },
                '& .super-app.lightblue': {
                  backgroundColor: '#00b0f0',
                  color: '#f5f5f5',
                  fontWeight: '600',
                },
                '& .super-app.orange': {
                  backgroundColor: '#ffc000',
                  color: '#212121',
                  fontWeight: '600',
                },
                '& .super-app.yellow': {
                  backgroundColor: '#feff00',
                  color: '#212121',
                  fontWeight: '600',
                },
                '& .super-app.lightgreen': {
                  backgroundColor: '#92d050',
                  color: '#f5f5f5',
                  fontWeight: '600',
                },
                '& .super-app.green': {
                  backgroundColor: '#00b050',
                  color: '#f5f5f5',
                  fontWeight: '600',
                },
                '& .super-app.lightred': {
                  backgroundColor: '#ef9a9a',
                  color: '#212121',
                  fontWeight: '600',
                },
                '& .super-app.red': {
                  backgroundColor: '#e53935',
                  color: '#f5f5f5',
                  fontWeight: '600',
                }
              }}
            >
              <DataGrid rows={appState.data}
                columns={appState.cols}
                onCellEditCommit={handleCellEditCommit}
                pageSize={100}
                rowHeight={100}
                apiRef={gridApiRef}
                // editMode="row"
                components={{
                  Toolbar: () => {
                    return (
                      <div>
                        <GridToolbarContainer>
                          <Button color="success" component={NavLink} to={`/list/new-entry`}>
                            <AddIcon />Add New Entry
                                        </Button>
                          <GridToolbarExport style={{ color: "#800000" }} />
                        </GridToolbarContainer>
                      </div>
                    )
                  },

                  Footer: () => {
                    return (
                      <Box sx={{ padding: '10px', display: 'flex' }}>
                        <Button
                          //  onClick={handleClickOpen}
                          fontSize="small"
                          sx={{
                            mr: 2,
                          }}
                        >
                          <ReportShare data={props.data} cols={props.original[0]} />
                        </Button>
                        <BootstrapDialog
                          onClose={handleClose}
                          aria-labelledby="customized-dialog-title"
                          open={open}
                        >
                          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Modal title
                          </BootstrapDialogTitle>
                          <DialogContent dividers>
                            {
                              Object.entries(props.cols).map((data) => {

                                return (
                                  <div>
                                    {data[0]}
                                  </div>
                                )
                              })
                            }
                          </DialogContent>
                          <DialogActions>
                            <Button autoFocus onClick={handleClose}>
                              Save changes
                            </Button>
                          </DialogActions>
                        </BootstrapDialog>
                      </Box>)
                  },
                }}
                componentsProps={{
                  footer: 'connected',
                }}
                initialState={{ pinnedColumns: { left: ['name'] }, value: appState.data }}
                onStateChange={state => console.log(state)}
              />
            </Box>
          </Form>
        </Container></>)
        ;
    }
    return (
      <Container maxWidth="lg">

        <Card elevation={0}>
          <CardHeader
            titleTypographyProps={{
              style: {
                fontSize: 30,

              }
            }}
            title={
              "List Loading"
            }
          />
          <Paper style={{ height: 470, overflow: 'auto', border: 1 }}>
            <CardContent>
            </CardContent>
            <Skeleton variant="text" width={400} />
            <Skeleton variant="circular" width={70} height={70} />
            <Skeleton variant="rectangular" width={400} height={200} />


          </Paper>
        </Card>

      </Container>


    );
  };



  useEffect(() => {
    let users = null;
    axiosInstance.get('user/alluser/')
      .then((res) => {
        users = res.data
      })

    if (list_group['list'] == null && list_group['group'] == null)
      navigate('/')
    let editt = false;
    axiosInstance
      .get(
        `models/get/${list_group['list']}/${list_group['group']}`)
      .then((res) => {
        // console.log(res.data['edit']);
        editt = res.data['edit'];


        if (editt) {

          columns.push({
            field: 'Edit',
            type: 'actions',
            width: 100,
            getActions: (params) => [
              <GridActionsCellItem
                icon={<EditIcon />}
                label="Edit"
                LinkComponent={NavLink}
                to={`/list/update/${list_group['list']}/${params.id}`}
              />,
              <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={() => {
                  
                  //  axiosInstance.delete(`models/single/${list_group['list']}/${list_group['group']}/${params.id}/`)
                  // .then((res)=>{
                  //   console.log("res.data")
                  //   console.log(typeof(appState.data))
                  //   console.log(appState.data)
                  //   appState.loading = false
                  // let newarr = appState.data.map(key=>{
                  //      if( key.id !==params.id)
                  //          return key
                  // })  
                  // appState.data = newarr
                  // // const remaining =  Object.entries(appState.data).filter((item,index1) =>  item[1].id !==params.id );
                  // // console.log(typeof(remaining))
                  // // appState.data = [...remaining];

                  // // console.log(rem+aining.length)
                  // // const remaining = appState.data.splice()
                  // navigate('/display-list-data')
                  // console.log(appState.data)
                  // }).catch((e)=>{console.log(e)})
                  navigate(`/list/delete-record/${params.id}`)
                }}

              />
            ],
          })
        }

        axiosInstance
          .get(baseURL.concat(list_group['list'] + '/'))
          .then((res) => {
            const allFields = res.data;
            // let edit = true;

            // console.log(edit)
            allFields.map((col) => {
              // console.log(col.input_type)
              if (columsTypes.includes(col.input_type))
                columns.push({
                  headerClassName: 'super-app-theme--header', field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250, type: col.input_type


                })
              else if (col.input_type === 'number') {
                columns.push({
                  headerClassName: 'super-app-theme--header', field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250, type: 'number',
                  renderCell: (params) => {
                    if (col.separater)
                      return params.value
                    return <NumberFormat value={params.value} displayType={'text'} format="##### #####" />

                  }


                })
              }
              else if (col.input_type === 'location') {
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250,
                  valueGetter: (params) => {
                    return params.value
                  },
                  renderEditCell: (params) => {
                    console.log(col)
                    return (<TextField
                      margin="dense"
                      id="days"
                      label={col.name}
                      type="text"
                      select
                      fullWidth
                      variant="outlined"
                      sx={{
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',

                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical'
                      }}
                      SelectProps={{
                        multiple: true,
                        value: [params.value],
                        renderValue: (selected) => {
                          try {
                            return (

                              Object.values(selected[0][0])
                            )
                          }
                          catch (err) {
                            return "Double Click"
                          }


                        }

                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {

                          (col.columns.extra_columns).map((rec, index) => {
                            try {
                              console.log(params.value[index][rec])
                            }
                            catch (err) {
                              if (params.value == null)
                                params.value = {}
                              params.value = Object.assign(params.value, { [index]: { [rec]: '' } })
                            }
                            return (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  gap: 20,
                                  padding: 10
                                }}
                              >
                                <TextField
                                  variant="outlined"
                                  sx={{
                                    width: 'auto',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',

                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: 'vertical'
                                  }}
                                  defaultValue={params.value[index][rec]}
                                  label={rec}
                                  onChange={(e) => {
                                    // const newValue = (params.value as Day[]).map((day) =>
                                    //   day.weekday === weekday.weekday
                                    //     ? /* try setting the modified value from e.target.value
                                    //   to the exact same as the current value (default 08:00);
                                    //                           this is expected to not work */
                                    //       { ...day, start: e.target.value }
                                    //     : day
                                    // );
                                    const { id, api, field, value } = params;
                                    const newValue = value
                                    newValue[index][rec] = e.target.value;
                                    // console.log(value )
                                    // console.log(newValue)

                                    // console.log(
                                    //   "attempting to set row ",
                                    //   id,
                                    //   " field ",
                                    //   field,
                                    //   " from ",
                                    //   value,
                                    //   " to ",
                                    //   newValue
                                    // );
                                    // console.log(api);
                                    // /* try changing the set value from newValue to value (current)
                                    //                                   this is expected to work */
                                    api.setEditCellValue({ id, field, value: newValue });

                                  }}
                                />
                              </div>
                            )
                          })
                        }
                      </div>
                    </TextField>

                    )
                  },
                  renderCell: (params) => {
                    if (params.value) {
                      const loc = Object.entries(params.value).reduce((prevValue, locObj) => {
                        const key = Object.keys(locObj[1]);
                        return { ...prevValue, [key]: locObj[1][key] };
                      }, {})
                      const text = `${loc['streetaddress']}, \n${loc['city']}, ${loc['state']}, \n${loc['countryandregion']} - ${loc['postalcode']}.`;
                      return (
                        <p style={{ whiteSpace: 'pre-wrap' }}>
                          {text}
                        </p>
                      )
                    } else {
                      return "Double Click."
                    }
                  }
                })
              }


              else if (col.input_type === 'currency') {
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250,
                  renderCell: (params) => {
                    return (
                      <NumberFormat
                        value={params.value}
                        thousandSeparator={col.columns.separater}
                        prefix={col.columns.currency_format}
                        thousandsGroupStyle="thousand"
                        decimalScale={col.columns.decimal_palces}
                        displayType="text"
                      />
                    )
                  }
                })
              }
              else if (col.input_type === 'dateTime') {
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), width: 240, headerName: col.name, editable: editt, minWidth: 250, type: 'dateTime',
                  // valueGetter: ({ value }) =><IconButton >{String(value && new Date(value))}</IconButton > ,
                  cellClassName: ({ value }) => {
                    // console.log(new Date(col.columns.default_date))
                    const timee = timeDiffCalc(new Date(value), new Date()).split(" ");
                    // console.log((timee))
                    return clsx('super-app', {
                      lightblue: (timee.length === 4) ? ((timee[0] <= 23 && timee[2] <= 59) && (timee[0] >= 6 && timee[2] >= 0) ? true : false) : false,
                      darkblue: (timee.length === 6) ? ((timee[0] == 1 && timee[2] <= 23 && timee[4] <= 59) && (timee[0] == 1 && timee[2] >= 0 && timee[4] >= 0) ? true : false) : false,
                      lightgreen: timee.length === 4 ? ((timee[0] < 6 && timee[0] >= 2) ? true : false) : false,
                      green: timee.length === 4 ? ((timee[0] == 1 && (timee[0] > 0)) ? true : false) : false,
                      orange: timee.length === 4 ? ((timee[0] == 0 && (timee[2] >= 30)) ? true : false) : false,
                      yellow: timee.length === 4 ? ((timee[0] == 0 && timee[2] < 30) ? true : false) : false,
                      lightred: (timee.includes('past') && timee.length === 5) ? ((timee[0] >= 0 && timee[0] <= 24) ? true : false) : false,
                      red: (timee.includes('past') && timee.length === 7) ? true : false,
                    })
                  },
                  renderCell: ({ value }) => {
                    // console.log(new Date(col.columns.default_date))
                    // console.log(value)
                    // console.log(Date(value))
                    return (

                      <Tooltip title={timeDiffCalc(new Date(value), new Date())}>
                        <Typography variant="subtitle2" color="white">
                          {String(dateFormat((value && new Date(value)), col.columns.date_Format))}
                        </Typography>
                      </Tooltip>
                    )
                  },
                  valueFormatter: ({ value }) => dateFormat((value && new Date(value)), col.columns.date_Format)
                })
              }
              else if (col.input_type === 'date') {
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), width: 240, headerName: col.name, editable: editt, minWidth: 250, type: 'date',
                  valueFormatter: ({ value }) => dateFormat((value && new Date(value)), col.columns.date_Format)
                })
              }
              else if (col.input_type === 'document') {

                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250,

                  renderCell: (params) => {

                    return (
                      <IconButton
                        onClick={() => {

                          try {
                            fileDownload(`download/${list_group['list']}/${params.row['id']}/${params.field}/`, (params.value).split("/"))
                          }
                          catch (err) {

                          }

                        }}
                        size="large">
                        {
                          (getName(params.value)) ?
                            <Tooltip title={getName(params.value)}>
                              <AttachFileIcon color='success' />
                            </Tooltip>
                            :
                            <Tooltip title="No File">
                              <AttachFileIcon />
                            </Tooltip>
                        }
                      </IconButton>
                    );
                  }

                })
              }

              else if (col.input_type === 'hyperlink') {
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250,
                  valueGetter: (params) => {
                    // console.log(params.value)
                    return params.value
                  },
                  valueFormatter: (params) => {
                    let url = null
                    let urlname = null
                    try {
                      return params.value[0]['url']

                    } catch (err) {
                      return ""
                    }

                  },
                  renderEditCell: (params) => {
                    let url = null
                    let urlname = null
                    try {
                      url = params.value[0]['url']

                    } catch (err) {
                      url = " "
                    }
                    try {
                      urlname = params.value[0]['urlname']

                    } catch (err) {
                      urlname = "Link Not Added"
                    }
                    return (<TextField
                      margin="dense"
                      id="days"
                      label="Days"
                      type="text"
                      select
                      fullWidth
                      sx={{
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',

                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical'
                      }}
                      variant="outlined"
                      SelectProps={{
                        multiple: true,
                        value: [params.value],
                        renderValue: (selected) => {
                          try {
                            return selected[0][0]['url']
                          }
                          catch (err) {
                            return "Linked Not Added"
                          }
                        }

                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              gap: 20,
                              padding: 10
                            }}
                          >
                            <TextField
                              variant="outlined"
                              sx={{
                                width: 'auto',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',

                                WebkitLineClamp: 1,
                                WebkitBoxOrient: 'vertical'
                              }}
                              defaultValue={url}
                              label={'URL'}
                              onChange={(e) => {
                                const { id, api, field, value } = params;
                                let newValue = value
                                try {
                                  newValue[0]['url'] = e.target.value;
                                }
                                catch (err) {
                                  newValue = {}
                                  newValue = Object.assign(newValue, { [0]: { ['url']: e.target.value } })
                                }

                                api.setEditCellValue({ id, field, value: newValue });
                              }}
                            />
                            {col.columns.text_over_link && (
                              <TextField
                                variant="outlined"
                                sx={{
                                  width: 'auto',
                                  wordBreak: 'break-all',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',

                                  WebkitLineClamp: 1,
                                  WebkitBoxOrient: 'vertical'
                                }}
                                defaultValue={urlname}
                                label={"URLname"}
                                onChange={(e) => {

                                  const { id, api, field, value } = params;
                                  let newValue = value

                                  try {
                                    newValue[0]['urlname'] = e.target.value;
                                  }
                                  catch (err) {
                                    newValue = {}
                                    newValue = Object.assign(newValue, { [0]: { ['urlname']: e.target.value } })
                                  }
                                  api.setEditCellValue({ id, field, value: newValue });
                                }}
                              />
                            )}
                          </div>


                        }
                      </div>
                    </TextField>

                    )
                  },
                  renderCell: (params) => {
                    let url = null
                    let urlname = null
                    try {
                      url = params.value[0]['url']

                    } catch (err) {
                      url = ""
                    }
                    try {
                      urlname = params.value[0]['urlname']
                    } catch (err) {
                      urlname = "Link Not Added"
                    }
                    return (
                      <Link href={url} color="#02025f" sx={{
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        wordBreak: 'break-all',
                      }}>
                        {col.columns.text_over_link ? urlname : url}
                      </Link>)
                  }


                })
              }

              else if (col.input_type === 'people_group') {
                console.log(users)

                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: true, minWidth: 350,

                  valueFormatter: (params) => {
                    try {
                      return Object.values(params.value).map(rec => rec.email).toString()
                    }
                    catch (err) {
                      return ""
                    }
                  },
                  renderCell: (params) => {
                    // console.log(params)
                      const field_name = params.field;
                      const interviewerList = params.row[field_name];
                      if (interviewerList) {
                        return (
                          <Container sx={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', height: '70%' }}>
                            {interviewerList.map(person => {
                              return (
                                <Tooltip title="Click to send Message and double click to edit" key={person.email}>
                                  <Typography
                                    align='center'
                                    classes={{
                                      style: {
                                        maxWidth: '60%',
                                      }
                                    }}
                                    onClick={event => handleInterviewerClick(event, person.email, params.row.candidate_name)} sx={{ padding: '2px', fontSize: '0.9rem' }} > {person.email.toString()} </Typography>
                                </Tooltip>
                              );
                            })}
                          </Container>
                        )
                      }
                  },
                  renderEditCell: (params) => {
                    let optionsss = []
                    try {
                      optionsss = Object.values(params.value).map(rec => rec)
                    }
                    catch (err) {
                      optionsss = []
                    }

                    return (
                      <Autocomplete
                        defaultValue={optionsss}
                        multiple
                        disablePortal
                        isOptionEqualToValue={(option, value) => option.email === value.email}
                        getOptionLabel={(option) => option.email}
                        id="combo-box-demo"
                        options={users}
                        fullWidth
                        sx={{
                          width: 300,
                          overflowY: 'auto'
                        }}
                        onChange={(_event, selected) => {
                          const { id, api, field, value } = params;
                          const newValue = value
                          console.log(value)
                          // newValue[index][rec] = selected;

                          api.setEditCellValue({ id, field, value: selected });


                        }}
                        renderInput={(params) => <TextField {...params} label={col.name}


                        />}
                      />
                      // <Autocomplete
                      //   fullWidth
                      //   multiple
                      //   open={openAuto}
                      //   onOpen={() => {
                      //     setOpenAuto(true);
                      //   }}
                      //   onClose={() => {
                      //     setOpenAuto(false);
                      //   }}
                      //   id="tags-standard"
                      //   isOptionEqualToValue={(option, value) => option.email === value.email}
                      //   getOptionLabel={(option) => option.email}
                      //   options={[{email:"Himanshu@gmail.com",user_name:"Himanshu",groups:[]},{email:"Yash@gmail.com",user_name:"yash",groups:[]}]}

                      //   // defaultValue={optionsss}                    
                      //   renderInput={(params) => (
                      //     <TextField
                      //       {...params}
                      //       variant="outlined"
                      //       fullWidth
                      //       label={col.name}
                      //       name={col.name}
                      //       placeholder={col.name}

                      //       InputProps={{
                      //         ...params.InputProps,

                      //       }}
                      //     />
                      //   )}
                      // />
                    )
                  }

                })
              }

              else if (col.input_type === 'choice') {
                const images = importAll(require.context('../../assets/Icons for List', false, /\.(png|jpe?g|svg)$/))
                const options = []
                const all = []
                Object.entries(col.columns['choices']).map((ch) => {
                  options.push(ch[1]['name'])
                  all.push(ch[1])
                })
                columns.push({
                  field: (col.name).replaceAll(/ /g, "_").toLowerCase(), headerName: col.name, editable: editt, minWidth: 250, type: 'singleSelect', valueOptions: options,
                  renderEditCell: (params) => {
                    const { id, api, field, value } = params;
                    return (

                      <Select onChange={(e) => { api.setEditCellValue({ id, field, value: e.target.value }) }} value={value} variant="outlined" sx={{
                        width: 'auto',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',

                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical'
                      }} fullWidth  >
                        {Object.entries(col.columns['choices']).map((ch) => {
                          return (
                            <MenuItem value={ch[1]['name']} key={ch[1]['name']} >
                              <Chip
                                avatar={<Icon component={MuiIcons[ch[1]['path']]} sx={{ color: 'white' }} ></Icon>}
                                label={ch[1]['name']}
                                sx={{ bgcolor: ch[1]['code'], color: 'white' }}
                                // style={{ backgroundColor: ch[1]['code'] , textEmphasisColor:'white' }}
                                size="small"
                                variant={col.columns.button_style}
                              />
                            </MenuItem>
                          )

                        })}

                      </Select>
                    )
                  }
                  ,
                  renderCell: (params) => {
                    const val = all.filter(rec => rec['name'] == params.value)[0]
                    if (val === undefined) {
                      const val = all.filter(rec => rec['name'] == col.columns.default_val)[0]

                      return (
                        <Chip sx={{ bgcolor: val['code'], color: 'white' }}
                          avatar={<Icon component={MuiIcons[val['path']]} sx={{ color: 'white' }} ></Icon>}
                          label={val['name']}
                          // style={{ backgroundColor: val['code']  }}
                          size="small"
                          variant={col.columns.button_style}
                        />
                      )
                    }
                    return (
                      <Chip
                        avatar={<Icon component={MuiIcons[val['path']]} sx={{ color: 'white' }} ></Icon>}
                        label={params.value}
                        // style={{ backgroundColor: val['code']  }}
                        sx={{ bgcolor: val['code'], color: 'white' }}
                        size="small"
                        variant={col.columns.button_style}
                      />
                    )
                  }
                })
              }
              else {
                console.log("Refresh")
              }
            })
            if (editt) {
              columns.push({
                width: 150,
                type: 'string',
                disableColumnMenu: true,
                sortable: false,
                renderHeader: () => (
                  <strong >
                    <Link component={NavLink} href="#" color="#1b0618" to={`/list/list-dashboard`}>
                      {'Add Columns'}
                      <span role="img" aria-label="enjoy">
                        ➕
                            </span>
                    </Link>
                  </strong>
                ),
              })
            }
            // setValues([...columns])        
            let nextIndex = 1
            //Data
            axiosInstance
              .get(
                `models/single/${list_group['list']}/${list_group['group']}`)
              .then((res) => {
                const allData = res.data;

                allData.map((data) => {
                  // console.log(data)
                  // if (typeof (data) === 'object')
                  //   console.log(Object.keys(data))
                  collectionOfdata.push(data);
                  nextIndex++;
                })
                // console.log(nextIndex);

                // collectionOfdata.push({id:nextIndex++})
                // setDetails([...collectionOfdata])

                axiosInstance
                  .get(`allLists/${list_group['list']}/`)
                  .then((ress) => {
                    // setListHistory([ress.data])
                    localStorage.removeItem("listname");
                    localStorage.setItem("listname", JSON.stringify(ress.data));
                    // setListHistory(listHistory,()=>props.onChangeName(listHistory))                    
                    // props.onChangeName()
                    // console.log(listHistory['modelname'])
                    // console.log(props)
                    let agg = []
                    let data = []
                    let rows = []
                    allFields.map((col) => {
                      // console.log(col)
                      if ((col.input_type == 'number' && data.indexOf(col.name) == -1) || (col.input_type == 'currency' && data.indexOf(col.name) == -1)) {
                        collectionOfdata.map((d) => {
                          agg.push(d[(col.name).replaceAll(/ /g, "_").toLowerCase()])
                          data.push(col.name)
                        }
                        )
                        // console.log(agg.length)
                        const arrSum = agg.reduce((a, b) => a + b, 0)
                        rows.push({ id: col.id, column: col.name, count: agg.length, sum: arrSum, mean: arrSum / agg.length, minimum: Math.min(...agg), maximum: Math.max(...agg) })
                        // rows=[]
                        data = []
                        agg = []
                      }
                    })
                    console.log(rows)
                    setAppState({ loading: false, listHistory: [ress.data], cols: [...columns], data: [...collectionOfdata], original: [rows], permisssion: editt });
                  })
                  .catch(e => {
                    console.log(e)
                  })
              })
              .catch(e => {
                console.log(e)
              })
          })
          .catch(e => {
            console.log(e)

          });

        //Lists

      })
      .catch(e => {
        console.log(e)
        alert("You Are Not Auth")
      })

  }, [setAppState]);

  // useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }
  //   // console.log("hello")
  //   (async () => {
  //     console.log("hello")

  //     const res = await axiosInstance.get('user/alluser/');
  //     console.log(res)
  //     const { data } = await res;
  //     console.log(data)   
  //     if (active) {
  //       console.log(data)
  //       setOptions(res.data);
  //     }
  //     console.log(options)
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading,options]);

  // useEffect(() => {
  //   if (!openAuto) {
  //     console.log('Jijjijiji')
  //     setOptions([]);
  //   }
  // }, [openAuto]);

  return (
    <div className="App">

      <PostLoadingComponent isLoading={appState.loading} cols={appState.cols} data={appState.data} id={appState.id} listHistory={appState.listHistory} original={appState.original} allUsers={appState.option} permisssion={appState.permisssion} />
    </div>
  );
}