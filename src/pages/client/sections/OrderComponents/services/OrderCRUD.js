import { RequestData } from "../../RequestComponents/services/RequestServices";


export async function DeleteOrder(order, navigate) {

  const confirmed = window.confirm(
    `Delete ${order.fileName}?`
  );

  if (!confirmed) return;

  const session = JSON.parse(localStorage.getItem("amcen_user")) || {};

  console.log("Session Delete", session.token);

  const result = await RequestData(
    "deleteOrder",
    {
      token: session.token,
      orderId: order.orderId,
    }
  );
  console.log("Delete Result", result);

  if (result?.success) {
    alert("Order deleted", result);
    navigate(-1);
  }

}

export async function CancelOrder(order, navigate) {

  const confirmed = window.confirm( "Cancel this request?");

  if (!confirmed) return;

  const session = JSON.parse(localStorage.getItem("amcen_user")) || {};

  const result =
    await RequestData(
      "cancelOrder",
      {
        token: session.token,
        orderId: order.orderId,
      }
    );

  console.log(
    "Cancel Result:",
    result
  );

  if (result?.success) {

    alert(
      "Request cancelled"
    );

    navigate(-1);
  }
}