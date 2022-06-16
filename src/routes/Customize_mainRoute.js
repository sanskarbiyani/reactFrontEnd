<<<<<<< HEAD
import { useEffect, useState, useCallback } from 'react';
=======
>>>>>>> 3558d3c
import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import ChatFAB from '../components/Chat/FloatingIcon';

<<<<<<< HEAD

const MainLayout = (props) => {


    console.log(props)
    // Handle left drawer

    // useEffect(() => {
    //     dispatch({ type: SET_MENU, opened: !matchDownMd });
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [matchDownMd]);

    return (
        <>

            <Header listName={props.listName} isList={false} select='dashboard' />

            {/* main content */}

            {/* breadcrumb */}

            <Outlet context={"Hello"} />
            <ChatFAB />

=======
const MainLayout = (props) => {
    console.log(props)
    console.log("Rendering Till here");
    return (
        <>
            <Header listName={props.listName} isList={false} select='dashboard' />
            <Outlet context={"Hello"} />
            <ChatFAB />
>>>>>>> 3558d3c
        </>
    );
};

export default MainLayout;