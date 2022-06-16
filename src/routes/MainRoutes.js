import { NewListEntry } from "../components/Layout/New-List-Entry";
import { NewEntry } from "../components/Data Table/New-Entry";
import { LoadingGroups } from "../components/Entries List/Grops";
import { UserPermission } from "../components/Entries List/user-permission";
import MainLayout from './Customize_mainRoute';
import { NewGroupEntry } from '../components/Layout/New-Group';
import { ParseThrough } from '../components/Layout/Parse-Through';
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = (props) => {
    console.log("Checking the Main Routes.");
    return [
        {
            path: '',
            element:
                <>
                    <MainLayout listName={props.listname} />
                </>
            ,
            children: [
                {
                    path: '/new-entry/:list',
                    element: <NewEntry />
                },

                {
                    path: '/create-new-list/:group/:user',
                    element: <NewListEntry />
                },
                {
                    path: '/create-new-group',
                    element: <NewGroupEntry />
                },
                {
                    path: '/parser/parse-through',
                    element: <ParseThrough />
                },
                {
                    path: '/',
                    element: <LoadingGroups />
                },
                {
                    path: '/permission-edit/:grp/:userID',
                    element: <UserPermission />
                }
            ]
        }
    ]
}

export default MainRoutes;