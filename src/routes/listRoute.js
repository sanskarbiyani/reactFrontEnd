import Dashboard from "../components/dashboard/main-dashboard";
import { DisplayDataEntry } from "../components/Data Table/list-data"; 
import { NewEntry } from "../components/Data Table/New-Entry";
import { UpdateEntry } from "../components/Data Table/Update-Enrey";
import { DisplaylogEnties } from '../components/Data Table/views/log-entries';
import DeleteDialog from '../components/Data Table/delete-record';
import { ListRouteContainer } from "./Customize_listRoute";


// ==============================|| MAIN ROUTING ||============================== //


const ListRoutes = (props) => [
    {
    path: '/list',
    element: <ListRouteContainer />,    
    children: [
        {
            path: 'display-list-data',
            element: <DisplayDataEntry listName={'props.listname'} onChangeList={props.changeList} />
        },
        {
            path: 'list-dashboard',
            element: <Dashboard />
        },
        {
            path:'delete-record/:id',
            element: <DeleteDialog />
        },
        {
            path: 'update/:list/:id',
            element: <UpdateEntry />
        },
        {
            path:'log-entries',
            element : <DisplaylogEnties/>
        },
        {
            path: 'new-entry',
            element: <NewEntry />
        },
    ]}
]

export default ListRoutes;
