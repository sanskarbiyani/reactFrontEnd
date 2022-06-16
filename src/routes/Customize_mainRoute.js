import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import ChatFAB from '../components/Chat/FloatingIcon';

const MainLayout = (props) => {
    console.log(props)
    console.log("Rendering Till here");
    return (
        <>
            <Header listName={props.listName} isList={false} select='dashboard' />
            <Outlet context={"Hello"} />
            <ChatFAB />
        </>
    );
};

export default MainLayout;