import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  Grid,
  Paper,
  Box,
  Typography,
  Divider,
  CardContent,

} from '@mui/material'
import { useParams } from 'react-router-dom';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import { SwitchCustom } from '../ControlFields/Switch'
import { Input } from '../ControlFields/TextField'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';
import { NavLink, useNavigate } from "react-router-dom";

import { useSelector } from 'react-redux';

const baseURL = "addFields/"

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),

  max_length: yup
    .number()
    .max(255, "Max number is 255")
    .min(1, "Min number is 1")
    .required("Number is Required")

});
const AccountProfileDetails = ({ props, single, onSubmiting }) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
    modelname: listname['list'],
    name: "",
    data_type: "character",
    max_length: 30,
    null: true,
    unique: false,
    input_type: "string",
    description: "",
    columns: {
      default_val: "",
      require_val: true,
      validations: []
    }
  });

  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  })

  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(listname['list'])
    if (data.columns.require_val) {
      data.columns.validations.push({
        type: "required",
        params: ["this field is required"]
      })
    }

    if ((data.name).toLowerCase() === 'email') {
      data.columns.validations.push({
        type: "email",
        params: ["Enter The Valid Email"]
      })
    }



    console.log(JSON.stringify(data))

    axiosInstance
      .post(baseURL,
        data)
      .then((response) => {

        onSubmiting(JSON.stringify(data, null, 2))

        enqueueSnackbar(response.data, {
          variant: 'success',
        },
        navigate(`/display-list-data/`)
        );

      }).catch((e) => {
        alert(e);
      });
    setValues(data)

  }

  return (

    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card elevation={0}>
        <CardHeader
          subheader="The information can be edited"
          title="How Do You Want Your Single Line Text?"
        />
        <Divider />
        <Paper style={{ height: 360, overflow: 'auto', border: 1 }}>
          <CardContent>

            <Grid container rowspacing={2} columnspacing={{ xs: 1, sm: 2, md: 1 }}>
              <Grid item xs={6}>
                <Grid container rowspacing={4} columnspacing={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
                  <Grid item xs={11}>
                    <Input
                      {...register('name')}
                      id="name"
                      type="text"
                      label="Name *"
                      control={control}
                      error={!!errors.name}
                      helperText={errors?.name?.message}

                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Input
                      {...register('columns.default_val')}
                      id="columns.default_val"
                      type="text"
                      label="Default Value"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container direction='row' spacing={0} >
                      <Grid item xs={5}  >
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
                      <Grid item xs={5}  >
                        <Typography variant="h6" gutterBottom component="div">
                          Unique Value
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

                </Grid>
              </Grid>
              <Grid item xs={6}>
                <Grid container rowspacing={2} columnspacing={{ xs: 0, sm: 0, md: 0 }} spacing={2}>
                  <Grid item xs={11}>
                    <Input
                      {...register('description')}
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
                      {...register('max_length')}
                      id="max_length"
                      type="number"
                      label="Maximum Character"
                      control={control}
                      error={!!errors.max_length}
                      helperText={errors?.max_length?.message}
                      placeholder="Enter a number between 1 and 255"
                    />

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