import React,{  Fragment, useState } from 'react';
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
import { CheckboxCustomList } from '../ControlFields/choice';
import {SelectCustom,SelectIconCustom} from '../ControlFields/Select'
import Add from '../../assets/Gallery Icons/Add New Item.svg'
import Customize from '../../assets/Gallery Icons/Customize.svg'
import {useSelector} from 'react-redux';
import { useSnackbar } from 'notistack';
import axiosInstance from '../../axois';
import { NavLink, useNavigate } from "react-router-dom";
import { border } from '@mui/system';
const baseURL = "addFields/"

const countries = [
    {
      label: "Style1",
      src: Add,
      link: " ",
      value: "default",
      border: "1px solid",
      color: "white",
    },
    {
      label: "Style2",
      src: Customize,
      link: " ",
      value: "outlined"
    },
    
  ];

const schema = yup.object().shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "First name should not contain numbers")
      .required("First name is a required field"),    
  });

const AccountProfileDetails = ({props,onSubmiting}) => {
  const listname = useSelector((state) => state.customization.group_list);
  const [default_val, setDefaultValue] = useState([{
    
      value:'default',
      label: 'Select Default Value'
  }
        ]);
  const [data, setValues] = useState({
        modelname:listname['list'],
        name: "",
        data_type : "character",
        max_length: 30,
        null : true,
        unique: false,
        input_type : "choice",
        description: "",
        columns: {
            default_val: "default",
            require_val: true,
            button_style:"default",
            multiChoiceSelection: false,
            choices:[],
            validations :[]

        }
  });

  const addToDefault=(choice)=>{
    setDefaultValue(prevItems => [...prevItems, choice]);
    console.log(choice)
  }
  const RemoveToDefault=(index)=>{
    console.log(index)
    const remaining = default_val.filter((item,index1) => index1 !== (index+1));
    setDefaultValue(remaining);
    
    
    
  }
  const updateFieldChanged = (name, index,newvalue) => {
    console.log("jello")
    let newArr = default_val.map((item, i) => {
      if ((index+1) == i) {
        return { ...item, ['label']: newvalue, ['value']:newvalue };
      } else {
        return item;
      }
    });
    setDefaultValue(newArr);
  };

  const clearAll=()=>{
    setDefaultValue([{
      value:'default',
      label: 'Select Default Value'
    }])
  }
  const {register, handleSubmit, setValue, control, formState: { errors }} = useForm({defaultValues: {...data},
            mode: "onBlur",
            resolver: yupResolver(schema), 
})

const { enqueueSnackbar } = useSnackbar();
      
const navigate = useNavigate();  
const onSubmit = (data)=>{   
  
    
    
    if(data.columns.default_val === 'default')
        data.columns.default_val = default_val[1]['value']
    console.log(JSON.stringify(data,null,2));

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
      setValues(data);    
  }


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="How Do You Want Your Choice?"
        
        />
        <Divider />
        <Paper style={{height: 360, overflow: 'auto', border:1}}>
        <CardContent>
            
      <Grid container rowspacing={2} columnspacing={{ xs: 1, sm:2, md: 1 }}>
        <Grid item xs={6}>
            <Grid container rowspacing={4} columnSpacing={{ xs: 1, sm: 2, md: 4 }} spacing={2 }>
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
                <Grid item xs={11}>
                <SelectCustom
                     {...register('columns.default_val')}
                        id="columns.default_val"
                        label="default_val"
                        variant="outlined"
                        control={control}
                        name="columns.default_val"
                        options= {default_val}
                        disable={false}
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
        
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container rowspacing={2} columnspacing={{ xs: 0, sm: 0, md: 0 }} spacing={2}>
                <Grid item xs={11}>
                    <Fragment>
                    <SelectIconCustom
                     {...register('columns.button_style')}
                        id="columns.button_style"
                        label="buttonStyle"
                        control={control}
                        name="columns.button_style"
                        countries= {countries}
                        />
                        </Fragment>
                </Grid>
                <Grid item xs={11}>
                <CheckboxCustomList
                     {...register('columns.choices')}
                        id="columns.choices"
                      //  label ={'choices'}
                        control={control}
                        name={"columns.choices"}
                        setValue={setValue}
                        addToDefault = {addToDefault}
                        removeToDefault = {RemoveToDefault}
                        clearAll = {clearAll}
                        updateFieldChanged ={updateFieldChanged}
                        />
                </Grid>
                {/* <Grid item xs={11}>
                <Grid container direction='row' spacing={0} >
                                <Grid item xs={5}  >
                                <Typography variant="h5" gutterBottom component="div">
                                    Multiple People Selection
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                    <Typography> on</Typography>
                                    <SwitchCustom
                                        {...register('columns.multiChoiceSelection')}
                                            id="columns.multiChoiceSelection"
                                            label="multiChoiceSelection"
                                            control={control}
                                            name="columns.multiChoiceSelection"
                                            
                                            />
                                    <Typography> off</Typography>
                                    </Grid>
                                </Grid>
                        </Grid>
                </Grid> */}
                {/* <Grid item xs={11}>
                <Grid container direction='row' spacing={0} >
                                <Grid item xs={5}  >
                                <Typography variant="h5" gutterBottom component="div">
                                    Unique Value
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row">
                                    <Typography> on</Typography>
                                    <SwitchCustom
                                        {...register('unique')}
                                            id="unique"
                                            label="unique"
                                            control={control}
                                            name="unique"
                                            />
                                    <Typography> off</Typography>
                                    </Grid>
                                </Grid>
                        </Grid>
                </Grid> */}
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


