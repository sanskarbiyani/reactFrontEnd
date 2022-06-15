import { lazy } from "react";

// project imports

// import HeaderSecondary from './components/Header-Secondary'
import { createTheme } from "@material-ui/core";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { NewListEntry } from "../components/Layout/New-List-Entry";
import Dashboard from "../components/dashboard/main-dashboard";
import { DisplayDataEntry } from "../components/Data Table/list-data";
// import {Gallery} from './components/Data Table/views/Gallery-view'
import { NewEntry } from "../components/Data Table/New-Entry";
import { LoadingGroups } from "../components/Entries List/Grops";
import { UserPermission } from "../components/Entries List/user-permission";
import { UpdateEntry } from "../components/Data Table/Update-Enrey";
import { Outlet } from "react-router-dom";
import Header from "./listLayout";
import { DisplaylogEnties } from "../components/Data Table/views/log-entries";
import DeleteDialog from "../components/Data Table/delete-record";
import ChatFAB from "../components/Chat/FloatingIcon";

// ==============================|| MAIN ROUTING ||============================== //

const ListRoutes = (props) => [
  {
    path: "/recruitmentPortalFrontend",
    element: (
      <>
        <Header />
        {/* <Outlet /> */}
        <ChatFAB />
      </>
    ),
    children: [
      {
        path: "/display-list-data",
        element: (
          <DisplayDataEntry
            listName={"props.listname"}
            onChangeList={props.changeList}
          />
        ),
      },
      {
        path: "/list-dashboard",
        element: <Dashboard />,
      },
      {
        path: "/delete-record/:id",
        element: <DeleteDialog />,
      },
      {
        path: "/update/:list/:id",
        element: <UpdateEntry />,
      },
      {
        path: "/log-entries",
        element: <DisplaylogEnties />,
      },
      {
        path: "/new-entry",
        element: <NewEntry />,
      },
    ],
  },
];

export default ListRoutes;
