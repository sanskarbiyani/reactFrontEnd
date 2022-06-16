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
} from '@mui/material'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {Form} from '../ControlFields/Form'
import { useForm } from 'react-hook-form';
import {SwitchCustom} from '../ControlFields/Switch'
import {Input} from '../ControlFields/TextField'
import { PrimaryButton } from '../ControlFields/SubmitButton';
import {SelectCustom} from '../ControlFields/Select'
import {useSelector} from 'react-redux';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';
import { useNavigate } from "react-router-dom";

const baseURL = "addFields/"

const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not contain numbers")
      .required("First name is a required field"),
    
    
  });




const document_type = [
    {
        value:'default',
        label: 'Select document type'
    },
    {
        value:"pdf",
        label:"PDF"
    },
    {
        value:"jpg",
        label:"JPG"
    },
    {
        value:"word",
        label:"DOC"

    }

]


const AccountProfileDetails = ({props,onSubmiting}) => {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();
  const [data, setValues] = useState({
        modelname:listname['list'],
        name: "",
        data_type : "file",
        max_length: 30,
        null : true,
        unique: true,
        input_type : "document",
        description: "",
        columns: {
            default_val: "",
            document_type: "pdf",
            validations :[]
        }
    
  });

  const {register, handleSubmit,  control, formState: { errors }} = useForm({defaultValues: {...data},
    mode: "onBlur",
    resolver: yupResolver(schema), 
})

const navigate = useNavigate();
const onSubmit = (data)=>{   
        console.log(JSON.stringify(data,null,2));
        
        axiosInstance
              .post(baseURL,
                            data)
                                .then((response) => {
        
                onSubmiting(JSON.stringify(data,null,2))
        
                enqueueSnackbar(response.data, { 
                variant: 'success',
            },
            navigate(`/list/display-list-data/`) 
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
        title="How Do You Want Your Document?"
      />
      <Divider />
      <Paper style={{height: 360, overflow: 'auto', border:1}}>
        <CardContent>
      <Grid container rowspacing={2} columnspacing={{ xs: 1, sm:2, md: 1 }}>
        <Grid item xs={8}>
            <Grid container rowspacing={2} columnSpacing={{ xs: 1, sm: 2, md: 4 }} spacing={2}>
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
                      onClick={() => { navigate(`/list/display-list-data/`) }}
                  >
                      Cancel
                  </PrimaryButton>
               </Grid>   
               <Grid item xs={4}>
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