import React,{  useState } from 'react';
import {
    Card,
    CardHeader,
    Grid,
    Paper,
    Box,
    Typography,
    Divider,
    CardContent,
    FormLabel

} from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import  RadioButtonCheckedIcon  from '@mui/icons-material/RadioButtonChecked';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Form} from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import {SwitchCustom} from '../ControlFields/Switch'
import {Input} from '../ControlFields/TextField'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import { RadioCustomCheckbox } from '../ControlFields/Radio';
import { Fragment } from "react";
import axiosInstance from '../../axois'
import {useSelector} from 'react-redux';
import { useSnackbar ,SnackbarProvider} from 'notistack';
const baseURL = "addFields/"

const boxes = [
    {
        value:'unchecked',
        label: 'unChecked',
        control: 'radio'
    },
    {
        value:'checked',
        label: 'Checked',
        control: 'radio'
    },
    
];
const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not contain numbers")
      .required("First name is a required field"),
    
  
  });
const Checkbox_u = ({props,onSubmiting}) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();

  const [data, setValues] = useState({
    modelname:listname['list'],
    name: "",
    data_type : "boolean",
    max_length: 30,
    null : true,
    unique: false,
    input_type : "boolean",
    description: "",
    columns: {
        default_val: "unchecked",
        is_checkbox: true,
        validations:[]
    }  
  });

  const {register, handleSubmit,  control, formState: { errors }} = useForm({defaultValues: {...data},
    mode: "onBlur",
    resolver: yupResolver(schema), 
})


const onSubmit = (data)=>{   
  if( data.columns.default_val == 'unchecked') 
     data.columns.default_val = false 
  else
     data.columns.default_val = true;
console.log(JSON.stringify(data,null,2));

axiosInstance
      .post(baseURL,
        data)
      .then((response) => {
        
        onSubmiting(JSON.stringify(data,null,2))
        
        enqueueSnackbar(response.data, { 
          variant: 'success',
      } 
      );
        
      }).catch((e)=>{
          alert(e);
      });
      setValues(data);
}


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Card>
      <CardHeader
        subheader="The information can be edited"
        title="How Do You Want Your Checkbox?"
      />
      <Divider />
      <Paper style={{height: 360, overflow: 'auto', border:1}}>
      <CardContent>
          
    <Grid container rowspacing={2} columnspacing={{ xs: 1, sm:2, md: 1 }}>
      <Grid item xs={6}>
          <Grid container rowspacing={4} columnspacing={{ xs: 1, sm: 2, md: 4 }} spacing={2 }>
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
                <FormLabel component="legend">Default Value</FormLabel>
                    <Fragment>
                    <RadioCustomCheckbox
                        {...register('columns.default_val')}
                            id="columns.default_val"
                            label="Default Value"
                            control={control}
                            name="columns.default_val"
                            checkboxes ={boxes}   
                            />
                </Fragment>
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
                                error={!!errors.name}
                                helperText={errors?.name?.message}
                                
                                />  
                  </Grid>
              <Grid item xs={11}>
              <Grid container direction='row' spacing={0}>
                <Grid item xs={5} >
                  <Typography variant="h5" gutterBottom component="div">
                    CheckBox Style
                  </Typography>
                </Grid>
                <Grid item >
                    <Grid container direction='row' spacing={0} alignItems="flex-end">
                    <Typography > <CheckBoxIcon color="primary"/></Typography>
                        <SwitchCustom
                                    {...register('columns.is_checkbox')}
                                        id="columns.is_checkbox"
                                        label="is_checkbox"
                                        control={control}
                                        name="columns.is_checkbox"
                                    
                                 />
                    <Typography> <RadioButtonCheckedIcon color="primary"/></Typography>
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

export default Checkbox_u;