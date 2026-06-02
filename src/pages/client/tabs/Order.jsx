import { useEffect, useState } from "react";
import { RequestData } from "../sections/RequestComponents/services/RequestServices";

import OrderList from "../sections/OrderComponents/OrderList";

export default function Order({ setActivateTab }) {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Requests");
  const statusArray = ["Pending","Approved","Printing","Pickup Ready","Completed","Canceled"];
  

  useEffect(() => {

    async function fetchOrders() {

      setLoading(true);

      const session = JSON.parse(localStorage.getItem("amcen_user"));

      const data = await RequestData(
          "getUserOrders",
          {
            token: session.token,
            userId: session.user.userId,
          }
        );

      console.log(
        "ORDERS Data:",
        data
      );

      if (!data?.success) {
        setOrders([]);
        setLoading(false);

        return;
      }

      setOrders( data.orders || []);
      setLoading(false);
    }

    fetchOrders();

  }, []);

  const filteredOrders = orders.filter((order) => {

      switch (activeTab){
         case statusArray[2]:
          return [ statusArray[2],statusArray[3],].includes(order.status);
         case statusArray[4]:
          return [ statusArray[4]].includes(order.status);
         case statusArray[5]:
          return [statusArray[5],].includes(order.status);

        default:
          return [ statusArray[0],statusArray[1],].includes(order.status);
        
      }
    });

  return (

    <div className="space-y-4">

      <h1 className="text-3xl font-semibold">
        My Orders
      </h1>

      <div className="flex justify-center mb-6">

        <button onClick={() => setActiveTab( "Requests")}
          className={` px-6 py-3 font-medium border-b-2 transition-all duration-200
            ${ activeTab === "Requests" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>
          Requests
        </button>

        <button onClick={() => setActiveTab("Printing")}
          className={` px-6 py-3 font-medium border-b-2 transition-all duration-200
            ${ activeTab ==="Printing" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>
          Printing
        </button>

        <button onClick={() => setActiveTab("Completed")}
          className={` px-6 py-3 font-medium border-b-2 transition-all duration-200
            ${activeTab ==="Completed"  ? "border-black text-black"  : "border-transparent text-gray-500 hover:text-black"}`}>
          Completed
        </button>

        <button onClick={() => setActiveTab("Canceled")}
          className={` px-6 py-3 font-medium border-b-2 transition-all duration-200
            ${ activeTab === "Canceled" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"}`}>
          Canceled
        </button>

      </div>

      {orders.length === 0 ? (
        loading ? (

          <div className="p-10 text-center">
            <p className="text-lg font-semibold mb-2">
              Loading orders...
            </p>
            <p className="text-sm text-gray-500">
              Please wait while we
              fetch your orders.
            </p>
          </div>

        ) : (

          <div className="p-10 text-center">
            <p className="text-xl font-semibold mb-3">
              No requests found
            </p>
            <p className="text-gray-600 mb-6">
              You haven't submitted
              any print requests yet.
            </p>

            <button
              onClick={() =>
                setActivateTab?.(
                  "Request"
                )
              }
              className="
                text-black
                hover:underline
              "
            >
              Create Request
            </button>

          </div>

        )

      ) : filteredOrders.length === 0 ? (

        <div className="p-10 text-center">

          <p className="text-gray-500">
            No requests found in
            this category.
          </p>

        </div>

      ) : (

        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <OrderList
            orders={filteredOrders}
          />
        </div>

      )}

    </div>
  );
}