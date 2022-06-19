import { useRoutes } from "react-router-dom";
import { useState, useEffect } from "react";

//   ROUTES
import AuthenticationRoutes from "./AuthenticationRoutes";
// import config from 'config';
import MainRoutes from "./MainRoutes";
import ListRoutes from "./listRoute";
// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  let initFields;

  if (localStorage.getItem("listname") === null) {
    initFields = {
      modelname: "ListName11",
      description: "Create New List!!",
      disable: true,
      icon: "PlaylistAddCheckCircleRounded",
      color: "#008672",
    };
  } else {
    initFields = JSON.parse(localStorage.getItem("listname"));
  }
  const [listname, setListName] = useState([initFields]);
  const ListNameChange = () => {
    console.log("dunckb");
  };
  useEffect(() => {
    ListNameChange();
  }, []);

  console.log("heyy Would this log?");
  return useRoutes(
    MainRoutes({ listname: listname, changeList: ListNameChange }).concat(
      AuthenticationRoutes(),
      ListRoutes({ listname: listname, changeList: ListNameChange })
    )
  );
}
