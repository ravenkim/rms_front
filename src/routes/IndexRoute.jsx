import {Route, Routes} from "react-router-dom";
import LoginPage from "../pages/accounts/LoginPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import DoorPage from "../pages/door/DoorPage.jsx";
import IndexPage from "../pages/index/IndexPage.jsx";
import ErrorPage from "../pages/error/ErrorPage.jsx";


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
                path="*"
                element={<ErrorPage/>}
            />
        </Routes>
    )
}

export default IndexRoute;
