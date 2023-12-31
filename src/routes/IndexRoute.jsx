import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/accounts/LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DoorPage from "../pages/door/DoorPage.jsx";
import IndexPage from "../pages/index/IndexPage.jsx";
import ErrorPage from "../pages/error/ErrorPage.jsx";
import AdminPage from "../pages/admin/AdminPage.jsx";
import ContentPage from "../pages/cms/ContentPage.jsx";
import BoardPage from "../pages/cms/BoardPage.jsx";
import ProfilePage from "../pages/accounts/ProfilePage.jsx";


const IndexRoute = () => {
    return (
        <Routes
        >

            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <IndexPage/>
                    </PrivateRoute>
                }
            />

            <Route
                path=""
                element={<div>zzzzzz</div>}
                exact
            />
            <Route
                path="/login"
                element={<LoginPage/>}
                exact
            />

            <Route
                path="/door"
                element={
                    <PrivateRoute>
                        <DoorPage></DoorPage>
                    </PrivateRoute>
                }
            />

            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <ProfilePage></ProfilePage>
                    </PrivateRoute>
                }
            />


            <Route
                path="/admin"
                element={
                    <PrivateRoute>
                        <AdminPage/>
                    </PrivateRoute>
                }
            />


            <Route
                path="/content/:content"
                element={
                    <PrivateRoute>
                        <ContentPage/>
                    </PrivateRoute>
                }
            />

            {/*임시 보드 페이지*/}
            <Route
                path="/board/:board/"
                element={
                    <PrivateRoute>
                        <BoardPage />
                    </PrivateRoute>
                }
            />


            <Route
                path="*"
                element={<ErrorPage/>}
            />
        </Routes>
    )
}

export default IndexRoute;
