import React, { useEffect, useState, useRef } from 'react';
import {
    Card,
    CardHeader,
    Grid,
    Paper,
    Box,
    Typography,
    Divider,
    CardContent,
    TextField,
    Autocomplete
} from '@mui/material'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import { SwitchCustom } from '../ControlFields/Switch'
import { Input } from '../ControlFields/TextField'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { SelectCustom } from '../ControlFields/Select'
import { useSelector } from 'react-redux';
import { useSnackbar, SnackbarProvider } from 'notistack';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import axiosInstance from '../../axois';
import { NavLink, useNavigate } from "react-router-dom";

const baseURL = "addFields/"

const schema = yup.object().shape({
    name: yup
        .string()
        .matches(/^([^0-9]*)$/, "First name should not contain numbers")
        .required("First name is a required field"),
});



const date_default_val = [
    {
        value: 'default',
        label: 'Select Default Value'
    },
    {
        value: "'today_date",
        label: "Today's Date"
    },
    {
        value: "select_date_time",
        label: "Select a Date & Time "
    }
]
const date_Format = [
    {
        value: 'default',
        label: 'Select Date Format'
    },
    {
        value: 'ddd, mmm dS, yyyy ',
        label: 'Day, Month Date, Year'
    },
    {
        value: "mmm dS, yyyy",
        label: "Month Date,  Year"
    },
    {
        value: "dd/mm/yyyy",
        label: "Day/Month/Year"
    }
];
const time_format = [
    {
        value: 'default',
        label: 'Select Time Format'
    },
    {
        value: ', h:MM TT',
        label: 'hh:mm'
    },
    {
        value: "HH:mm:ss",
        label: "hh:mm:ss"
    },
]
const AccountProfileDetails = ({ props, onSubmiting }) => {
    const listname = useSelector((state) => state.customization.group_list);
    const { enqueueSnackbar } = useSnackbar();
    const [value, setValue] = React.useState(new Date());
    const [notificationFields, setNotificationFields] = React.useState([]);

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [data, setValues] = useState({
        modelname: listname['list'],
        name: "",
        data_type: "date",
        max_length: 30,
        null: true,
        unique: false,
        input_type: "date",
        description: "",
        columns: {
            require_val: true,
            include_time: true,
            friendlyformat: true,
            default_val: "default",
            date_Format: "default",
            time_format: "default",
            notification_to: null,
            send_notification: false,
            validations: []
        }
    });

    useEffect(() => {
        let allFields = JSON.parse(localStorage.getItem('fields'));
        let optionsField = allFields.filter(field => {
            if (field.input_type === "people_group"){
                return field.name;
            }
        })
        optionsField = optionsField.map(field => {
            return {
                "value": field.name,
                "label": field.name
            };
        })
        setNotificationFields(optionsField);
    }, [])


    const { register, handleSubmit, watch, control, formState: { errors } } = useForm({
        defaultValues: { ...data },
        mode: "onBlur",
        resolver: yupResolver(schema),
    })
    const isTimeInclude = watch("columns.include_time");
    const defaultDate = watch("columns.default_val");
    const watchNotification = watch("columns.send_notification");
    const navigate = useNavigate();
    const onSubmit = (data) => {
        if (data.columns.include_time) {
            data.data_type = 'datetime'
            data.input_type = 'dateTime'
            data.columns.date_Format = data.columns.date_Format + ', h:MM TT'
        }
        data.columns['default_date'] = value.toJSON();
        console.log(value)
        console.log(JSON.stringify(data, null, 2));
        setValues(data);
        axiosInstance
            .post(baseURL, data)
            .then((response) => {
                onSubmiting(JSON.stringify(data, null, 2));
                if (watchNotification){
                    let dataToBeSent = {
                        "fieldName": data.name,
                        "listName": data.modelname,
                        "notified": data.columns.notification_to
                    }
                    console.log(dataToBeSent)
                    axiosInstance.post(`addNotificationTask/`, dataToBeSent)
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
                }
                enqueueSnackbar(response.data, {
                    variant: 'success',
                },
                navigate(`/display-list-data/`));
            }).catch((e) => {
                alert(e);
            });
    }

    useEffect(() => {
        console.log(notificationFields);
    }, [notificationFields]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader
                    subheader="The information can be edited"
                    title="How Do You Want Your Data/Time?"
                />
                <Divider />
                <Paper style={{ height: 360, overflow: 'auto', border: 1 }}>
                    <CardContent>

                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 1 }}>
                            <Grid item xs={6}>
                                <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                                    <Grid item xs={11}>
                                        <Input
                                            {...register('name')}
                                            id="name"
                                            type="text"
                                            label="Name"
                                            control={control}
                                            error={!!errors.name}
                                            helperText={errors?.name?.message}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <SelectCustom
                                            {...register('columns.default_val')}
                                            id="columns.default_val"
                                            label="default_val"
                                            variant="outlined"
                                            control={control}
                                            name="columns.default_val"
                                            options={date_default_val}
                                            disable={false}
                                        />
                                    </Grid>
                                    <Grid item sx={11}>
                                        {defaultDate === 'select_date_time' && (
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="Date desktop"
                                                    value={value}
                                                    onChange={handleChange}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>)
                                        }
                                    </Grid>
                                    <Grid item xs={11}>
                                        <SelectCustom
                                            {...register('columns.date_Format')}
                                            id="columns.date_Format"
                                            label="date_Format"
                                            control={control}
                                            variant="outlined"
                                            name="columns.date_Format"
                                            options={date_Format}
                                            disable={false}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <SelectCustom
                                            {...register('columns.time_format')}
                                            id="columns.time_format"
                                            variant="outlined"
                                            label="time_format"
                                            control={control}
                                            name="columns.time_format"
                                            options={time_format}
                                            disable={isTimeInclude ? false : true}
                                        />
                                    </Grid>
                                    <Grid item xs={11}>
                                        <SelectCustom
                                            {...register('columns.notification_to')}
                                            id="columns.notification_to"
                                            variant="outlined"
                                            label="Send Notification to"
                                            control={control}
                                            name="columns.notification_to"
                                            options={notificationFields.length==0 ? [] : notificationFields}
                                            disable={watchNotification ? false: true}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container rowSpacing={2} columnSpacing={{ xs: 0, sm: 0, md: 0 }} spacing={2}>
                                    <Grid item xs={11}>
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
                                    <Grid item xs={11}>
                                        <Grid container direction='row' spacing={0} >
                                            <Grid item xs={7}  >
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Required
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row">
                                                    <SwitchCustom
                                                        {...register('columns.require_val')}
                                                        id="columns.require_val"
                                                        label="require_val"
                                                        control={control}
                                                        name="columns.require_val"

                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid container direction='row' spacing={0} >
                                            <Grid item xs={7}  >
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Unique Values
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row">
                                                    <SwitchCustom
                                                        {...register('unique')}
                                                        id="unique"
                                                        label="unique"
                                                        control={control}
                                                        name="unique"

                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid container direction='row' spacing={0} >
                                            <Grid item xs={7}  >
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Include Time
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row">
                                                    <SwitchCustom
                                                        {...register('columns.include_time')}
                                                        id="columns.include_time"
                                                        label="columns.include_time"
                                                        control={control}
                                                        name="columns.include_time"

                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid container direction='row' spacing={0} >
                                            <Grid item xs={7}  >
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Send Notification
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row">
                                                    <SwitchCustom
                                                        {...register('columns.send_notification')}
                                                        id="columns.send_notification"
                                                        label="columns.send_notification"
                                                        control={control}
                                                        name="columns.send_notification"

                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={11}>
                                        <Grid container direction='row' spacing={0} >
                                            <Grid item xs={7}  >
                                                <Typography variant="h6" gutterBottom component="div">
                                                    Friendly Format
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Grid container direction="row">
                                                    <SwitchCustom
                                                        {...register('columns.friendlyformat')}
                                                        id="columns.friendlyformat"
                                                        label="friendlyformat"
                                                        control={control}
                                                        name="columns.friendlyformat"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
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
                                onClick={() => { navigate(`/display-list-data/`) }}
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

            </Card>
        </Form>
    );
};

export default AccountProfileDetails;