import { DeleteOrder, CancelOrder } from "./OrderCRUD";
import { useNavigate } from "react-router-dom";

export default function CrudButtons({ order, invoice }) {
   const navigate = useNavigate();
  const hasInvoice = invoice?.hasInvoice;

  console.log("CrudButtons - Order:", order);
  console.log("CrudButtons - Invoice:", invoice);

  return (
    <div className="flex gap-2">

      {!hasInvoice && (
        <>
        <button onClick={() => DeleteOrder(order, navigate)} className="px-4 py-2 border border-red-500 text-red-500 rounded-lg"> Delete </button>
        </>
      )}

      {hasInvoice && invoice.status === "Pending" && (
          <button onClick={() => CancelOrder(order, navigate)} className="px-4 py-2 bg-red-500 text-white rounded-lg"> Cancel Request </button>
      )}

    </div>
  );
}