import { useNavigate } from "react-router-dom";
import {useState} from "react";
import { RequestData } from "../sections/RequestComponents/services/RequestServices";
import LoaderBar from "../../../utils/loaderBar";

import {RequestSubmitted, RequestNoData} from "../sections/RequestComponents/RequestSubmitted";

export default function Checkout() {

  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [loading, setLoading] = useState(false);
  const [submissionStep, setSubmissionStep] = useState(null);


  const checkoutData =
    JSON.parse(
      sessionStorage.getItem(
        "checkout_data"
      )
    );

  async function handleSubmitRequest() {

    try {
      setLoading(true);
      setSubmissionStep("uploading");

      const session = JSON.parse(localStorage.getItem( "amcen_user")) || {};
      const token = session.token;

      if (!token) {
        alert("Unauthorized");
        return;
      }

      // First upload the STL file (returns orderId), then save order details (invoice)
      const uploadPayload = {
        token,
        fileName: checkoutData.fileName,
        mimeType: checkoutData.mimeType,
        base64: checkoutData.base64,
        materialId: checkoutData.materialId,
        quantity: checkoutData.quantity,
      };

      const uploadResp = await RequestData("uploadSTLFile", uploadPayload);
      console.log("Upload response:", uploadResp);

      if (!uploadResp?.success) {
        throw new Error(uploadResp?.message || "Failed to upload STL file");
      }
      // mark generation step (server may return orderId immediately but we show the step)
      setSubmissionStep("generating");
      const orderId = uploadResp.orderId;

      setSubmissionStep("submitting");
      const response = await RequestData("saveOrderDetails", { token, orderId, ...checkoutData });

      console.log("Invoice Saved:", response);

      if (!response?.success) {
        throw new Error(response?.message || "Failed to submit request");
      }

      setSubmitted(true);
      sessionStorage.removeItem("checkout_data");

      let seconds = 5;
      setCountdown(seconds);
      const intervalId = setInterval(() => {
        seconds--;
        setCountdown(seconds);

        if (seconds <= 0) {
          clearInterval(intervalId);
          sessionStorage.setItem("activeTab", "Orders");
          navigate("/user/Dashboard/");
        }
      }, 1000);

    } catch (err) {

      console.error(err);

      alert(err.message);
      setSubmissionStep(null);
      setLoading(false);
      return;
    }
    finally {
      // ensure loading is cleared if submission completed (submitted state will keep buttons disabled)
      setLoading(false);
    }
  }

  if (submitted) {
    return <RequestSubmitted countdown={countdown} />;
  } else if (!checkoutData) {
    return <RequestNoData />;
  }


  return (
    <div className="max-w-3xl mx-auto p-6">

      <LoaderBar open={loading} step={submissionStep} />

      <h1 className=" text-3xl font-semibold mb-6">
        Checkout
      </h1>

      <div className="border rounded-xl p-6 space-y-4">
        
        <div className="flex justify-between">
          <span>
            User Name
          </span>
          <span>
            {checkoutData.userName}
          </span>
        </div>


        <div className="flex justify-between">
          <span>
            File Name
          </span>
          <span>
            {checkoutData.fileName}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>
            Printer
          </span>
          <span>
            {checkoutData.printerName}
          </span>
        </div>


        <div className="flex justify-between">
          <span>
            Material
          </span>

          <span>
            {checkoutData.materialName}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Quantity
          </span>

          <span>
            {checkoutData.quantity}
          </span>

        </div>

        <div className="border-t pt-4 space-y-2">

          <div className="flex justify-between">

            <span>
              Initial Time
            </span>

            <span>
              {checkoutData
                .estimatedHours
                .toFixed(2)} hrs
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Initial Cost
            </span>

            <span>
              ₱
              {checkoutData
                .estimatedCost
                .toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              Print Cost
            </span>

            <span>
              ₱
              {checkoutData
                .materialCost
                .toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">

            <span>
              SubTotal
            </span>

            <span>
              ₱{checkoutData.subTotal.toFixed(2)}
            </span>

          </div>

          <div className="flex justify-between">
            <span>
              Discount
            </span>
            <span>
              ₱{checkoutData.discount.toFixed(2)}
            </span>
          </div>

          <div className=" flex justify-between text-xl font-semibold">
            <span>
              Grand Total
            </span>

            <span>
              ₱
              {checkoutData
                .grandTotal
                .toFixed(2)}
            </span>

          </div>

        </div>


        <div className="mt-4 p-3 rounded-lg border bg-yellow-50 text-[14px] text-yellow-800">
          <p className="font-medium mb-1">
            Note
          </p>

            <p>
              The estimated time and cost shown
              are only initial estimates based
              on the uploaded STL model size.
              Final pricing and print duration
              may change after staff review,
              slicing configuration, material
              usage, and printer time.
            </p>

        </div>

      </div>

      {submitted && (
        <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div>
              <p className="font-semibold text-green-900">Request Submitted Successfully!</p>
              <p className="text-sm text-green-700">Redirecting in {countdown}...</p>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded-lg" disabled={submitted || loading}>
          Back
        </button>
        <button onClick={handleSubmitRequest} className="px-4 py-2 bg-black text-white rounded-lg disabled:opacity-50" disabled={submitted || loading}>
          {submitted ? "Submitted" : loading ? "Submitting..." : "Submit Request"}
        </button>
      </div>

    </div>
  );
}