import React,{ Component, useState } from 'react';
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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Form} from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import {SwitchCustom} from '../ControlFields/Switch'
import {Input} from '../ControlFields/TextField'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import {useSelector} from 'react-redux'; 
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';
import { NavLink, useNavigate } from "react-router-dom";

const baseURL = "addFields/"


const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
  
  
});




const AccountProfileDetails = ({props,onSubmiting}) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
    modelname:listname['list'],
    name: "",
    data_type : "json",
    max_length: 30,
    null : true,
    unique: false,
    input_type : "hyperlink",
    description: "",
    columns: {
        default_val:{},
        text_over_link: false,
        require_val: true,
        validations:[]
    }
    
  });

  const {register, handleSubmit,  control, formState: { errors }} = useForm({defaultValues: {...data},
    mode: "onBlur",
    resolver: yupResolver(schema), 
})

const navigate = useNavigate();
const onSubmit = (data)=>{   
    
    console.log(JSON.stringify(data,null,2));
    setValues(data);
    axiosInstance
      .post(baseURL,
        data)
      .then((response) => {
        
        onSubmiting(JSON.stringify(data,null,2))
        
        enqueueSnackbar(response.data, { 
          variant: 'success',
      },
      navigate(`/display-list-data/`)
      );
        
      }).catch((e)=>{
          alert(e);
      });
}



  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <Card elevation={0}>
      <CardHeader
        subheader="The information can be edited"
        title="How Do You Want Your HyperLink?"
      
      />
      <Divider />
      <Paper style={{height: 360, overflow: 'auto', border:1}}>
      <CardContent>
          
    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm:2, md: 1 }}>
      <Grid item xs={6}>
          <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} spacing={2 }>
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
                              Text Over Link
                            </Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row">
                                <SwitchCustom
                                    {...register('columns.text_over_link')}
                                        id="columns.text_over_link"
                                        label="text_over_link"
                                        control={control}
                                        name="columns.text_over_link"
                                        
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
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