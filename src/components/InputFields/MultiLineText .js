import React, { useState } from "react";
import {
  Card,
  CardHeader,
  Grid,
  Paper,
  Box,
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
//import AntSwitch11 from './Components/Switch';
import { SelectCustom, SelectIconCustom } from "../ControlFields/Select";
import { RadioCustom } from "../ControlFields/Radio";
import { CheckboxCustom } from "../ControlFields/choice";
import { Fragment } from "react";

import Add from "../../assets/Gallery Page/Gallery Page/Add New Item.svg";
import Customize from "../../assets/Gallery Page/Gallery Page/Customize.png";
import Filter from "../../assets/Gallery Page/Gallery Page/Filter.png";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),

  number: yup
    .number()
    .max(10, "Max no is 10")
    .min(0, "Min number is 0")
    .required("Number is Required"),
});
const options = [
  {
    label: "Dropdown Option 1",
    value: "1",
  },
  {
    label: "Dropdown Option 2",
    value: "2",
  },
];

const countries = [
  {
    label: "France",
    src: Add,
    link: " ",
    value: "FR",
  },
  {
    label: "Allemagne",
    src: Customize,
    link: " ",
    value: "DE",
  },
  {
    label: "Suisse",
    src: Filter,
    link: " ",
    value: "CH",
  },
];

const AccountProfileDetails = ({ props, single, onSubmiting }) => {
  const [data, setValues] = useState({
    name: "",
    description: "",
    default_val: "1",
    require_val: true,
    gender: "",
    country: "FR",
    number: 0,
    email_val: true,
    checkbox: [],
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

  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    setValues(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
                      {...register("number")}
                      id="number"
                      type="number"
                      label="Enter Number"
                      control={control}
                      error={!!errors.number}
                      helperText={errors?.number?.message}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <SwitchCustom
                      {...register("require_val")}
                      id="require_val"
                      label="require_val"
                      control={control}
                      name="require_val"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <CheckboxCustom
                      {...register("checkbox")}
                      id="checkbox"
                      label={"checkbox"}
                      control={control}
                      name={"checkbox"}
                      setValue={setValue}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Fragment>
                      <SelectCustom
                        {...register("default_val")}
                        id="default_val"
                        label="default_val"
                        control={control}
                        name="default_val"
                        options={options}
                      />
                    </Fragment>
                  </Grid>
                  <Grid item xs={11}>
                    <Fragment>
                      <SelectIconCustom
                        {...register("country")}
                        id="country"
                        label="country"
                        control={control}
                        name="country"
                        countries={countries}
                      />
                    </Fragment>
                  </Grid>
                  <Grid item xs={11}>
                    <Fragment>
                      <RadioCustom
                        {...register("gender")}
                        id="gender"
                        label="gender"
                        control={control}
                        name="gender"
                      />
                    </Fragment>
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
              <PrimaryButton>Save</PrimaryButton>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </Form>
  );
};

export default AccountProfileDetails;
