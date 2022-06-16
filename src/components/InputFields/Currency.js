import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  CardContent,
} from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ControlFields/Form";
import { useForm } from "react-hook-form";
import { SwitchCustom } from "../ControlFields/Switch";
import { Input } from "../ControlFields/TextField";
import { PrimaryButton } from "../ControlFields/SubmitButton";
import { SelectCustom } from "../ControlFields/Select";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axiosInstance from "../../axois";
import { useNavigate } from "react-router-dom";

const baseURL = "addFields/";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),

  columns: yup.object().shape({
    min_val_allowed: yup
      .number()
      .min(1, "Number Should be more than 1")
      .max(500000, "Number Should be less than 500000")
      .required("Number is Required"),
  }),
});

const curr_format = [
  {
    value: "default",
    label: "Select Currency Format",
  },
  {
    value: "$",
    label: "USD ($)",
  },
  {
    value: "₹",
    label: "Indian rupee(₹)",
  },
  {
    value: "€",
    label: "Euro",
  },
];
const decimal_palces = [
  {
    value: "default",
    label: "Select Decimal Places",
  },
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
];
const AccountProfileDetails = ({ props, onSubmiting }) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();
  console.log(listname["list"]);
  const [data, setValues] = useState({
    modelname: listname["list"],
    name: "",
    data_type: "float",
    max_length: 30,
    null: true,
    unique: true,
    input_type: "currency",
    description: "",
    columns: {
      currency_format: "default",
      decimal_places: "default",
      min_val_allowed: 0,
      max_val_allowed: 99,
      separater: true,
      validations: [],
    },
  });

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

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    console.log(listname["list"]);

    axiosInstance
      .post(baseURL, data)
      .then((response) => {
        onSubmiting(JSON.stringify(data, null, 2));

        enqueueSnackbar(
          response.data,
          {
            variant: "success",
          },
          navigate(`/list/display-list-data/`)
        );
      })
      .catch((e) => {
        alert(e);
      });
    setValues(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="How Do You Want Your Currency?"
        />
        <Divider />
        <Paper style={{ height: 360, overflow: "auto", border: 1 }}>
          <CardContent>
            <Grid
              container
              rowspacing={2}
              columnspacing={{ xs: 1, sm: 2, md: 1 }}
            >
              <Grid item xs={6}>
                <Grid
                  container
                  rowspacing={4}
                  columnspacing={{ xs: 1, sm: 2, md: 4 }}
                  spacing={2}
                >
                  <Grid item xs={11}>
                    <Input
                      {...register("name")}
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
                      {...register("columns.currency_format")}
                      id="columns.currency_format"
                      label="currency_format"
                      control={control}
                      name="columns.currency_format"
                      variant="outlined"
                      options={curr_format}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <SelectCustom
                      {...register("columns.decimal_places")}
                      id="columns.decimal_places"
                      label="decimal_places"
                      control={control}
                      name="columns.decimal_places"
                      variant="outlined"
                      options={decimal_palces}
                    />
                  </Grid>

                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          Unique Value
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <SwitchCustom
                            {...register("unique")}
                            id="unique"
                            label="Unique Value"
                            control={control}
                            name="unique"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          1000's Separator
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row">
                          <SwitchCustom
                            {...register("columns.separater")}
                            id="columns.separater"
                            label="Separater"
                            control={control}
                            name="columns.separater"
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
                  rowspacing={2}
                  columnspacing={{ xs: 0, sm: 0, md: 0 }}
                  spacing={2}
                >
                  <Grid item xs={11}>
                    <Input
                      {...register("description")}
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
                    <Input
                      {...register("columns.min_val_allowed")}
                      id="columns.min_val_allowed"
                      type="number"
                      label="Minimum allowed value"
                      control={control}
                      error={!!errors.min_val_allowed}
                      helperText={errors?.min_val_allowed?.message}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Input
                      {...register("columns.max_val_allowed")}
                      id="columns.max_val_allowed"
                      type="number"
                      label="maximum allowed value"
                      control={control}
                    />
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
          <Grid container direction="row-reverse" spacing={2}>
            <Grid item>
              <PrimaryButton
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate(`/list/display-list-data/`);
                }}
              >
                Cancel
              </PrimaryButton>
            </Grid>
            <Grid item xs={3}>
              <PrimaryButton color="primary" variant="contained" type="submit">
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
