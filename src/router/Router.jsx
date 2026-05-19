import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import  Upload from "../pages/uploads/Upload";

export default function Router() {

    return (
        <BrowserRouter>
        
            <Routes>

                <Route
                path="/"
                element={<Login />}
                />

                <Route
                path="/register"
                element={<Register />}
                />

                <Route
                path="/upload"
                element={<Upload />}
                />

            </Routes>

        
        </BrowserRouter>
    )
}

