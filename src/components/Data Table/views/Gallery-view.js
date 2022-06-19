import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import { CardHeader, Grid } from "@mui/material";
import { Chip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// import ReactDOM from "react-dom";
// import withStyles from '@mui/styles/withStyles';
// import Avatar from "@mui/material/Avatar";
// import CardMedia from "@mui/material/CardMedia";
// const faces = [
//   "http://i.pravatar.cc/300?img=1",
//   "http://i.pravatar.cc/300?img=2",
//   "http://i.pravatar.cc/300?img=3",
//   "http://i.pravatar.cc/300?img=4"
// ];
const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 30,
    maxWidth: 470,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  button: {
    borderRadius: "50",
    color: theme.palette.primary,
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: theme.spacing.unit * 3,
  },
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -theme.spacing.unit,
    },
  },
}));

export function Gallery() {
  const classes = useStyles();
  return (
    <div className="App">
      <Grid container>
        {[1, 2, 3, 4].map((num) => {
          return (
            <Grid item sm={4}>
              <Card className={classes.card}>
                <CardHeader
                  title={
                    <>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          <Typography variant="caption">Name </Typography>{" "}
                        </Grid>
                        <Grid item>
                          {" "}
                          <Typography variant="caption">
                            {" "}
                            Progress{" "}
                          </Typography>{" "}
                        </Grid>
                      </Grid>
                      <Grid container justifyContent="space-between">
                        <Grid item>
                          SnehalRaj Chough <LinkedInIcon />{" "}
                        </Grid>
                        <Grid item>
                          {" "}
                          <Chip color="secondary" label="Just Start" clickable>
                            {" "}
                            Just Start{" "}
                          </Chip>{" "}
                        </Grid>
                      </Grid>
                    </>
                  }
                  subheader="September 14, 2016"
                />
                <Divider light />
                <CardContent className={classes.content}>
                  <>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography variant="caption">Position </Typography>{" "}
                      </Grid>
                      <Grid item>
                        {" "}
                        <Typography variant="caption">
                          {" "}
                          Phone Screen Date{" "}
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography variant="h6"> Account Manager </Typography>{" "}
                      </Grid>
                      <Grid item>
                        {" "}
                        <Typography variant="h6"> 6 hours ago </Typography>{" "}
                      </Grid>
                    </Grid>

                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Typography variant="caption">Recruiter </Typography>{" "}
                      </Grid>
                      <Grid item>
                        {" "}
                        <Typography variant="caption"> Notes: </Typography>{" "}
                      </Grid>
                    </Grid>
                    <Grid container justifyContent="space-between">
                      <Grid item xs={6}>
                        <Typography variant="button">
                          fjsfsjkf Himanshu Chaudhari{" "}
                        </Typography>
                        <Typography variant="button">
                          {" "}
                          Prajakta Chaudhari{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {" "}
                        <Typography variant="body1" align="right">
                          {" "}
                          1 year of experience and many projects done in web
                          designing, good for marketing as well
                        </Typography>{" "}
                      </Grid>
                    </Grid>
                  </>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
