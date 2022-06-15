import React, { useEffect } from "react";
import {IconButton, Button, List,TextField,Divider, FormLabel ,FormControl,FormControlLabel, Checkbox,Paper, Grid, ListItem, ListItemSecondaryAction } from "@mui/material";
import { Controller } from "react-hook-form";
import {  useState } from "react";
import {Input} from './TextField'
import CustomSelectDelete from "@mui/icons-material/DeleteOutlineSharp";
import PopOverMenu from "./Color Picker/PopOverMenu";
import PaletteIcon from '@mui/icons-material/Palette';

export const CheckboxCustom= React.forwardRef((props,ref) => {
  const [selectedItems, setSelectedItems] = useState([]);

  // we are handling the selection manually here
  const handleSelect = (value) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems) => [...prevItems, value]);
    }
  };

  // we are setting form value manually here
  useEffect(() => {
    props.setValue(props.name, selectedItems); 
  }, [selectedItems]);

  return (
    <Grid container  alignContent="flex-end"  justifyContent="flex-end" >
    <FormControl size={"small"} variant={"outlined"} {...props}>
     
      
      
        {props.options.map((option) => {
          return (
            <>
            <Grid container  alignContent="flex-end"  justifyContent="flex-end" >      
            <FormControlLabel
              {...props}
              control={
                <Controller
                    name={props.name}
                    control={props.control}
                    render={({field}) => {
                    return (
                      
                       <>
                       
                       {option.label}
                       
                            <Checkbox
                            icon ={props.icon}
                              checkedIcon={props.checkedicon}
                              innerRef={field.ref}
                              ref={field.ref}
                              checked={selectedItems.includes(option.value)}
                              onChange={() => handleSelect(option.value)}
                            />
                       
                      
                      </>
                    );
                  }}
                  
                />
              }
              
              key={option.value}
            />
            
            <br/>
            </Grid>
            </>
          );
        })}
      
      
    </FormControl>
    </Grid>
  );
});


