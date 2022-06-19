import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import { Grid, Typography, Button, Box, Container } from "@mui/material";
import { ReadMore } from "@mui/icons-material";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";

// import Share_Icon from  '../../assets/Gallery Icons/SHARE LOGO.svg'
// import ShareWith from './Share-shareWith';
// import AddMemeber from './Share-addMember'
// import { useForm } from 'react-hook-form';
// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// function getFullName(params) {
//   return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
// }

const lightColor = "rgba(255, 255, 255, 255)";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    width: "auto",
  },
  paper: {
    backgroundColor: "black",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 1, 3),
  },
  secondaryBar: {
    zIndex: 0,
    background: lightColor,
    color: theme.palette,
    border: 0,
    borderRadius: 3,
    borderBottom: "1px solid #e8e8e8",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.common.black,

    minWidth: 40,
    "&:hover": {
      color: theme.palette.error.main,
      boxShadow: 2,
      //  text-shadow: .1em .1em .2em rgba(0, 0, 0, 0.6),
    },
  },
  tab: {
    marginBottom: 0,
    textColor: theme.palette.error.main,

    indicator: theme.palette.error.main,
    "& .MuiTabs-indicator": {
      backgroundColor: theme.palette.error.main,
    },
  },
  button: {
    borderColor: lightColor,
  },
  hov: {
    margin: theme.spacing(0),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${index}`}
      aria-labelledby={`${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

//   const grant = [
//     {
//         value:'edit',
//         label: 'Editor'
//     },
//     {
//         value:"view",
//         label:"Viewer"
//     },
// ]

const columns = [
  { field: "column", headerName: "Columns", width: 140 },
  { field: "count", headerName: "Total Count", width: 130 },
  { field: "sum", headerName: "Sum", width: 130 },
  { field: "mean", headerName: "Average", width: 130 },

  { field: "minimum", headerName: "Minimum", width: 130 },
  { field: "maximum", headerName: "Maximum", width: 130 },
];

//   const rows = [

//   ];
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  // bgcolor: 'background.paper',
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function ReportShare(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("share");
  // const [newCopyLinkValue, setNewCopyLinkValue] = React.useState("Copy Link");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (event, newValue) => {
  //   const oldvalue = value;
  //   console.log(value, newValue);
  //   setValue(newValue);
  //   if (newValue === "Copy Link") {
  //     setNewCopyLinkValue("Link Copied");
  //     setValue(oldvalue);
  //   }
  //   if (newValue === "Link Copied") {
  //     setNewCopyLinkValue("Copy Link");
  //     setValue(oldvalue);
  //   }
  // };

  return (
    <div>
      <Button onClick={handleOpen}>
        <ReadMore />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={{
          width: "auto",
        }}
      >
        <Fade in={open} style={{ borderRadius: "2%", width: 900, padding: 16 }}>
          <div className={classes.paper} sx={style}>
            <Typography
              variant="h4"
              style={{
                fontFamily: "sans-serif",
                fontWeight: "bold",
                marginBottom: 10,
              }}
            >
              Report
            </Typography>
            <Grid container>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid rows={props.cols} columns={columns} />
              </div>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
