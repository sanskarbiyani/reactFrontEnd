import React, { useState, useEffect } from "react";
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
      .min(10, "Number Should be more than 100000")
      .max(10000000000, "Number Should be less than 100000")
      .required("Number is Required"),
    decimal_palces: yup
      .number()
      .min(0, "Decimal place Should be more than 0")
      .max(10, "Decimal place Should be less than 10"),
  }),
});

const AccountProfileDetails = ({ props, onSubmiting }) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
    modelname: listname["list"],
    name: "",
    data_type: "float",
    max_length: 225,
    null: true,
    unique: true,
    input_type: "number",
    description: "",

    columns: {
      default_val: "xxxxx-xxxxx",
      require_val: true,
      decimal_palces: 0,
      min_val_allowed: 1,
      max_val_allowed: 10,
      separater: false,
      validations: [],
    },
  });
  useEffect(() => {
    console.log(data);
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const watchPhoneNumber = watch("columns.phoneNumber", false);
  useEffect(() => {
    console.log(watchPhoneNumber);
    if (watchPhoneNumber) {
      setValue("columns.max_val_allowed", 10000000000);
      setValue("columns.min_val_allowed", 999999999);
    } else {
      setValue("columns.max_val_allowed", 10);
      setValue("columns.min_val_allowed", 1);
    }
  }, [watchPhoneNumber]);

  const navigate = useNavigate();
  const onSubmit = (data) => {
    if (data.columns.require_val) {
      data.columns.validations.push({
        type: "required",
        params: ["this field is required"],
      });
    }

    data.columns.validations.push({
      type: "min",
      params: [
        data.columns.min_val_allowed,
        data.name +
          " cannot be less than " +
          data.columns.min_val_allowed +
          " characters",
      ],
    });

    data.columns.validations.push({
      type: "max",
      params: [
        data.columns.max_val_allowed,
        data.name +
          " cannot be less than " +
          data.columns.max_val_allowed +
          " characters",
      ],
    });

    console.log(JSON.stringify(data, null, 2));

    console.log(data.columns);

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
    data.columns.validations = [];
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="How Do You Want Your Number?"
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
                    <Input
                      {...register("columns.default_val")}
                      id="columns.default_val"
                      type="text"
                      label="Default Value"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Input
                      {...register("columns.decimal_palces")}
                      id="columns.decimal_palces"
                      type="number"
                      label="Decimal Places"
                      control={control}
                    />
                  </Grid>

                  <Grid item xs={11}>
                    <Grid container direction="row" spacing={0}>
                      <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom component="div">
                          Phone Number ?
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Grid container direction="row">
                          <SwitchCustom
                            {...register("columns.phoneNumber")}
                            id="columns.phoneNumber"
                            label="phoneNumber"
                            control={control}
                            name="columns.phoneNumber"

                            // onChange = {() => {

                            //   console.log('Clicked.');

                            //   if(watchPhoneNumber){

                            //     setValue("columns.max_val_allowed", 10000000000);

                            //     setValue("columns.min_val_allowed", 999999999);

                            //   }

                            // }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
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
                          <SwitchCustom
                            {...register("columns.require_val")}
                            id="columns.require_val"
                            label="Required Vlue"
                            control={control}
                            name="columns.require_val"
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
