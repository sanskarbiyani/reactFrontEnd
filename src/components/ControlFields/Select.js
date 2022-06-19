import React from "react";
import ImageIcon from "@mui/icons-material/Image";
import { Controller } from "react-hook-form";

import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
  Avatar,
} from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";
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
  formControl: {
    minWidth: 120,
    backgroundColor: "transparent",
  },
  Select: {
    textAlign: "center",
    textDecoration: "none",
  },
}));

export const SelectCustom = React.forwardRef((props, ref) => {
  // const styles = useStyles();
  const generateOptions = () => {
    return props.options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <Select
          fullWidth
          disabled={props.disable}
          innerRef={field.ref}
          variant={props.variant}
          onChange={field.onChange}
          value={field.value}
        >
          {generateOptions()}
        </Select>
      )}
    />
  );
});

export const SelectIconCustom = React.forwardRef((props, ref) => {
  const styles = useStyles();
  const generateOptions = () => {
    return props.countries.map((option) => {
      return (
        <MenuItem value={option.value} key={option.value}>
          <Chip
            avatar={
              <Avatar>
                <ImageIcon />
              </Avatar>
            }
            label={option.label}
            color="primary"
            size="small"
            variant={option.value}
          />
        </MenuItem>
      );
    });
  };
  return (
    <Controller
      {...props}
      render={({ field }) => (
        <FormControl className={styles.formControl} fullWidth>
          <InputLabel htmlFor="open-select" />
          <Select
            value={field.value}
            variant="outlined"
            onChange={field.onChange}
            inputProps={{
              id: "open-select",
            }}
          >
            {generateOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
});
