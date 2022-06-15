import UserLogin from "../components/authentication/login";
import UserLogout from "../components/authentication/logout";
import { Outlet } from "react-router-dom";
import ForgetPassowrd from "../components/authentication/forget-password";
import ForgetMailPassword from "../components/authentication/forget-password-mail";
import BackgroundImag from "../assets/LoginSign-up Page43/4.svg";
import { styled } from "@material-ui/styles";
import { UpdateFormEntry } from "../components/Data Table/mail-filled-form.";
const MyComponent = styled("div")({
  //   backgroundColor:'red'
  backgroundImage: `url(${BackgroundImag})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  height: "100vh",
});
const AuthenticationRoutes = () => [
  {
    path: "/recruitmentPortalFrontend",
    element: (
      <MyComponent>
        <Outlet />
      </MyComponent>
    ),
    children: [
      {
        path: "/login",
        element: <UserLogin />,
      },
      {
        path: "/password-reset",
        element: <ForgetPassowrd />,
      },
      {
        path: "/password-reset/mail",
        element: <ForgetMailPassword />,
      },
      {
        path: "/logout",
        element: <UserLogout />,
      },
      {
        path: "/form-reset/mail",
        element: <UpdateFormEntry />,
      },
    ],
  },
];

export default AuthenticationRoutes;
