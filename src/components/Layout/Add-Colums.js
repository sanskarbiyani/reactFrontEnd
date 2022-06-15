import {
    
  Card,
  CardHeader,
  ListItem,
  Paper,
  Typography,
  List,

} from '@mui/material';

import { withStyles} from '@mui/styles';
// import { createTheme } from '@mui/material';
import React,{ Component } from 'react';



const commonStyles = {
  bgcolor: '#dddee1',
  m: 1,
  mt:3,
  borderColor: '#dddee1',
  width: '0.1rem',
  height: '487px',

};

const datatypes = [
  'Single Line Text',
  'Multiple Line Text',
  'Number',
  'Checkbox',
  'Person/Group',
  'Data & Time',
  'Choice',
  'Hyperlink',
  'Currency',
  'Location',
  'Documents'
]


export const Content =({datatypes})=>{
    return (
        <span
          
          elevation={0}
          
          
        >
            <Typography variant='body1' style={{ marginLeft:40 }} >
                    {datatypes}
            </Typography>
        </span>
      
      

    );
}

const useStyles = (theme) => ({
  mainCard: {
    
    background: '#f3f4f7' ,
    
    
  }});


class Datatypes extends Component{
  constructor(props){
      super(props)
      this.state ={
          datatypes1 : datatypes,
          selectType:'',
          selectedIndex:''
      };
      console.log(this.state.datatypes1);
  }
  
   handleClickShortMessage =(datatypeID)  =>{

      this.props.onSelect(datatypeID);

  };

  
  
  
  render(){
    const {classes} = this.props;
      return(
      <>
          <Card elevation={0}  style={{borderRadius: 12 }}>
                 <CardHeader title="Add Columns" />
                  <Paper style={{height: 460, overflow: 'auto'}} >
                  <List>
                    { this.state.datatypes1.map((data,index)=>
                      {
                      return (
                          <ListItem key={data} button selected={this.state.selectedIndex === index}
                          onClick={(event) => {this.setState({ selectedIndex : index  }); this.handleClickShortMessage(index)}}>
                          <Content
                            datatypes = {data}
                            
                          />
                          </ListItem>
                        );
                      }
                    )
                        
                    } 
                  </List>   
                  </Paper>
              </Card>
        </>
      );
  }
}
export default withStyles(useStyles) (Datatypes);