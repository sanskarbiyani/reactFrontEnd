import React, {
  
} from "react";

import { Controller } from "react-hook-form";
import makeStyles from '@mui/styles/makeStyles';

import { Radio, RadioGroup,FormControlLabel, Checkbox } from "@mui/material";
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#eee",
      textAlign: "center",
      cursor: "pointer",
      color: "#333",
      padding: "10px",
      marginTop: "20px",
    },
    icon: {
      marginTop: "16px",
      color: "#888888",
      fontSize: "42px",
    },
    formControl:{
        minWidth: 120,
        backgroundColor: "transparent"
    },
    Select:{
    textAlign: "center",
    textDecoration: "none"
    },
  }));

export const  RadioCustomCheckbox = React.forwardRef( (props,ref)  => {
  const styles = useStyles();
 
  return (
      <Controller
      {...props}
      render={({ field }) => (
        <RadioGroup aria-label="default_val" {...field}>
              {props.checkboxes.map((box)=>{
              return(
              <FormControlLabel
                value={box.value}
                control={ box.control == 'radio' ? <Radio /> : <Checkbox/>}
                label={box.label}
                
              />)
              
              })
              
              }
              
              {/* <FormControlLabel value="unchecked" control={<Radio />} label="Unchecked" /> */}
        </RadioGroup>
      )}
    />
  );

});