export const CheckboxCustomList= React.forwardRef((props,ref) => {
  // const [selectedItems, setSelectedItems] = useState([]);
  
  const [counter, setCounter] = React.useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  
  const [values, setValues] = useState({
    place: 1,
    name: 'Choice',
    code:'#7057ff',
    path:'default.svg'
  });
  const [indexes, setIndexes] = React.useState([]);
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  
  const addFriend = (choice) => {
    console.log(choice)
    setSelectedItems(prevItems => [...prevItems, {place:choice , name:`choice${choice}`,code:'#7057ff',path:'default.svg'}]);
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
    props.addToDefault({value:'choice',label:`choice${choice}`}) 
  };

  const onFocus = (value) => {
         const isPresent = selectedItems.indexOf(value);
         if(isPresent !==-1){
           
           const remaining = selectedItems.filter((item) => item !== value);
           setSelectedItems(remaining);
         }
         else{
           setSelectedItems((prevItems) => [...prevItems,value]);
         }
  };

  const removeFriend = index => () => {
    
    const remaining = selectedItems.filter((item,index1) => index1 !== index);
     
    
    setSelectedItems(remaining);
    console.log(selectedItems)
    const  remainingIndex = indexes.filter(item => item !== index)
    console.log(remainingIndex)
    setIndexes([...remainingIndex]);
    console.log(indexes)
    setCounter(prevCounter => prevCounter - 1);
    
    props.removeToDefault(index)
  };

  const clearFriends = () => {
    setIndexes([]);
    setCounter(0)
    
    setSelectedItems([])
    console.log(selectedItems)
    props.clearAll()
  };

  const updateFieldChanged = (name, index)  =>(event)=> {
    
    let newArr = selectedItems.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setSelectedItems(newArr);
    props.updateFieldChanged('label',index,event.target.value)
  };
 
  const customUpdateFieldChanged = (name, index)  =>(event)=> {
    
    let newArr = selectedItems.map((item, i) => {
      if (index == i) {
        return { ...item, [name]: event.target.value };
      } else {
        return item;
      }
    });
    setSelectedItems(newArr);
    // props.updateFieldChanged('label',index,event.target.value)
  };
  const updateFieldColor = (index,color) =>{
    
    let newArr = selectedItems.map((item,i)=>{
        if(index===i){
          return {...item , ['code'] : color}
        }
        else{
          return item
        }
    });
    setSelectedItems(newArr);
  }

const updateIconSrc = (index,path)=>{
  let newArr =  selectedItems.map((item,i)=>{
      if(index===i)
          return {...item,['path']:path}
      return item
  })
  setSelectedItems(newArr);
}
  // we are setting form value manually here
  useEffect(() => {
    
    props.setValue(props.name, selectedItems); 
    
  }, [selectedItems]);

  return (
    <FormControl size={"small"} variant={"outlined"} {...props} fullWidth>
      {/* <FormLabel component="legend">{props.label}</FormLabel> */}
      <Paper style={{ minheight: 200, border: 1 }}>
        <List style={{padding:3, border: 10 }}>
           {selectedItems.map((index,index1) => {
            //  console.log(index.name)
              const fieldName = `choice${index1}`;
              return <>
              <ListItem button>
                          
                                          <FormControlLabel
                                           label ={''}
                                            {...props}
                                              control={
                                                <Controller
                                                  
                                                    name={props.name}
                                                    control={props.control}
                                                    render={({field}) => {
                                                    return (
                                                      <FormControl>
                                                      <Input
                                                        ref={field.ref}
                                                        name={`${fieldName}.name`}
                                                        placeholder={`${fieldName} name`}
                                                        value ={index.name}
                                                        // defaultValue={index.name}
                                                          onBlur={updateFieldChanged('name',index1)}
                                                          onChange={customUpdateFieldChanged('name',index1)}
                                                        InputProps={{
                                                          startAdornment: 
                                                          <FormControlLabel
                                                          label ={''}
                                                          {...props}
                                                               control={
                                                                 <Controller
                                                                 
                                                                     name={props.name}
                                                                     control={props.control}
                                                                     render={({field}) => {
                                                                     return (
                                                                       badgeMenu.map((item, i) => {
                                                                         return (
                                                                           <PopOverMenu
                                                                             key={i}
                                                                             index = {index1}
                                                                             innerRef ={field.ref}
                                                                             ref={field.ref}
                                                                             where = {"choice"}
                                                                             name={`${fieldName}.code`}
                                                                             icon={item.icon}
                                                                             menu={item.menu}
                                                                             onSelect = {updateIconSrc}
                                                                             onChange = {updateFieldColor}
                                                                           />
                                                                         );
                                                                       })
                                                                         
                                                                     );
                                                                   }}
                                                                   
                                                                 />
                                                               }
                                                              
                                                             />
                                      
                                                           ,
                                                        }}
                                                      />
                                                      </FormControl>  
                                                    );
                                                  }}
                                                  
                                                />
                                              }
                                             
                                            />
                                          
                                        
                                    <ListItemSecondaryAction >
                                      
                                          <IconButton size="large">
                                          <CustomSelectDelete onClick={removeFriend(index1)} />
                                          </IconButton>
                                          </ListItemSecondaryAction>
                     
                        
            
            </ListItem>
            <Divider/>
            </>;
      })}
      </List>
      </Paper>

      <Button type="button" onClick={()=>addFriend(selectedItems.length)}>
        Add Choice
      </Button>
      <Button type="button" onClick={clearFriends}>
        Clear Choices
      </Button>
      
      
      
    </FormControl>
  );
});

let badgeMenu = [
     
  {
    icon: <PaletteIcon />,
    menu: [
      
      {
        name: 'good first issue',
        color: '#7057ff',
        description: 'Good for newcomers',
      },
      {
        name: 'help wanted',
        color: '#008672',
        description: 'Extra attention is needed',
      },
      {
        name: 'priority: critical',
        color: '#b60205',
        description: '',
      },
      {
        name: 'priority: high',
        color: '#d93f0b',
        description: '',
      },
      {
        name: 'priority: low',
        color: '#0e8a16',
        description: '',
      },
      {
        name: 'priority: medium',
        color: '#fbca04',
        description: '',
      },
      {
        name: "status: can't reproduce",
        color: '#fec1c1',
        description: '',
      },
      {
        name: 'status: confirmed',
        color: '#215cea',
        description: '',
      },
      {
        name: 'status: duplicate',
        color: '#cfd3d7',
        description: 'This issue or pull request already exists',
      },
      {
        name: 'status: needs information',
        color: '#fef2c0',
        description: '',
      },
      {
        name: 'status: wont do/fix',
        color: '#eeeeee',
        description: 'This will not be worked on',
      },
      {
        name: 'type: bug',
        color: '#d73a4a',
        description: "Something isn't working",
      },
      {
        name: 'type: discussion',
        color: '#d4c5f9',
        description: '',
      },
      {
        name: 'type: documentation',
        color: '#006b75',
        description: '',
      },
      {
        name: 'type: enhancement',
        color: '#84b6eb',
        description: '',
      },
      {
        name: 'type: epic',
        color: '#3e4b9e',
        description: 'A theme of work that contain sub-tasks',
      },
      {
        name: 'type: feature request',
        color: '#fbca04',
        description: 'New feature or request',
      },
      {
        name: 'type: question',
        color: '#d876e3',
        description: 'Further information is requested',
      },
    ]
  },
  
];