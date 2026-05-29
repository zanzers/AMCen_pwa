import { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { RequestData, handleSaveRequest } from "./services/RequestServices";
import {RoundUp} from "../../../../utils/helpers";


export default function RequestSetting({ uploadedFile, modelData }) {


  const [catalog, setCatalog] = useState({ printers: [], materials: [] });
  const [formData, setFormData] = useState({selectedPrinter: "", selectedMaterial: "", quantity: 1, discount: 0,});
  const [loading, setLoading] = useState(false);  

  const estimatedHours = useMemo(() => RoundUp(modelData?.estimatedHours || 0 ),[modelData?.estimatedHours]);
  const estimatedCost = useMemo(() => RoundUp(modelData?.estimatedCost || 0), [modelData?.estimatedCost]);


  useEffect(() => {
    const fetchData = async () => {
      const data = await RequestData("getProductionData");
      if (!data) return;
      
      setCatalog({
        printers: data.printers || [],
        materials: data.materials || [],
      });
    };

    fetchData();
  }, []);


  const selectedMaterialData = useMemo(
    () =>
      catalog.materials.find(
        (m) => String(m.materialId) === String(formData.selectedMaterial)
      ),
    [catalog.materials, formData.selectedMaterial]
  );

  const materialCost = useMemo(() => Number(selectedMaterialData?.cost || 0), [selectedMaterialData]);
  
  const pricing = useMemo(() => {
    const subtotal = RoundUp(materialCost + estimatedCost) * formData.quantity;
    const grandTotal = RoundUp(subtotal - formData.discount);
    return { subtotal, grandTotal };
  }, [materialCost, estimatedCost, formData.quantity, formData.discount]);

 
  const handleFormChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const navigate = useNavigate();

  const handleSave = useCallback(async () => {
    const result = await handleSaveRequest({
      uploadedFile,
      selectedMaterial: formData.selectedMaterial,
      quantity: formData.quantity,
      setLoading,
    });

    if (!result?.success) return;

    const session = JSON.parse(localStorage.getItem("amcen_user"));
    const checkoutData = buildCheckoutData(
      result,
      session,
      uploadedFile,
      formData,
      selectedMaterialData,
      estimatedHours,
      estimatedCost,
      materialCost,
      pricing
    );

    sessionStorage.setItem("checkout_data", JSON.stringify(checkoutData));
    navigate(`/checkout/${result.orderId}`);

}, [uploadedFile, formData, selectedMaterialData, estimatedHours, estimatedCost, materialCost, pricing, navigate]);

  return (
    <div className="border rounded-xl p-4">

      <h2 className="text-xl font-semibold mb-4">
        Request Setting
      </h2>

      <div className="mb-4">
        <label className="block mb-2">
          Printer
        </label>
        <select 
          className="w-full border rounded-lg p-2"
          value={formData.selectedPrinter}
          onChange={(e) => handleFormChange("selectedPrinter", e.target.value)}
        >
          <option value="">Select Printer</option>
          {catalog.printers.map((printer) => (
            <option key={printer.printerId} value={printer.Printer}>
              {printer.printer || printer.Printer}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Material
        </label>
        <select 
          className="w-full border rounded-lg p-2"
          value={formData.selectedMaterial}
          onChange={(e) => handleFormChange("selectedMaterial", e.target.value)}
        >
          <option value="">Select Material</option>
          {catalog.materials.map((material) => (
            <option key={material.materialId} value={material.materialId}>
              {material.materialName} - ₱{material.cost}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Quantity
        </label>
        <input 
          type="number" 
          min="1" 
          value={formData.quantity}
          onChange={(e) => handleFormChange("quantity", Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Discount
        </label>
        <input 
          type="number" 
          min="0" 
          value={formData.discount}
          onChange={(e) => handleFormChange("discount", Number(e.target.value))}
          className="w-full border rounded-lg p-2"
        />
      </div>

  
      <div className="border-t pt-4 space-y-2 mb-6">
        <div className="flex justify-between">
          <span>Estimated Time</span>
          <span>{estimatedHours.toFixed(2)} hrs</span>
        </div>

        <div className="flex justify-between">
          <span>Estimated Print Cost</span>
          <span>₱ {estimatedCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Material Cost</span>
          <span>₱ {materialCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₱ {pricing.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>
          <span>₱ {formData.discount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>Grand Total</span>
          <span>₱ {pricing.grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button 
          onClick={handleSave}
          disabled={loading}
          className="px-4 py-2 rounded-lg border disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save & Continue"}
        </button>
      </div>

    </div>
  );
}





const buildCheckoutData = (
  result,
  session,
  uploadedFile,
  formData,
  selectedMaterialData,
  estimatedHours,
  estimatedCost,
  materialCost,
  pricing
) => ({
  orderId: result.orderId,
  userID: result.userID,
  userName: session.user.fullName,
  fileName: uploadedFile.name,
  printer: formData.selectedPrinter,
  material: selectedMaterialData?.materialName,
  quantity: formData.quantity,
  estimatedHours,
  estimatedCost,
  materialCost,
  subTotal: pricing.subtotal,
  discount: formData.discount,
  grandTotal: pricing.grandTotal,
});



