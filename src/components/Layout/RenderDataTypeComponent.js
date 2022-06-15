import {
  Grid,
  Card,
  Paper,
  
} from '@mui/material';

import {

  StyledEngineProvider, ThemeProvider
  
} from "@mui/material/styles";

import { createTheme } from '@mui/material';
import React from 'react';
import CheckboxU from '../InputFields/Checkbox';
import SingleLineText from '../InputFields/Single-line-text';
import MultiLineText from '../InputFields/Multi-line-text';
import NumberU from '../InputFields/Number';
import PersonU from '../InputFields/People';
import DateAndTimeU from '../InputFields/Date-and-Time';
import ChoiceU from '../InputFields/Choice';
import HyperLinkU from '../InputFields/HyperLink'
import CurrencyU from '../InputFields/Currency';
import LocationU from '../InputFields/Location';
import DocumentU from '../InputFields/Document';

import Blank_column from '../../assets/fields none selected.svg'


function RenderDataTypeComponent({props,datatypeID,onSubmiting})  {
  const theme = createTheme();
  const renderDatatypeComponent = (datatypeID) => {
      
      if (datatypeID === 0){
         return <SingleLineText onSubmiting={onSubmiting} single="Hello"/>
      }
      else if(datatypeID === 1){
        return  <MultiLineText onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 2){
        return <NumberU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 3){
        return <CheckboxU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 4){
        return <PersonU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 5){
        return <DateAndTimeU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 6){
        return <ChoiceU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 7){
        return <HyperLinkU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 8){
        return <CurrencyU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 9){
        return <LocationU onSubmiting={onSubmiting}/>
      }
      else if(datatypeID === 10){
        return <DocumentU onSubmiting={onSubmiting}/>
      }
      else{
        return (
          <div style={{
              display: "block",
              justifyContent: "center",
              alignItems: "center",
     
            }}>
            <img src={Blank_column}  alt="No Column Selected" height={500} width={550} />
          </div>
        )
      }
  
    };   
  

return (
<Card
sx={{ height: '100%' ,  width:'100%' }}
{...props}
elevation={0}
>

    <Paper style={{height: 523, overflow: 'auto'}} >
            <Grid
            container
            >
                    <Grid item>
                    <StyledEngineProvider injectFirst>
                      <ThemeProvider theme={theme}>
                                      {renderDatatypeComponent(datatypeID,onSubmiting)}
                          </ThemeProvider>
                    </StyledEngineProvider> 
                    </Grid>

                    </Grid>         
    </Paper>

</Card>
);
           
      
    
}

export default RenderDataTypeComponent;