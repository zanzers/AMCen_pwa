import { useEffect, useState } from "react";
import { RequestData, handleSaveRequest } from "./services/RequestServices";

export default function RequestSetting({ uploadedFile, modelData }) {

  const [printers, setPrinters] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);
  const estimatedHours = modelData?.estimatedHours || 0;
  const estimatedCost = modelData?.estimatedCost || 0;


  useEffect(() => {
    async function fetchData() {

      const data = await RequestData();
      if(!data) return;

      console.log("Fetched production data:", data);
      setPrinters(data.printers || []);
      setMaterials(data.materials || []);
    }

    fetchData();

  }, []);

  const selectedMaterialData = materials.find((m) => m.materialId == selectedMaterial);
  const materialCost = Number(selectedMaterialData?.cost || 0);
  const subtotal = (materialCost + estimatedCost) * quantity;
  const grandTotal = subtotal - discount;

  return (
    <div className="border rounded-xl p-4">

      <h2 className="text-xl font-semibold mb-4">
        Request Setting
      </h2>


      <div className="mb-4">
        <label className="block mb-2">
          Printer
        </label>
        <select className="w-full border rounded-lg p-2"
          value={selectedPrinter}
          onChange={(e) =>
            setSelectedPrinter(e.target.value)
          }
        >

          <option value="">
            Select Printer
          </option>

          {printers.map((printer) => (
            <option key={printer.printerId} value={printer.printerId}>
              {printer.printer || printer.Printer}
              {" - "}
              {printer.status || printer.Status}
            </option>
          ))}

        </select>
      </div>

   
      <div className="mb-4">
        <label className="block mb-2">
          Material
        </label>

        <select className="w-full border rounded-lg p-2"
          value={selectedMaterial}
          onChange={(e) =>
            setSelectedMaterial(e.target.value)}>

          <option value="">
            Select Material
          </option>

          {materials.map((material) => (
            <option key={material.materialId} value={material.materialId}>
              {material.materialName}
              {" - ₱"}
              {material.cost}
            </option>
          ))}

        </select>
      </div>

  
      <div className="mb-4">
        <label className="block mb-2">
          Quantity
        </label>

        <input type="number" min="1" value={quantity}
          onChange={(e) =>
            setQuantity(Number(e.target.value))
          }
          className="w-full border rounded-lg p-2"/>

      </div>

  
      <div className="mb-4">
        <label className="block mb-2">
          Discount
        </label>

        <input type="number" min="0" value={discount}
          onChange={(e) =>
            setDiscount(Number(e.target.value))
          }
          className="w-full border rounded-lg p-2"/>
      </div>

  
      <div className="border-t pt-4 space-y-2 mb-6">
        <div className="flex justify-between">
          <span>
            Estimated Time
          </span>

          <span>
            {estimatedHours.toFixed(2)} hrs
          </span>

        </div>

        <div className="flex justify-between">
          <span>
            Estimated Print Cost
          </span>
          <span>
            ₱ {estimatedCost.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Material Cost
          </span>
          <span>
            ₱ {materialCost.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Subtotal
          </span>
          <span>
            ₱ {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>
            Discount
          </span>

          <span>
            ₱ {discount.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between text-lg font-semibold">
          <span>
            Grand Total
          </span>
          <span>
            ₱ {grandTotal.toFixed(2)}
          </span>
        </div>
      </div>


      <div className="flex gap-3">
        <button onClick={() =>
            handleSaveRequest({
              uploadedFile,
              selectedMaterial,
              quantity,
              setLoading,
            })
          }
          disabled={loading}
          className=" px-4 py-2 rounded-lg bg-black text-white">
          {loading  ? "Saving..."  : "Save"}
        </button>

        <button onClick={() =>
            handleSaveRequest({
              uploadedFile,
              selectedMaterial,
              quantity,
              setLoading,
            })
          }
          disabled={loading}
          className=" px-4 py-2 rounded-lg border">
          Save & Continue
        </button>

      </div>

    </div>
  );
}

