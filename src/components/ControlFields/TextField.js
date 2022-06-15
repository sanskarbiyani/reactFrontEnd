import React from "react";
import TextField from "@mui/material/TextField";

export const Input = React.forwardRef((props, ref) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      ref={ref}
      inputRef={ref}
      fullWidth
      {...props}
    />
   
  );
});