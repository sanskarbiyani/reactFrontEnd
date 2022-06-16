import React, { useState, useEffect } from "react";
import {
  Card,
  Paper,
  Box,
  CardContent,
  Container,
  CardHeader,
} from "@mui/material";
import axiosInstance from "../../../axois";
import { Form } from "../../ControlFields/Form";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
// import {  useParams  } from 'react-router-dom';
import Header from "../../Header";
import { DataGrid } from "@mui/x-data-grid";

// const baseURL = "deleteField/"

export function DisplaylogEnties({ onChange }) {
  // const { list,group } = useParams();
  const listname = useSelector((state) => state.customization.group_list);

  // const [open, setOpen] = React.useState(false);

  const [appState, setAppState] = useState({
    loading: true,
    cols: null,
    data: [],
    listHistory: null,
  });

  const PostLoadingComponent = ({ isLoading, ...props }) => {
    if (!appState.loading) {
      console.log(props);

      return (
        <>
          <Header
            listname={props.listHistory}
            group={listname["group"]}
            select="log"
            isList={true}
          />

          <Container maxWidth="xl">
            <Form>
              <Card elevation={0}>
                <Paper style={{ height: 700, overflow: "auto", border: 1 }}>
                  <CardContent>
                    <Box
                      sx={{
                        height: 660,
                        width: 1,
                        "& .super-app-theme--cell": {
                          backgroundColor: "rgba(224, 183, 60, 0.55)",
                          color: "#1a3e72",
                          fontWeight: "600",
                        },
                        "& .super-app.darkblue": {
                          backgroundColor: "#0070c0",
                          color: "#f5f5f5",
                          fontWeight: "600",
                        },
                        "& .super-app.lightblue": {
                          backgroundColor: "#00b0f0",
                          color: "#f5f5f5",
                          fontWeight: "600",
                        },
                        "& .super-app.orange": {
                          backgroundColor: "#ffc000",
                          color: "#212121",
                          fontWeight: "600",
                        },
                        "& .super-app.yellow": {
                          backgroundColor: "#feff00",
                          color: "#212121",
                          fontWeight: "600",
                        },
                        "& .super-app.lightgreen": {
                          backgroundColor: "#92d050",
                          color: "#f5f5f5",
                          fontWeight: "600",
                        },
                        "& .super-app.green": {
                          backgroundColor: "#00b050",
                          color: "#f5f5f5",
                          fontWeight: "600",
                        },
                        "& .super-app.lightred": {
                          backgroundColor: "#ef9a9a",
                          color: "#212121",
                          fontWeight: "600",
                        },
                        "& .super-app.red": {
                          backgroundColor: "#e53935",
                          color: "#f5f5f5",
                          fontWeight: "600",
                        },
                      }}
                    >
                      <DataGrid
                        rows={props.data}
                        columns={[
                          {
                            field: "action_time",
                            headerName: "Action Time",
                            flex: 1,
                            type: "dateTime",
                            valueGetter: ({ value }) =>
                              value && new Date(value),
                          },
                          {
                            field: "contenttype",
                            headerName: "Content Type",
                            flex: 2,
                          },
                          {
                            field: "actionflag",
                            headerName: "Action Flag",
                            flex: 0.5,
                          },
                          {
                            field: "user_name",
                            headerName: "User Name",
                            flex: 0.5,
                          },
                          {
                            field: "email",
                            headerName: "User Email",
                            flex: 0.5,
                          },
                        ]}
                        pageSize={100}
                        editMode="row"
                        initialState={{ pinnedColumns: { left: ["name"] } }}
                      />
                    </Box>
                  </CardContent>
                </Paper>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                ></Box>
              </Card>
            </Form>
          </Container>
        </>
      );
    }
    return (
      <Container maxWidth="lg">
        <Card elevation={0}>
          <CardHeader title={"Groups Loading"} />
          <Paper style={{ height: 470, overflow: "auto", border: 1 }}>
            <CardContent></CardContent>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Paper>
        </Card>
      </Container>
    );
  };

  useEffect(() => {
    axiosInstance.get(`logentries/${listname["list"]}`).then((res) => {
      const allData = res.data;
      axiosInstance
        .get(`allLists/${listname["list"]}/`)
        .then((ress) => {
          // setListHistory([ress.data])
          console.log(allData);
          console.log(ress.data);
          localStorage.removeItem("listname");
          localStorage.setItem("listname", JSON.stringify(ress.data));

          setAppState({
            loading: false,
            listHistory: [ress.data],
            data: [...allData],
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }, [setAppState]);
  return (
    <div className="App">
      <PostLoadingComponent
        isLoading={appState.loading}
        cols={appState.cols}
        data={appState.data}
        id={appState.id}
        listHistory={appState.listHistory}
      />
    </div>
  );
}
