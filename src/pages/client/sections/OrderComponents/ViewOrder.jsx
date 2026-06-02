import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";



import { RequestData } from "../RequestComponents/services/RequestServices";
import CrudButtons from "./services/CrudButtons";


export default function ViewOrder() {

  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      setLoading(true);
      setError(null);

      const session = JSON.parse(localStorage.getItem("amcen_user")) || {};
      const data = await RequestData(
          "getOrderDetails",
          {
            token: session.token,
            orderId,
          }
        );

      if (data?.success) {
        setOrder(data.order);
        setInvoice(data.invoice);
      } else {
        setError("Unable to load order details.");
      }

      setLoading(false);
    }

    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex min-h-60 items-center justify-center rounded-3xl p-8 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">Loading order details...</p>
          <p className="text-sm text-gray-500">Please wait while we load your order.</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex min-h-60s-center justify-center rounded-3xl p-8 text-center">
        <div>
          <p className="text-lg font-semibold mb-2">Order not found</p>
          <p className="text-sm text-gray-500">{error || "The requested order could not be loaded."}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-900"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

    console.log("Order:", order);
    console.log("Invoice:", invoice);



  return (

    <div className="max-w-4xl mx-auto space-y-6">

      <div>
        <button
          className="flex items-center gap-2 text-gray-500"
          onClick={() => {navigate(-1);}}>
          <ArrowLeft size={18} />
        </button>

        <h1 className="text-3xl font-semibold">
          Order Details
        </h1>

        <p className="text-gray-500">
          {order.orderId}
        </p>

          <CrudButtons order={order} invoice={invoice} />

      </div>


      <div className="border rounded-xl p-6">

        <h2 className="font-semibold mb-4">
          Print Information
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <Info
            label="File Name"
            value={order.fileName}
          />

          <Info
            label="Material"
            value={order.material}
          />

          <Info
            label="Printer"
            value={order.printer}
          />

          <Info
            label="Quantity"
            value={order.quantity}
          />

          <Info
            label="Status"
            value={order.status}
          />

        </div>

      </div>

    {invoice && (
        <div className="border rounded-xl p-6">

            <h2 className="font-semibold mb-4">
            Cost Summary
            </h2>

            <div className="space-y-2">

            <div className="flex justify-between">
                <span>Estimated Time</span>
                <span>{invoice.estimatedHours} hrs</span>
            </div>

            <div className="flex justify-between">
                <span>Estimated Cost</span>
                <span>₱{invoice.estimatedCost}</span>
            </div>

            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₱{invoice.subTotal}</span>
            </div>

            <div className="flex justify-between">
                <span>Discount</span>
                <span>₱{invoice.discount}</span>
            </div>

            <div className="flex justify-between font-semibold">
                <span>Grand Total</span>
                <span>₱{invoice.grandTotal}</span>
            </div>

            </div>

        </div>
        )}

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-medium">
        {value}
      </p>
    </div>
  );
}


