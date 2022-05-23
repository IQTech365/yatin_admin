import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import MainLayout from "../layout/MainLayout";
import HomePage from "../pages/home/HomePage";
import MembersPage from "../pages/members/MembersPage";
import SignInPage from "../pages/signin/SignInPage";
import Error404Page from "../pages/404/404Page";
import MediaLinkPage from "../pages/media-link/MediaLinkPage";
import MediaPageNew from "../pages/media/MediaPage_New";
import PaymentRequestPage2 from "../pages/payment/PaymentRequestPage2";


import RouteKeys from "./RouteKeys";
import ManageGiftCategory from "../pages/manage-gift-category/ManageGiftCategory";
import CreateGiftCategory from "../pages/manage-gift-category/CreateGiftCategory/CreateGiftCategory";
import ManageAddGift from "../pages/manage-add-gift/ManageAddGift";
import AddGift from "../pages/manage-add-gift/AddGift/AddGift";

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
          path: RouteKeys.manageGift,
          element: isAuth ? <ManageGiftCategory /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.createGiftCategory,
          element: isAuth ? <CreateGiftCategory /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.manageAddGift,
          element: isAuth ? <ManageAddGift /> : <Navigate to={RouteKeys.signin} />,
        },
        {
          path: RouteKeys.addGift,
          element: isAuth ? <AddGift /> : <Navigate to={RouteKeys.signin} />,
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
