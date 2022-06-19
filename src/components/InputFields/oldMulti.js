import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Paper,
  TextField,
  Typography,
  Divider,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/styles";
import { alpha } from "@mui/material";
import { Switch } from "@mui/material";
import { pink } from "@mui/material/colors";

//import AntSwitch11 from './Components/Switch';

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const label = { inputProps: { "aria-label": "Switch demo" } };

const AccountProfileDetails = ({ props, single, onSubmiting }) => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    default_val: "",
    require_val: true,
    unique_val: true,
    max_char: "20",
    email_val: true,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    values.require_val =
      event.target.name === "require_val"
        ? event.target.checked
        : event.target.value;
    values.unique_val =
      event.target.name === "unique_val"
        ? event.target.checked
        : event.target.value;
    values.email_val =
      event.target.name === "email_val"
        ? event.target.checked
        : event.target.value;
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    alert(JSON.stringify(values, null, 2));
  };

  return (
    <form
      autoComplete="off"
      validate
      {...props}
      onSubmit={(e) => handleSubmit(e)}
    >
      <Card elevation={0}>
        <CardHeader
          subheader="The information can be edited"
          title="How Do You Want Your Single Line Text?"
        />
        <Divider />
        <Paper style={{ height: 360, overflow: "auto", border: 1 }}>
          <CardContent>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 1 }}
            >
              <Grid item xs={6}>
                <Grid
                  container
                  rowSpacing={4}
                  columnSpacing={{ xs: 1, sm: 2, md: 4 }}
                  spacing={2}
                >
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      helperText="Please specify the Name"
                      label="Name"
                      name="name"
                      onChange={handleChange}
                      required
                      value={values.name}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="Default Value"
                      name="default_val"
                      placeholder="Enter a default value"
                      onChange={handleChange}
                      required
                      value={values.default_val}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          Required
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <GreenSwitch
                            {...label}
                            defaultChecked
                            name="require_val"
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          unique Value
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <GreenSwitch
                            {...label}
                            defaultChecked
                            name="unique_val"
                            onChange={handleChange}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid
                  container
                  rowSpacing={2}
                  columnSpacing={{ xs: 0, sm: 0, md: 0 }}
                  spacing={2}
                >
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      onChange={handleChange}
                      required
                      value={values.description}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      fullWidth
                      label="Maximum Character"
                      type="number"
                      name="max_char"
                      placeholder="Enter a number between 1 and 255"
                      onChange={handleChange}
                      required
                      value={values.max_char}
                      inputProps={{
                        pattern: "[1-255]",
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          Email
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <GreenSwitch
                            {...label}
                            defaultChecked
                            name="email_val"
                            onChange={handleChange}
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
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Grid container direction="row-reverse">
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate(`/list/display-list-data/`);
                }}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
