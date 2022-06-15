import { useRoutes } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
// routes
// import MainRoutes from './MainRoutes';
import AuthenticationRoutes from "./AuthenticationRoutes";
// import config from 'config';
import MainRoutes from "./MainRoutes";
import ListRoutes from "./listRoute";
// ==============================|| ROUTING RENDER ||============================== //
import axios from "axios";
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
  const [count, setCount] = useState(0);
  const ListNameChange = () => {
    console.log("dunckb");
  };

  useEffect(() => {
    ListNameChange();
  }, []);

  return useRoutes(
    MainRoutes({ listname: listname, changeList: ListNameChange }).concat(
      AuthenticationRoutes(),
      ListRoutes({ listname: listname, changeList: ListNameChange })
    )
  );
}
