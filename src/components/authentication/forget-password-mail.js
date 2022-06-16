import { useState } from "react";
import axiosInstance from "../../axois";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Container,
} from "@mui/material";

// third party
import * as yup from "yup";

// project imports
import { Form } from "../ControlFields/Form";
import { useForm } from "react-hook-form";
import { Input } from "../ControlFields/TextField";
// assets

import LoginIcon from "../../assets/AuthIcon/Login.svg";

import { yupResolver } from "@hookform/resolvers/yup";

import makeStyles from "@mui/styles/makeStyles";
import { useSnackbar } from "notistack";
const lightColor = "rgba(255, 255, 255, 0.7)";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: 8,
    background: "white",
    color: "#212121",
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
    textDecoration: "none",
    color: theme.palette.common.black,

    minWidth: 40,
    "&:hover": {
      color: theme.palette.error.main,
      boxShadow: 2,
    },
  },
  tab: {
    marginLeft: 25,
    textColor: theme.palette.error.main,
    indicator: theme.palette.error.main,
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.error.main,
    },
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
});

const ForgetMailPassword = ({ ...others }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
    email: "",
  });
  console.log(window.location.href);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    setValues(data);
    // e.preventDefault();
    const resetLink = window.location.href.split("/").slice(0, -1).join("/");
    const mailData = {
      email: data.email,
      redirect_url: resetLink,
    };
    axiosInstance
      .post(`user/request-reset-email/`, mailData)
      .then((res) => {
        enqueueSnackbar("We have sent you a link to reset your password", {
          variant: "Success",
        });
      })
      .catch((e) => {
        enqueueSnackbar("Enter Valid Email and Password", {
          variant: "Error",
        });
      });

    // axiosInstance
    // 	.post(`request-form-reset-email/`, {
    // 		email: data.email,
    //         redirect_url: 'http://localhost:3000/form-reset/mail',
    //         //////
    //         modelname:'ListOne',
    //         entry_id:1
    //         /////
    // 	})
    // 	.then((res) => {
    // 		enqueueSnackbar("We have sent you a link to reset your password", {
    //             variant: 'Success',
    //           })
    // 	})
    //     .catch((e)=>{
    //         enqueueSnackbar("Enter Valid Email and Password", {
    //             variant: 'Error',
    //           })
    //     })
    //     ;
  };
  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card elevation={0} style={{ marginTop: 100 }}>
              {/* <Paper elevation={3} style={{height: 500, overflow: 'auto'}} > */}
              <CardContent elevation={0}>
                <Grid
                  container
                  spacing={20}
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <Grid item xs={4}>
                    <IconButton size="large">
                      <img src={LoginIcon} />
                    </IconButton>
                  </Grid>
                  <Grid item xs={8} style={{ marginTop: 5 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={9}>
                        <CardHeader
                          style={{ marginLeft: -15 }}
                          title={
                            <Typography variant="h2">
                              Forget Password
                            </Typography>
                          }
                          subheader={
                            "We Understand, Just add your registered Email Address below"
                          }
                        />
                        <Input
                          {...register("email")}
                          id="email"
                          type="email"
                          label="Email"
                          control={control}
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                        />
                      </Grid>
                      <Grid item xs={9}>
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
                            Send Mail
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
    </>
  );
};

export default ForgetMailPassword;
