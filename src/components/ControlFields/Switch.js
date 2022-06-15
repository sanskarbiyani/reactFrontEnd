import React, {
  
} from "react";
import PropTypes from 'prop-types';
import { Controller } from "react-hook-form";
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import { styled} from '@mui/styles'
import { Switch, FormGroup } from "@mui/material";
import { purple } from '@mui/material/colors';

const IOSSwitch = withStyles(theme => ({
root: {
  width: 48,
  height: 24,
  padding: 0,
  margin: theme.spacing(1),
},
switchBase: {
  padding: 2,
  '&$checked': {
    transform: 'translateX(25px)',
    color: theme.palette.common.white,
    '& + $track': {
      backgroundColor: '#52d869',
      opacity: 1,
      border: 'none',
    },
  },
  '&$focusVisible $thumb': {
    color: '#52d869',
    border: '6px solid #fff',
  },
},
thumb: {
  width: 20,
  height: 20,
},
track: {
  borderRadius: 26 / 2,
  border: `1px solid ${theme.palette.grey[400]}`,
  backgroundColor: theme.palette.grey[50],
  opacity: 1,
  transition: theme.transitions.create(['background-color', 'border']),
},
checked: {},
focusVisible: {},
}))(({ classes, ...props }) => {
return (
  <Switch
    focusVisibleClassName={classes.focusVisible}
    disableRipple
    classes={{
      root: classes.root,
      switchBase: classes.switchBase,
      thumb: classes.thumb,
      track: classes.track,
      checked: classes.checked,
    }}
    {...props}
  />
);
});



export const  SwitchCustom = React.forwardRef( (props,ref)  => {


return (
  <FormGroup>
    <Controller
    {...props}
    render={({ field }) => (
      
      <IOSSwitch
        
        ref={field.ref}
        innerRef={field.ref}
        inputRef={field.ref}
        onChange={(e) => field.onChange(e.target.checked)}
        checked={field.value}
      />
    )}
  />
  </FormGroup>
);

});

