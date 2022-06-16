import React, { useEffect, useState, Component, componentDidMount } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {
  MenuItem, Select, Grid, Typography, Box, Container, Chip, Icon
  , Card, CardHeader, TextField, Paper, Divider, CardContent, Tooltip, Badge, Button, Radio, Checkbox, FormControlLabel, RadioGroup, FormControl, FormLabel
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';



import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton'
import axiosInstance from '../../axois';
import { FileInput } from '../old stuff/FileInput'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { Form } from '../ControlFields/Form';
import { SwitchCustom } from '../ControlFields/Switch';
import { Input } from '../ControlFields/TextField';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { Formik, Field } from "formik";
import { createYupSchema } from "../ControlFields/dynamic Schema/yupSchemaCreator";
import { useParams } from 'react-router';
import { CheckboxWithLabel } from "formik-material-ui";
import { DropzoneDialog } from 'material-ui-dropzone';
import { useSnackbar, SnackbarProvider } from 'notistack';
import PropTypes, { object } from 'prop-types';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import NumberFormat from 'react-number-format';
import GetAppIcon from '@mui/icons-material/GetApp';
import * as MuiIcons from '@mui/icons-material'
import { useSelector } from 'react-redux';
import { InputLabel } from '@mui/material';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';

const baseURL = "http://127.0.0.1:8000/api/deleteField/"
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
    value: 'editor',
    label: 'Editor'
  },
  {
    value: 'commentor',
    label: 'Commentor'
  },
  {
    value: "viewer",
    label: "Viewer"
  },
]
// const MySpecialField = 
// };
const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),

  max_length: yup
    .number()
    .max(255, "Max no is 255")
    .min(1, "Min number is 1")
    .required("Number is Required")
});

