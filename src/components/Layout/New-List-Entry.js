import React, { useState, useEffect } from "react";
import {
  Card,
  Grid,
  Paper,
  Box,
  CardContent,
  Container,
  IconButton,
  ListItem,
  Icon,
} from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../ControlFields/Form";
import { useForm } from "react-hook-form";
import NewList from "../../assets/MakeAList.svg";
import { PrimaryButton } from "../ControlFields/SubmitButton";
import { Input } from "../ControlFields/TextField";
import { Navigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import CircleIcon from "@mui/icons-material/CheckCircle";
import axiosInstance from "../../axois";
import { useNavigate } from "react-router-dom";

const icons = [
  "ListAlt",
  "PlaylistAddCheckCircle",
  "PlaylistAddCheckCircleRounded",
  "AccessAlarms",
  "Timer",
  "MonetizationOn",
  "AccountBalanceWallet",
  "AddShoppingCart",
  "CreditScore",
  "AssignmentTurnedInSharp",
  "PendingActionsSharp",
  "TrackChanges",
  "WorkspacePremiumOutlined",
  "DateRangeSharp",
  "ScheduleSendSharp",
  "Upcoming",
  "EventBusySharp",
  "EventAvailableSharp",
  "People",
  "Groups",
  "FlashOn",
  "OfflineBolt",
  "TimelapseSharp",
  "BatchPredictionRounded",
  "PublicRounded",
  "LinkedIn",
  "Settings",
  "LaptopMacSharp",
  "PhoneIphone",
  "CheckCircleOutlineRounded",
  "ShoppingBagRounded",
  "LocalAtmRounded",
  "RequestQuoteRounded",
  "PriceChangeRounded",
  "AddBusinessRounded",
  "PlaylistRemoveRounded",
  "LeakRemoveSharp",
  "QrCodeScannerSharp",
  "IntegrationInstructionsSharp",
  "Campaign",
  "BusinessCenter",
  "Email",
  "HomeRounded",
  "CommuteRounded",
  "FlightSharp",
  "BadgeRounded",
  "EmojiEvents",
  "Calculate",
  "AlternateEmail",
  "ContactMail",
  "Google",
  "NaturePeople",
  "BarChart",
];
const baseURL = "registerModel/";
const schema = yup.object().shape({
  name: yup
    .string()
    //.matches(/^([^0-9]*)$/, "First name should not contain numbers")
    .required("First name is a required field"),
});

function importAll(r) {
  let images = {};
  r.keys().map((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
}

export const NewListEntry = ({ onChange }) => {
  // const history = useHistory();
  const { group, user } = useParams();
  const [colorsel, setColorVal] = useState(0);
  const [iconsel, setIconVal] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [data, setValues] = useState({
    name: "",
    description: "",
    icon: "ListAlt",
    color: "#7057ff",
  });
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { ...data },
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    console.log(JSON.stringify(data, null, 2));
    setValues(data);
    axiosInstance
      .post(baseURL, {
        modelname: data.name,
        description: data.description,
        color: data.color,
        icon: data.icon,
        created_by: user,
        group: group,
      })
      .then((response) => {
        // alert(response.data);
        enqueueSnackbar(response.data, {
          variant: "success",
        });
        localStorage.setItem("listname", JSON.stringify(data));
        // onChange({modelname:data.name,description:data.description,disable:false,color:data.color,icon:data.icon})
      })
      .catch((e) => {
        enqueueSnackbar("List Already Exists", {
          variant: "error",
        });
        // history.push('/');
      });
    // localStorage.setItem("fields", null);
    // localStorage.removeItem("fields");
    // history.push('/data/'+data.name)
  };

  useEffect(() => {
    localStorage.removeItem("listname");
    localStorage.setItem(
      "listname",
      JSON.stringify({
        modelname: "ListName",
        description: "Create New List!!",
        disable: true,
        color: "#878783",
      })
    );
  }, []);

  return (
    <Container maxWidth="xl">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Card elevation={0}>
          <Paper style={{ height: 550, overflow: "auto", border: 1 }}>
            <CardContent>
              <Grid
                container
                rowspacing={2}
                columnspacing={{ xs: 1, sm: 2, md: 1 }}
              >
                <Grid item xs={4}>
                  <IconButton size="large">
                    <img src={NewList} />
                  </IconButton>
                </Grid>
                <Grid item xs={6} style={{ marginTop: 70 }}>
                  <Grid
                    container
                    rowspacing={2}
                    columnspacing={{ xs: 0, sm: 0, md: 0 }}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Input
                        {...register("name")}
                        id="name"
                        type="text"
                        label="Name"
                        control={control}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        onChange={(e) => {
                          console.log(e);
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Input
                        {...register("description")}
                        id="description"
                        type="text"
                        label="Description"
                        multiline
                        rows={4}
                        control={control}
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Paper>
                        <Grid container>
                          {badgeMenu.map((item, i) => {
                            return (
                              <Grid item xs={4}>
                                <ListItem
                                  key={i}
                                  style={{ alignItems: "center" }}
                                  onClick={() => {
                                    setValue("color", item.color);
                                    setColorVal(i);
                                  }}
                                  selected={colorsel === i}
                                >
                                  <IconButton size="large">
                                    <CircleIcon
                                      style={{
                                        color: item.color,
                                        fontSize: 30,
                                      }}
                                    />
                                  </IconButton>
                                </ListItem>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper style={{ height: 420, overflow: "auto" }}>
                        <Grid container>
                          {icons.map((module, i) => {
                            return (
                              <Grid item xs={4}>
                                <ListItem
                                  key={i}
                                  style={{ alignItems: "center" }}
                                  onClick={() => {
                                    setValue("icon", module);
                                    setIconVal(i);
                                  }}
                                  selected={iconsel === i}
                                >
                                  <IconButton size="large">
                                    {/* <img src={module[1]}  width={30} height={30} style={{display:'flex', alignItems:'center'}}    /> */}
                                    <Icon
                                      component={MuiIcons[icons[i]]}
                                      style={{ width: 30, height: 30 }}
                                    ></Icon>
                                  </IconButton>
                                </ListItem>
                              </Grid>
                            );
                          })}
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Paper>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <Grid container direction="row-reverse" spacing={2}>
              <Grid item>
                <PrimaryButton
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    navigate(`/`);
                  }}
                >
                  Cancel
                </PrimaryButton>
              </Grid>
              <Grid item xs={3}>
                <PrimaryButton
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Create List
                </PrimaryButton>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Form>
    </Container>
  );
};

let badgeMenu = [
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
];
