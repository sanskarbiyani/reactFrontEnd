import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import { Tooltip, TextField } from "@mui/material";
import { Container } from "@mui/material";
import ListAlt from "@mui/icons-material/ListAlt";
import makeStyles from "@mui/styles/makeStyles";
import { useState } from "react";
import Box from "@mui/material/Box";
import PopOverMenu from "./ControlFields/Color Picker/PopOverMenu";
import TransitionsModal from "../components/Header/Share";

//import GetNewItem from './GetNewItem'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "0.01%",
    paddingTop: "-0%", // 16:9
  },
}));

const Content = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  console.log(props.data);

  // function to handle modal open
  const handleOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      className={classes.root}
      sx={{
        backgroundColor: "background.default",
        py: -1,
        border: 5,
      }}
      borderBottom={1}
    >
      <Container maxWidth={false}>
        <Grid container spacing={0} direction="column">
          <Grid item></Grid>
          <Grid item>
            <AppBar position="static" color="default" elevation={0}>
              <Toolbar style={{ marginTop: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item />
                  <Grid item />

                  <Grid item>
                    <div className="login-badges">
                      {badgeMenu.map((item, i) => {
                        return (
                          <PopOverMenu
                            key={i}
                            icon={item.icon}
                            where={"header"}
                            menu={item.menu}
                          />
                        );
                      })}
                    </div>
                  </Grid>
                  <Grid item>
                    <Tooltip
                      title={"props.listName.description"}
                      placement="right-start"
                      arrow
                    >
                      <TextField
                        value={props.data[0]["modelname"]}
                        disabled={false}
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item xs />
                  <Grid item>
                    <Grid item style={{ marginRight: 25, marginLeft: 25 }}>
                      <TransitionsModal listname={"props.listName.modelname"} />
                    </Grid>
                  </Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
let badgeMenu = [
  {
    icon: <ListAlt style={{ fontSize: 40 }} />,
    menu: [
      {
        name: "good first issue",
        color: "#7057ff",
        description: "Good for newcomers",
      },
      {
        name: "help wanted",
        color: "#008672",
        description: "Extra attention is needed",
      },
      {
        name: "priority: critical",
        color: "#b60205",
        description: "",
      },
      {
        name: "priority: high",
        color: "#d93f0b",
        description: "",
      },
      {
        name: "priority: low",
        color: "#0e8a16",
        description: "",
      },
      {
        name: "priority: medium",
        color: "#fbca04",
        description: "",
      },
      {
        name: "status: can't reproduce",
        color: "#fec1c1",
        description: "",
      },
      {
        name: "status: confirmed",
        color: "#215cea",
        description: "",
      },
      {
        name: "status: duplicate",
        color: "#cfd3d7",
        description: "This issue or pull request already exists",
      },
      {
        name: "status: needs information",
        color: "#fef2c0",
        description: "",
      },
      {
        name: "status: wont do/fix",
        color: "#eeeeee",
        description: "This will not be worked on",
      },
      {
        name: "type: bug",
        color: "#d73a4a",
        description: "Something isn't working",
      },
      {
        name: "type: discussion",
        color: "#d4c5f9",
        description: "",
      },
      {
        name: "type: documentation",
        color: "#006b75",
        description: "",
      },
      {
        name: "type: enhancement",
        color: "#84b6eb",
        description: "",
      },
      {
        name: "type: epic",
        color: "#3e4b9e",
        description: "A theme of work that contain sub-tasks",
      },
      {
        name: "type: feature request",
        color: "#fbca04",
        description: "New feature or request",
      },
      {
        name: "type: question",
        color: "#d876e3",
        description: "Further information is requested",
      },
    ],
  },
];

export default Content;
