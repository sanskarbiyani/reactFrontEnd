import React, { useEffect, useState } from "react";
import {Checkbox,FormControl,FormControlLabel,FormLabel} from "@material-ui/core";
import { Controller } from "react-hook-form";

const options = [
  {
    label: "Checkbox Option 1",
    value: "1",
  },
  {
    label: "Checkbox Option 2",
    value: "2",
  },
];

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
    <FormControl size={"small"} variant={"outlined"} {...props}>
      <FormLabel component="legend">{props.label}</FormLabel>

      <div>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                
                    name={props.name}
                    control={props.control}
                    render={({field}) => {
                    return (
                      <Checkbox
                        innerRef={field.ref}
                        ref={field.ref}
                        checked={selectedItems.includes(option.value)}
                        onChange={() => handleSelect(option.value)}
                      />
                    );
                  }}
                  
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </div>
    </FormControl>
  );
});

<FormControlLabel
                                                control={
                                                  <Controller
                                                  
                                                      name={props.name}
                                                      control={props.control}
                                                      render={({field}) => {
                                                      return (
                                                        <TextField
                                                          ref={field.ref}
                                                          name={'name'}
                                                          value={values.name}
                                                          
                                                        />
                                                      );
                                                    } }
                                                  
                                                  />
                                                 }
                                                
                                              />