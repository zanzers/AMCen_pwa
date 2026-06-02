import { API_URL } from "../../../../../api/api";

// REQUEST MATERIALS AND PRINTERS
export async function RequestData(action, payload={}) {

  console.log("RequestData called with:", { action, payload });

    try{
        const res = await fetch(
            API_URL, {
                method: "POST",
                body: JSON.stringify({
                    action,
                    ...payload
                }),
            });
        if(!res.ok)throw new Error(`API request failed with status ${res.status}`);
        return await res.json();

    } catch (error) {
        console.error("Error fetching API data:", error);
        return null;
    }
}



export async function handleSaveRequest({ uploadedFile, selectedMaterial, quantity, setLoading, navigate }) {
  try {
    if (!uploadedFile) {
      alert("Please upload STL file");
      return null;
    }
    if (!selectedMaterial) {
      alert("Please select material");
      return null;
    }

    setLoading(true);

    const session = JSON.parse(sessionStorage.getItem("amcen_user")) || {};
    const token = session.token;
    if (!token) throw new Error("Not authenticated");

    const base64 = await fileToBase64(uploadedFile);

    const payload = {
      action: "uploadSTLFile",
      token,
      fileName: uploadedFile.name,
      mimeType: uploadedFile.type,
      base64,
      materialId: selectedMaterial,
      quantity,
    };

    console.log("Saving request:", payload);

    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log("Saved:", data);

    if (!res.ok || !data.success) {
      throw new Error(data.message || `Upload failed: ${res.status}`);
    }
    
    
    if (navigate) {
      navigate(`/checkout/${data.orderId}`);
    }

    alert("Request Saved");
    return data;
  } catch (err) {
    console.error(err);
    alert(err?.message || "An error occurred");
    return null;
  } finally {
    setLoading(false);
  }
}


async function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result);
    reader.onerror = reject;
  });
}





// discount : 0
// estimatedCost: 127.19101444625805
// estimatedHours: 2.1198502407709676
// fileName: "Arcle.stl"
// grandTotal: 187.19101444625807
// material: "TPU"
// materialCost: 60
// orderId: "ORD-0018"
// printer: "Ender 3"
// quantity: 1
// subtotal: 187.19101444625807
// userName: "Nowell Saavedra"