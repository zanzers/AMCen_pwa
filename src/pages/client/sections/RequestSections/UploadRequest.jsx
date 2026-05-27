import { STLLoader } from "three/examples/jsm/loaders/STLLoader";


export default function UploadSection({ setModelData, setUploadedFile }) {

  async function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const { width, height, depth } = await parseSTLDimensions(file);
    const { estimatedHours, estimatedCost } = calculateSTLEstimation({ width, height, depth });
    const modelData = { fileName: file.name, width, height, depth, estimatedHours, estimatedCost };

    console.log(modelData);
    setModelData(modelData);
    setUploadedFile(file);
  }

  return (
    <div className="border rounded-xl p-4">

      <h2 className="text-xl font-semibold mb-4">
        Upload STL
      </h2>

      <input
        type="file"
        accept=".stl"
        onChange={handleFileUpload}
      />

    </div>
  );
}




// FUNCTIONS USED BY UPLOADSECTION

async function parseSTLDimensions(file) {
  const arrayBuffer = await file.arrayBuffer();
  const loader = new STLLoader();
  const geometry = loader.parse(arrayBuffer);
  geometry.computeBoundingBox();
  const box = geometry.boundingBox;
  const width = box.max.x - box.min.x;
  const height = box.max.y - box.min.y;
  const depth = box.max.z - box.min.z;

  return { width, height, depth };
}



function calculateSTLEstimation({ width, height, depth }) {

  const volumeFactor = width * height * depth;
  const normalizedVolume = Math.cbrt(volumeFactor);
  const estimatedHours = Math.min( 72, Math.max(1, normalizedVolume * 2));

  const hourlyRate = 60;

  const estimatedCost =
    estimatedHours * hourlyRate;

  return {
    estimatedHours,
    estimatedCost,
  };
}