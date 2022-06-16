import UserLogin from "../components/authentication/login";
import UserLogout from '../components/authentication/logout'
import ForgetPassowrd from "../components/authentication/forget-password";
import ForgetMailPassword from "../components/authentication/forget-password-mail";
import { UpdateFormEntry } from "../components/Data Table/mail-filled-form.";
import { AuthenticationContainer } from "./Customize_authenticationRoute";

const AuthenticationRoutes = () => {
    console.log("Inside authentication route.");
    let abcdef = [{
        path: '/authentication',
        element: <AuthenticationContainer />,
        children: [
            {
                path: 'login',
                element: <UserLogin />
            },
            {
                path: 'password-reset',
                element: <ForgetPassowrd />
            },
            {
                path: 'password-reset/mail',
                element: <ForgetMailPassword />
            },
            {
                path: 'logout',
                element: <UserLogout />

            },
            {
                path: 'form-reset/mail',
                element: <UpdateFormEntry />
            }

        ]
    }]
    console.log(abcdef);
    return abcdef;
};

export default AuthenticationRoutes;