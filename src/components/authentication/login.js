import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { IS_USER } from '../../store/actions';
import axiosInstance from '../../axois';
import {
    Box,
    Button,
    InputAdornment,
    Grid,
    IconButton,
    Typography,
    Card,
    Checkbox,
    CardHeader,
    CardContent,
    Container,
} from '@mui/material';

// third party
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
// project imports
import { Form } from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import { Input } from '../ControlFields/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// assets
import LoginIcon from '../../assets/AuthIcon/Login.svg'
import { yupResolver } from "@hookform/resolvers/yup";
import makeStyles from '@mui/styles/makeStyles';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { NavLink } from 'react-router-dom';
const lightColor = 'rgba(255, 255, 255, 0.7)';
const useStyles = makeStyles((theme) => ({

    header: {
        padding: 8,
        background: 'white',
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

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Enter the Valid Email address")
        .required("Email is a required field"),
    password: yup
        .string()
        .required("Password is required Field")
});


const UserLogin = ({ ...others }) => {
    let navigate = useNavigate()
    const dispatch = useDispatch();
    // const customization = useSelector((state) => state.customization);

    const classes = useStyles()
    const [checked, setChecked] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const googleHandler = async () => {
        console.error('Login');
    };
    const user = JSON.parse(localStorage.getItem('user'))
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [data, setValues] = useState({
        email: '',
        password: '',
        remember: false
    });

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
        defaultValues: { ...data },
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('listname');
        localStorage.removeItem('access_token');
        localStorage.removeItem('fields');
    });

    const onSubmit = (data) => {
        console.log(JSON.stringify(data, null, 2))
        setValues(data)
        // e.preventDefault();

        axiosInstance
            .post(`token/`, {
                email: data.email,
                password: data.password,
            })
            .then((res) => {
                localStorage.setItem('user', JSON.stringify(data));
                localStorage.setItem('access_token', res.data.access);
                localStorage.setItem('refresh_token', res.data.refresh);
                axiosInstance.defaults.headers['Authorization'] =
                    'JWT ' + localStorage.getItem('access_token');
                console.log(res.data)

                navigate('/')
                dispatch({ type: IS_USER, isUser: { isLoggedIn: true, user: data } });
            })
            .catch((e) => {
                enqueueSnackbar("Enter Valid Email and Password", {
                    variant: 'Error',
                })
            })
            ;
    }
    return <>
        <Container maxWidth="lg" >
            <Grid container direction="row"
                justifyContent="flex-end"
                alignItems="center"  >
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <Card elevation={0} style={{ marginTop: 100 }} >
                        {/* <Paper elevation={3} style={{height: 500, overflow: 'auto'}} > */}
                        <CardContent elevation={0}>
                            <Grid container spacing={1}
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center" >
                                <Grid item xs={4}>
                                    <IconButton size="large">
                                        <img src={LoginIcon} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={8} style={{ marginTop: 5 }} >
                                    <Grid container spacing={2}   >
                                        <Grid item xs={9}>
                                            <CardHeader
                                                style={{ marginLeft: -15 }}
                                                title={<Typography variant='h2'>Login</Typography>}
                                                subheader={'Welcome Back! Please login to your account.'}
                                            />
                                            <Input
                                                {...register('email')}
                                                id="email"
                                                type="email"
                                                label="Email"
                                                control={control}
                                                error={!!errors.email}
                                                helperText={errors?.email?.message}
                                            />
                                        </Grid>
                                        <Grid item xs={9}>
                                            <TextField
                                                {...register('password')}
                                                id="Password"
                                                type={showPassword ? 'text' : 'password'}
                                                label="Password"
                                                fullWidth
                                                variant="outlined"
                                                control={control}
                                                error={!!errors.password}
                                                helperText={errors?.password?.message}
                                                InputProps={{
                                                    endAdornment:
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                                size="large"
                                                            >
                                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                }}
                                            />
                                            <Grid container justifyContent="space-between">
                                                <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }} component={NavLink} to={'/authentication/password-reset/mail'}>
                                                    Forgot Password?
                                                </Typography>
                                                <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                                    <Checkbox {...register('remember')} size="small" />Remember Me
                                                </Typography>
                                            </Grid>
                                        </Grid>                                        
                                        <Grid item xs={9}>
                                            <Box sx={{ mt: 2 }} >
                                                <Button
                                                    disableElevation
                                                    fullWidth
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    style={{
                                                        background: 'linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)',
                                                        borderRadius: 4,
                                                        height: 50,
                                                        padding: 10,
                                                        fontSize: 20,
                                                    }}
                                                >
                                                    Sign in
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/* </Paper> */}
                    </Card>
                </Form>
            </Grid>
        </Container>
    </>;
};

export default UserLogin;