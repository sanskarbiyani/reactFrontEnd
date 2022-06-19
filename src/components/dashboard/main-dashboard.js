import { List, Box, Container, Grid } from "@mui/material";
import Fields from "../Layout/Fields";
import Addcolums from "../Layout/Add-Colums";
import { useState } from "react";
import { useEffect } from "react";
import RenderDataTypeComponent from "../Layout/RenderDataTypeComponent";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axois";
import { SnackbarProvider, useSnackbar } from "notistack";
import Header from "../Header";
import { useSelector } from "react-redux";

const baseURL = "deleteField/";

function Dashboard() {
  const listname = useSelector((state) => state.customization.group_list);
  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  let initFields;
  if (localStorage.getItem("fields") === null) {
    initFields = [];
  } else {
    initFields = JSON.parse(localStorage.getItem("fields"));
  }

  const onDelete = (choice) => {
    setFields(
      fields.filter((e) => {
        return e.name !== choice;
      })
    );
    localStorage.setItem("choices", JSON.stringify(fields));
    axiosInstance
      .delete(baseURL.concat(listname["list"] + "/" + choice + "/"))
      .then((res) => {
        enqueueSnackbar(res.data, {
          variant: "error",
        });
      })
      .catch((e) => {
        enqueueSnackbar(e, {
          variant: "error",
        });
      });
  };

  const addFields = (obj) => {
    // let sno;
    // if (fields.length === 0) {
    //   sno = 0;
    // } else {
    //   sno = fields[fields.length - 1].sno + 1;
    // }

    const myFields = {
      ...JSON.parse(obj),
    };

    setFields([...fields, myFields]);
    dataType.type = "";
    setDataType({
      ...dataType,
    });
    // window.location.reload()
    // console.log(fields);
  };

  const [listHistory, setListHistory] = useState([
    JSON.parse(localStorage.getItem("listname")),
  ]);

  const [fields, setFields] = useState(initFields);
  useEffect(() => {
    axiosInstance.get(baseURL.concat(listname["list"] + "/")).then((res) => {
      const allFields = res.data;
      localStorage.setItem("fields", JSON.stringify(allFields));
    });

    axiosInstance
      .get(`allLists/${listname["list"]}/`)
      .then((res) => {
        setListHistory([res.data]);
        localStorage.removeItem("listname");
        localStorage.setItem("listname", JSON.stringify(res.data));
      })
      .catch((e) => {
        console.error(e);
        navigate("/");
      });
  }, [listname, navigate]);

  const [dataType, setDataType] = useState({
    type: "",
  });

  const onSelect = (ID) => {
    dataType.type = ID;
    setDataType({
      ...dataType,
    });
  };
  return (
    <>
      <Header
        listname={listHistory}
        group={listname["group"]}
        select="overview"
        isList={true}
      />
      <SnackbarProvider maxSnack={3}>
        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={1}>
              <Grid
                item
                lg={3}
                md={6}
                xl={3}
                xs={12}
                style={{ borderLeftColor: "lightpink", border: 4 }}
              >
                <List>
                  <Fields fields={fields} onDelete={onDelete} />
                </List>
              </Grid>

              <Grid item lg={3} md={6} xl={3} xs={12}>
                <Addcolums addFields={addFields} onSelect={onSelect} />
              </Grid>

              <Grid item lg={6} md={8} xl={6} xs={12}>
                <RenderDataTypeComponent
                  onSubmiting={addFields}
                  datatypeID={dataType.type}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </SnackbarProvider>
    </>
  );
}
export default Dashboard;
