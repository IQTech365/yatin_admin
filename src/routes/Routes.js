import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import MediaPage from "../pages/media/MediaPage";
import MembersPage from "../pages/members/MembersPage";
import SignInPage from "../pages/signin/SignInPage";
import Error404Page from "../pages/404/404Page";
import PaymentRequestPage from "../pages/payment/PaymentRequestPage";
import MediaLinkPage from "../pages/media-link/MediaLinkPage";
import MediaPageNew from "../pages/media/MediaPage_New";
import PaymentRequestPage2 from "../pages/payment/PaymentRequestPage2";


import RouteKeys from "./RouteKeys";

const Routes = (props) => {
  const { isAuth } = props;
  const routes = [
    {
      path: RouteKeys.root,
      element: isAuth ? <DashboardLayout /> : <MainLayout />,
      children: [
        {
          path: RouteKeys.root,
          element: isAuth ? (
            <Navigate to={RouteKeys.home} />
          ) : (
            <Navigate to={RouteKeys.signin} />
          ),
        },
        {
          path: RouteKeys.signin,
          element: !isAuth ? <SignInPage /> : <Navigate to={RouteKeys.root} />,
        },
        {
          path: RouteKeys.home,
          element: isAuth ? <HomePage /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.members,
          element: isAuth ? <MembersPage /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.media,
          element: isAuth ? <MediaPageNew /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.mediaLink,
          element: isAuth ? <MediaLinkPage /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.payment,
          element: <PaymentRequestPage2 />,
        },
        {
          path: RouteKeys['404'],
          element: <Error404Page />,
        },
        {
          path: '*',
          element: <Navigate to={RouteKeys['404']} />
        }
      ],
    },
  ];

  const router = useRoutes(routes);

  return <>{router}</>;
};

export default Routes;
