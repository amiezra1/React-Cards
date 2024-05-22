import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/404/NotFoundPage";
import AboutUsPage from "../pages/About/AboutUsPage";
import CreatCardPage from "../pages/CreatCard/CreatCard";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import MyCards from "../pages/MyCards/MyCards";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import AdminGuard from "../guard/AdminGuard";
import Favorite from "../pages/Favorite/Favorite";
import LandingPage from "../pages/LandingPage/LandingPage";
import AdminCRM from "../sandbox/AdminCRM";
import NotReady from "../pages/NotReady/NotReady";
import ProfilePage from "../pages/UserProfile/ProfilePage";


const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.Route} element={<HomePage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={`${ROUTES.LANDINGPAGE}/:id`} element={<LandingPage />} />
      <Route
        path={ROUTES.FAVORITE}
        element={
          <AuthGuard>
            <Favorite />
          </AuthGuard>
        }
      />
      {/* TODO: The 'profile' page is not ready yet */}
      <Route
        path={ROUTES.EDITUSER}
        element={ 
          <ProfilePage/>
        }
      />

      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreatCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <BizGuard>
            <MyCards />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      {/* TODO: The CRM page is not ready yet */}
      <Route
        path={ROUTES.CRMSYSTEM}
        element={
          <AdminGuard>
            <AdminCRM />
          </AdminGuard>
        }
      />
      <Route
        path={ROUTES.PAGENOTREADY}
        element={
          <NotReady/>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
