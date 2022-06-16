import React from "react";
import { Outlet } from "react-router-dom"
import BackgroundImag from '../assets/LoginSign-up Page43/4.svg'
import { styled } from "@material-ui/styles";


const MyComponent = styled('div')({
    //   backgroundColor:'red'
    backgroundImage: `url(${BackgroundImag})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '100vw',
    height: '100vh'
});

export const AuthenticationContainer = () => (
    <MyComponent>
        <Outlet />
    </MyComponent>
)