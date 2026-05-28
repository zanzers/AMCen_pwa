import { API_URL } from "../../../../../api/api";

// REQUEST MATERIALS AND PRINTERS
export async function RequestData(action="getProductionData", payload={}) {

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

    const session = JSON.parse(localStorage.getItem("amcen_user")) || {};
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