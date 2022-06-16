import React from "react";
import { styled } from "@material-ui/styles";
import ChatFAB from '../components/Chat/FloatingIcon';
import Header from './listLayout';
import { Outlet } from "react-router-dom";

const MyComponent = styled('div')({
    //   backgroundColor:'red'
    width: '100vw',
    height: '100vh'
});

export const ListRouteContainer = () => (
    <MyComponent>
        <Header />
        <ChatFAB />
    </MyComponent>
)