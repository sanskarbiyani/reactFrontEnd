import { useEffect, useState } from "react";
import {
  Box,
  Button,
  InputAdornment,
  Grid,
  IconButton,
  Card,
  Paper,
  CardHeader,
  CardContent,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
// third party
import * as yup from "yup";

// project imports
import { Form } from "../ControlFields/Form";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
// assets

import LoginIcon from "../../assets/AuthIcon/Login.svg";
import axios from "axios";
import { TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";

// import { useTheme } from "@mui/material/styles";
// import Main_logo from "../../assets/Gallery Icons/APPLUS IDIADA.svg";
// import makeStyles from "@mui/styles/makeStyles";
// const lightColor = "rgba(255, 255, 255, 0.7)";
// const useStyles = makeStyles((theme) => ({
//   secondaryBar: {
//     zIndex: 0,
//     background: theme.palette.primary.main,
//     color: "#212121",
//   },
//   header: {
//     padding: 8,
//     background: theme.palette.primary.main,
//     color: "#212121",
//   },
//   margin: {
//     margin: theme.spacing(1),
//   },
//   menuButton: {
//     marginLeft: -theme.spacing(4),
//   },
//   iconButtonAvatar: {
//     padding: 3,
//   },
//   link: {
//     textDecoration: "none",
//     color: theme.palette.common.black,

//     minWidth: 40,
//     "&:hover": {
//       color: theme.palette.error.main,
//       boxShadow: 2,
//       //  text-shadow: .1em .1em .2em rgba(0, 0, 0, 0.6),
//     },
//   },
//   tab: {
//     marginLeft: 25,
//     textColor: theme.palette.error.main,
//     indicator: theme.palette.error.main,

//     "& .MuiTabs-indicator": {
//       backgroundColor: theme.palette.error.main,
//     },
//   },
//   button: {
//     borderColor: lightColor,
//   },
//   hov: {
//     margin: theme.spacing(0),
//   },
// }));

const schema = yup.object().shape({
  newpassword: yup.string().required("New Password is required Field"),
  confirmpassword: yup.string().required("Confirm Password is required Field"),
});

const ForgetPassowrd = ({ ...others }) => {
  const location = useLocation();
  let navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // const googleHandler = async () => {
  //   console.error("Login");
  // };

  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(location.search).get("token_valid") === "False") {
      navigate("/authentication/login");
    }
  });

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [data, setValues] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data, null, 2));
    setValues(data);

    axios
      .patch("http://127.0.0.1:8000/api/user/password-reset-complete", {
        password: data.newpassword,
        token: new URLSearchParams(location.search).get("token"),
        uidb64: new URLSearchParams(location.search).get("uidb64"),
      })
      .then((response) => {
        // alert(response.data);

        enqueueSnackbar("Password Update Successfully", {
          variant: "success",
        });
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <>
      {/* <AppBar position="static" className={classes.header}>
  
</AppBar> */}

      <Container maxWidth="lg">
        <Grid container style={{ marginTop: 0 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card elevation={0} style={{ marginTop: 150 }}>
              <Paper style={{ height: 470, overflow: "auto", border: 1 }}>
                <CardContent>
                  <Grid container direction="row">
                    <Grid item xs={4}>
                      <IconButton size="large">
                        <img src={LoginIcon} alt="Login Icon" />
                      </IconButton>
                    </Grid>
                    <Grid item xs={8} style={{ marginTop: 5 }}>
                      <CardHeader
                        title="Forget Password"
                        subheader="Reset Your Password."
                      />
                      <Grid container spacing={2}>
                        <Grid item xs={9}>
                          <TextField
                            {...register("newpassword")}
                            id="New Password"
                            type={showPassword1 ? "text" : "password"}
                            label="New Password"
                            fullWidth
                            variant="outlined"
                            control={control}
                            error={!!errors.newpassword}
                            helperText={errors?.newpassword?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            {...register("confirmpassword")}
                            id="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            label="Confirm Password"
                            fullWidth
                            variant="outlined"
                            control={control}
                            error={!!errors.confirmpassword}
                            helperText={errors?.confirmpassword?.message}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                    size="large"
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item sm={9}>
                          <Box sx={{ mt: 2 }}>
                            <Button
                              disableElevation
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                              style={{
                                background:
                                  "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
                                borderRadius: 4,
                                height: 50,
                                padding: 10,
                                fontSize: 20,
                              }}
                            >
                              Save Change
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Paper>
            </Card>
          </Form>
        </Grid>
      </Container>
    </>
  );
};

export default ForgetPassowrd;
