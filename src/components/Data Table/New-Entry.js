import React, { useEffect, useState } from "react";
import { Container, Card, CardHeader, Paper, CardContent } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import axioxInstance from "../../axois";
import { NewEntryFinal } from "./skeleton-Entry";
import Header from "../Header";
import { useSelector } from "react-redux";
const baseURL = "deleteField/";

// import { useParams } from 'react-router';

export function NewEntry({ onChange }) {
  const listname = useSelector((state) => state.customization.group_list);
  // const navigate = useNavigate();
  const [appState, setAppState] = useState({
    loading: true,
    cols: null,
    data: null,
    listHistory: null,
  });

  const PostLoadingComponent = ({ isLoading, ...props }) => {
    if (!appState.loading) {
      return (
        <>
          <Header
            listname={props.listHistory}
            group={listname["group"]}
            select="newEntry"
            isList={true}
          />
          <NewEntryFinal
            data={props.cols}
            fieldData={props.data}
            onChange={onChange}
          />
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
    axioxInstance
      .get(baseURL.concat(listname["list"] + "/"))
      .then((res) => {
        const allCols = res.data;
        axioxInstance
          .get(`allLists/${listname["list"]}/`)
          .then((ress) => {
            // setAppState({listHistory:[res.data],})
            localStorage.removeItem("listname");
            localStorage.setItem("listname", JSON.stringify(ress.data));
            setAppState({
              loading: false,
              cols: allCols,
              data: null,
              listHistory: [ress.data],
            });
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  }, [setAppState, listname]);

  return (
    <div className="App">
      <PostLoadingComponent
        isLoading={appState.loading}
        cols={appState.cols}
        data={appState.data}
        listHistory={appState.listHistory}
      />
    </div>
  );
}