const cache = {}
function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
export function fileDownload(url, filename) {
  try {
    filename = filename.split('/')
  }
  catch (err) {
  }

  return axiosInstance.get(url, { responseType: 'blob' })
    .then((response) => {
      const myBlob = [response.data]
      const myFile = new File([response.data], filename[filename.length - 1], {
        type: myBlob[0]['type'],
      });

      return myFile
      // link.click();
    })
}
const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, prefix, thousandSeparator, decimalScale, name, setFieldValue, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}

      onValueChange={(values, sourceInfo) => {
        const { formattedValue, value } = values;
        setFieldValue(name, value)
      }}
      thousandSeparator={thousandSeparator}
      prefix={prefix}
      thousandsGroupStyle="thousand"
      decimalScale={decimalScale}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field;
  const { setFieldValue } = form;

  return (
    // <Select
    //   name={name}
    //   value={[value]}
    //   fullWidth
    //   variant="outlined"
    //   input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
    //   renderValue={(selected) => (
    //     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
    //         {selected.map((value) => (
    //         <Chip key={value} label={value} />
    //       ))}
    //     </Box>
    //   )}

    //   onChange={evt =>
    //     {console.log(evt.target.value)
    //     setFieldValue(
    //       name,
    //       typeof value === 'string' ? value.split(',') : evt.target.value
    //     )}
    //   }
    //   // multiple={true}
    // >
    //   {children}
    // </Select>
    <FormControl fullWidth >
      <InputLabel id="demo-simple-select-helper-label">{name}</InputLabel>
      <Select
        name={name}
        value={value}
        fullWidth
        label={name}
        variant="outlined"
        onChange={e => {
          setFieldValue(name, e.target.value);
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
};

export function NewEntryFinal({ data, fieldData, record_id, fetch, list1 }) {
  const { list, id } = useParams();
  const listname = useSelector((state) => state.customization.group_list);
  const [formData, setFormData] = useState([data])
  const [formValue, SerFormData] = useState([fieldData])
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState();
  const classes = useStyles();
  console.log('Record ID: ', record_id);
  console.log('Data: ', data);
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }
    (async () => {
      console.log("hello")

      const res = await axiosInstance.get('user/alluser/');
      console.log(res)
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
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const initialValues = {};
  const renderFormElements = props =>
    formData[0].map((item, index) => {
      const fieldMap = {
        text: 'text'
      };
      const Component = fieldMap[item.input_type];
      let error = props.errors.hasOwnProperty(item.name) && props.errors[item.name];
      const inputRender = ['string', 'number']
      if (inputRender.includes(item.input_type)) {
        return (
          <Grid item sm={4}>
            <Input
              fullWidth
              type={item.input_type}
              key={index}
              label={item.name}
              name={item.name}
              multiline={item.data_type === 'text' ? true : false}
              placeholder={item.name}
              value={props.values[item.name]}
              onChange={props.handleChange}
              error={error ? true : false}
              helperText={error}
            />
          </Grid>
        );
      }

      if (item.input_type === 'people_group') {
        let optionsss = []
        try {
          optionsss = formValue[0] !== null ? props.values[item.name] == null ? [] : props.values[item.name] : []
        }
        catch (err) {
          optionsss = []
        }
        console.log(optionsss)
        return (
          <Grid item sm={4}>
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
              defaultValue={optionsss}
              loading={loading}
              onChange={(_event, selected) => {
                props.setFieldValue(item.name, selected)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  key={index}
                  label={item.name}
                  name={item.name}
                  placeholder={item.name}
                  value={props.values[item.name]}

                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        )
      }

      if (item.input_type === 'currency') {
        const inputRef = React.createRef();
        return (
          <Grid item sm={4}>
            <TextField
              key={index}
              label={item.name}
              name={item.name}
              value={props.values[item.name]}
              onChange={props.handleChange}
              InputProps={{
                inputComponent: NumberFormatCustom,
                inputProps: {
                  prefix: item.columns.currency_format,
                  thousandSeparator: item.columns.separater,
                  decimalScale: item.columns.decimal_places,
                  name: item.name,
                  setFieldValue: props.setFieldValue,
                  value: props.values[item.name]
                }
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
        )
      }

      if (item.input_type === 'date' || item.input_type === 'dateTime') {
        return (
          <Grid item sm={4}>
            {
              (item.columns.include_time && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    fullWidth
                    label={item.name}
                    key={index}
                    name={item.name}
                    value={props.values[item.name]}
                    onChange={(value) => {
                      props.setFieldValue(item.name, value.toJSON())

                    }}
                    renderInput={(params) => <TextField fullWidth variant='outlined' style={{ marginTop: 16 }} {...params} />}
                  />
                </LocalizationProvider>
              )
                ||
                (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      fullWidth
                      label={item.name}
                      key={index}
                      name={item.name}
                      value={props.values[item.name]}
                      onChange={(value) => {
                        props.setFieldValue(item.name, value.toJSON().substring(0, 10))
                      }}
                      renderInput={(params) => <TextField fullWidth variant='outlined' style={{ marginTop: 16 }} {...params} />}
                    />
                  </LocalizationProvider>
                ))
            }
          </Grid>
        )
      }

      if (item.input_type === 'location') {
        return (
          <Grid item sm={12}>
            <Grid container spacing={1}>
              {
                item.columns.extra_columns.map((loc, i) => {
                  try {
                    console.log(props.values[item.name][i][loc])
                  }
                  catch (err) {
                    props.values[item.name] = Object.assign({}, { [i]: { [loc]: '' } })
                  }
                  console.log(props.values[item.name])
                  return (
                    <Grid item sm={4}>
                      <Input
                        fullWidth
                        type='string'
                        key={index * 10}
                        label={`Enter ${loc}`}
                        name={`${item.name}[${i}].${loc}`}
                        placeholder={loc}
                        // value={props.values[item.name][index]}
                        value={
                          formValue[0] !== null ? props.values[item.name][i][loc] : props.values[item.name][index]
                        }
                        onChange={props.handleChange}
                        error={error ? true : false}
                        helperText={error}
                      />
                    </Grid>
                  )
                })
              }
            </Grid>
          </Grid>
        )
      }

      if (item.input_type == 'hyperlink') {
        try {
          console.log(props.values[item.name][0]['url'])
        }
        catch (err) {
          props.values[item.name] = Object.assign({}, { [0]: { ['url']: '' } })
        }
        if (item.columns.text_over_link) {
          try {
            console.log(props.values[item.name][0]['urlname'])
          }
          catch (err) {
            props.values[item.name] = Object.assign({}, { [0]: { ['urlname']: '' } })
          }
        }
        console.log(typeof (props.values[item.name]))
        return (
          <Grid item sm={4}>
            <Input
              fullWidth
              type='string'
              key={index}
              label={`url`}
              // name={`${item.name}[${index}].url`}
              name={`${item.name}[${0}].url`}
              placeholder={item.name}
              value={formValue[0] !== null ? props.values[item.name][0]['url'] : props.values[item.name][1]}
              onChange={props.handleChange}
              error={error ? true : false}
              helperText={error}
            />
            {
              item.columns.text_over_link && (
                <Input
                  fullWidth
                  type='string'
                  key={index + 20}
                  label={`urlname`}
                  name={`${item.name}[${0}].urlname`}
                  placeholder={item.name}
                  //value={props.values[item.name][1]}
                  value={formValue[0] !== null ? props.values[item.name][0]['urlname'] : props.values[item.name][1]}
                  onChange={props.handleChange}
                  error={error ? true : false}
                  helperText={error}
                />
              )
            }
          </Grid>
        )
      }

      if (item.input_type == 'choice') {
        importAll(require.context('../../assets/Icons for List', false, /\.(png|jpe?g|svg)$/))
        return (
          <Grid item sm={4} >
            <Field name={item.name} component={CustomizedSelectForFormik} variant="outlined"  >
              {
                item.columns.choices.map((choice, index) => {
                  return (<MenuItem value={choice.name} key={choice.name}>
                    <Chip
                      avatar={<Icon component={MuiIcons[choice.path]}></Icon>}
                      label={choice.name}
                      style={{ backgroundColor: choice.code }}
                      size="small"
                      variant={item.columns.button_style}
                    />
                  </MenuItem>)
                })
              }
            </Field>
          </Grid>
        )
      }
      if (item.input_type == 'boolean') {
        return (
          <Grid item sm={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Field type="checkbox" name={item.name} key={index}
                component={({ field }) => {
                  console.log(field)
                  // <Icon component={MuiIcons[choice.path]}></Icon>
                  return (
                    <Checkbox {...field} icon={item.columns.is_checkbox ? <Icon component={MuiIcons['CheckBoxOutlineBlankOutlined']}></Icon> : <Icon component={MuiIcons['CircleOutlined']}></Icon>} checkedIcon={item.columns.is_checkbox ? <Icon component={MuiIcons['CheckBoxOutlined']}></Icon> : <Icon component={MuiIcons['RadioButtonCheckedOutlined']}></Icon>} />
                  );
                }
                }
                Label={{ label: item.name }}
              />
            </Box>
          </Grid>
        )
      }

      if (item.input_type == 'document') {
        return (
          <Grid item sm={4} >
            <DropzoneDialog showPreviewsInDropzone={true} name={item.name} key={index} showPreviews={false} filesLimit={1} showFileNamesInPreview={true} showFileNames={true}
              acceptedFiles={["application/pdf"]}
              open={dropzoneOpen} onClose={() => { setDropzoneOpen(false); }} onSave={(event) => {
                console.log(event[0])
                props.setFieldValue(item.name, event[0]);
                setDropzoneOpen(false);
              }}
            />
            <Button
              style={{ padding: 30 }}
              startIcon={<Badge overlap="circular" invisible={false}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                badgeContent=
                {<Tooltip title={"Upload FIle"} arrow><span><IconButton
                  onClick={() => { setDropzoneOpen(true) }}
                  className={classes.btnUploadWrapper}
                  disabled={false}
                  size="small">
                  {<AttachFileIcon className={classes.btnUpload} style={{ color: state ? 'green' : 'blue' }} />
                  }
                </IconButton>
                  {item.name}
                </span></Tooltip>}
              >
              </Badge>}
              fullWidth
            >
              {props.values[item.name]['name']}
            </Button>
            {/*                             
                  <IconButton  onClick={()=>{
                            console.log(props.values[item.name])
                            fileDownload(`download/${list}/${id}/${(item.name).toLowerCase()}/`,props.values[item.name].split("/"))
                  }}>
                    <GetAppIcon  />
                    <Typography>{props.values[item.name]['name']}</Typography>
                  </IconButton> */}
          </Grid>
        );
      }
      return "";
    });

  formData[0].map((item, index) => {
    // console.log(formValue[0][(item.name).replaceAll(/ /g,"_").toLowerCase()])
    if (formValue[0] !== null) {
      initialValues[item.name] = item.input_type === 'document' ? fileDownload(`download/${list}/${id}/${(item.name).toLowerCase()}/`, (formValue[0][(item.name).replaceAll(/ /g, "_").toLowerCase()])) : item.input_type === 'date' ? new Date(formValue[0][(item.name).replaceAll(/ /g, "_").toLowerCase()]).toJSON().substring(0, 10) : item.input_type === 'dateTime' ? new Date(formValue[0][(item.name).replaceAll(/ /g, "_").toLowerCase()]).toJSON() : item.input_type === 'people_group' ? formValue[0][(item.name).replaceAll(/ /g, "_").toLowerCase()] : (formValue[0][(item.name).replaceAll(/ /g, "_").toLowerCase()] || "");
    }
    else
      initialValues[item.name] = item.input_type === 'file' ? state : item.input_type === 'date' ? new Date(item.columns.default_date).toJSON().substring(0, 10) : item.input_type === 'dateTime' ? new Date(item.columns.default_date).toJSON() : (item.columns.default_val || "");
  });
  const [dropzoneOpen, setDropzoneOpen] = React.useState(false);
  const handleFileSubmit = (files) => {
    console.log("submitted File")
    console.log(files)
    setState({
      ...state,
      ['doc']: files[0]

    });
  };

  const handleCancel = () => {
    setState();
  };
  const setValue = (field, value) => {
    // if (fieldTimer) clearTimeout(fieldTimer);
    //fieldTimer = setTimeout(() =>
    setState({
      ...state,
      [field]: value,
    })
    //     , 500);
  };
  const yepSchema = formData[0].reduce(createYupSchema, {});
  const validateSchema = yup.object().shape(yepSchema);

  return (
    <>
      <Container maxWidth="xl">
        <Card elevation={0}>
          <CardHeader
            subheader="The information can be edited"
            title="Enter Data Here"
          />
          <Divider />
          <Paper style={{ height: 'auto', overflow: 'auto', border: 1 }}>
            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validateSchema}
                onSubmit={(values, actions) => {
                  // console.log("values", values);
                  // console.log("actions", actions);
                  console.log(values)
                  let formData1 = new FormData();
                  formData[0].map((item, index) => {
                    if (item.data_type === 'file') {
                      // 
                      if ((values[item.name] instanceof File))
                        formData1.append((item.name).replaceAll(/ /g, "_").toLowerCase(), values[item.name])
                      else
                        Promise.all([values[item.name]]).then(valuess => { formData1.append((item.name).replaceAll(/ /g, "_").toLowerCase(), valuess) })

                    }
                    else if (item.input_type === 'hyperlink' || item.input_type === 'location' || item.input_type === 'people_group')
                      formData1.append((item.name).replaceAll(/ /g, "_").toLowerCase(), JSON.stringify(values[item.name]))
                    else
                      formData1.append((item.name).replaceAll(/ /g, "_").toLowerCase(), values[item.name])
                  })
                  for (let [key, value] of formData1.entries()) {
                    console.log(key, ':', value);
                  }
                  const config = { headers: { 'Content-Type': 'multipart/form-data' } };
                  let URL = 'models/single/';
                  if (formValue[0] !== null) {
                    console.log(record_id)
                    if (list1 != null)
                      URL += `${list1}/abc/${record_id}/`;
                    else
                      URL += `${list}/xyz/${record_id}/`;
                    console.log(URL)
                    axiosInstance
                      .put(URL, formData1, config)
                      .then((res) => {
                        enqueueSnackbar("Sucess", {
                          variant: 'success',
                        }
                        );
                        console.log(res.data);
                        fetch();
                      })
                      .catch((err) => {
                        enqueueSnackbar("Try Again", {
                          variant: 'error',
                        }
                        )
                        console.log(err)
                      }
                      );
                  }
                  else {
                    URL += `${listname['list']}/abcd/`;
                    axiosInstance
                      .post(URL, formData1, config)
                      .then((res) => {

                        enqueueSnackbar("Success", {
                          variant: 'success',
                        }
                        );
                        console.log(res.data);
                      })
                      .catch((err) => {
                        enqueueSnackbar("Try Again", {
                          variant: 'error',
                        }
                        )
                        console.log(err)
                      }
                      );
                  }
                  // formData.append('phone', values.Phone);
                  // formData.append('cv', state.cv );
                }
                }
              >
                {props => (
                  <form onSubmit={props.handleSubmit}>
                    <Grid container spacing={2}>
                      {renderFormElements(props)}
                    </Grid>
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
                            Save details
                  </PrimaryButton>
                        </Grid>
                      </Grid>
                    </Box>
                  </form>
                )}
              </Formik>
              {/* {
                  cols.map((num,index)=>{
                      return(
                          <Grid item sm={4}>
                              <Tooltip title={num.description} >
                                <Input fullWidth
                                    {...register(num.name)}
                                    label={num.name}
                                    control={control}
                                    variant="outlined"
                                />
                                </Tooltip>
                        </Grid>
                        );
                  })
              }
               */}
            </CardContent>
          </Paper>
        </Card>
      </Container>
    </>
  );
}
