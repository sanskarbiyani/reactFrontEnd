import {
  Card,
  CardHeader,
  ListItem,
  Paper,
  Typography,
  Avatar,
  Box,
  Grid,
IconButton,
ListItemText,    
  List,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import React,{ Component } from 'react';
import Blank_Fields from '../../assets/APPLUS IDIADA.svg'
import DeleteIcon from '@mui/icons-material/Delete';

// import DeleteCol from '../../assets/Fields Page/Delete Column.svg'
export  function Content({datatypes,onDelete}){

    return (
      <Grid item sm={12}>
        
          <ListItem button
          
          >
            <ListItemText primary={datatypes} />
            <ListItemSecondaryAction>
            <IconButton size="large">
              <DeleteIcon onClick={()=>onDelete(datatypes)} />
              {/* <img src={DeleteCol} height={20} width={20} onClick= {()=>onDelete(datatypes)}/> */}
            </IconButton>
            </ListItemSecondaryAction>
            
          </ListItem>
          <Divider/>
      
      </Grid>
    );
}


export default class Datatypes extends Component{
    constructor(props){
        super(props)
       
        
        
    }
    


  
    render(){
      if ((this.props.fields).length>=1){
        return(
            <Card style={{borderRadius:15 }} elevation={0} >
              <CardHeader title="Fields" />
                <Paper style={{height: 460,  overflow: 'auto'}}>
                <List>
                  
                  { 

                  this.props.fields.map((field)=>
                    {
                    return (
                        <ListItem key={field.name}>
                        <Content
                             datatypes = {field.name}
                             onDelete = {this.props.onDelete}
                        />
                        </ListItem>
                      );
                    }
                  )
                      
                  } 
                   

                </List>
                    
                </Paper>
            </Card>
        );
                }
                else{
                  return(
                    <>
                    <Box  sx={{borderRadius: '10%' }}>
                    <Card style={{borderRadius:10, border:0 }} elevation={0}  >
                    <CardHeader title="Fields" />
                    <Paper style={{height: 460, overflow: 'auto',}}>
                      <center style={{marginTop:50 }} >
                      {/* <img src={Blank_Fields} width={350} /> */}
                      </center>
                    </Paper>
                    </Card>
                    </Box>
          
                    </>
                  );
                }
    }
}

 {/*function PinnedSubheaderList() {
    const [datatype, setdatatype] = React.useState(datatypes)
    return (
        <Card >
            <CardHeader title="Fields" />
        <Paper style={{height: 650, overflow: 'auto', border:1}}>
        <List>
            
            <ListItem>
              {console.log(typeof(datatype))}
                {datatype.map((datatype,index)=>{
                        
                    console.log(typeof(datatype))    
                })
                }
            
                </ListItem>
        </List>
        
      </Paper>
      </Card>
    );
  } */}