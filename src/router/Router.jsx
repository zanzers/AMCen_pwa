import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Upload from "../pages/uploads/Upload";
import Checkout from "../pages/client/tabs/Checkout";
import ViewOrders from "../pages/client/sections/OrderComponents/ViewOrder";
import ViewEvents from "../pages/client/sections/EventsComponents/ViewEvent";   
import ConsultationForm from "../pages/client/sections/EventsComponents/ConsulataionForm";
import  UserPage from "../pages/client/UserPage/UserPage";  


export default function Router() {

    return (
        <BrowserRouter>
        
            <Routes>

                <Route path="/" element={<Login />}/>

                <Route path="/register" element={<Register />}/>

                <Route path="/upload" element={<Upload />}/>

                <Route path="/checkout/:orderId" element={<Checkout />}/>

                <Route path="/user/orders/:orderId" element={<ViewOrders />}/>

                <Route path="/user/events/:eventId" element={<ViewEvents />}/>

                <Route path="/user/events/consultationForm/:userId" element={<ConsultationForm />}/>
                
                <Route path="/user/profile/:userId" element={<UserPage />}/>

            </Routes>

        
        </BrowserRouter>
    )
}


