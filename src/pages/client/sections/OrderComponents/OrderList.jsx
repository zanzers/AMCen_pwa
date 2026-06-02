import { useNavigate } from "react-router-dom";

export default function OrderList({ orders }) {

  const navigate = useNavigate();

  function getStatusStyle(status) {

    switch (status) {

      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Approved":
        return "bg-blue-100 text-blue-800";

      case "Printing":
        return "bg-purple-100 text-purple-800";

      case "Pickup Ready":
        return "bg-green-100 text-green-800";

      case "Completed":
        return "bg-green-100 text-green-800";

      case "Canceled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  return (
    <>
      {orders.map((order) => (

        <div className="border rounded-xl p-4 space-y-4"
          key={order.orderId}>
          <div className="flex justify-between items-start">

            <div>

              <h2 className="font-semibold text-lg">
                {order.fileName}
              </h2>

              <p className="text-sm text-gray-500">
                {order.orderId}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}>
              {order.status}
            </span>

          </div>

          <div className="text-sm text-gray-500">
            Created:{" "}{order.createdAt.split("T")[0]}
          </div>

          <button onClick={() => {sessionStorage.setItem( "activeTab", "Orders");
              navigate( `/user/orders/${order.orderId}`);}}
            className=" w-full border rounded-lg py-2 hover:bg-gray-50">
            View Details
          </button>

        </div>

      ))}
    </>
  );
}