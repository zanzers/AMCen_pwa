import {useState} from "react";
import Lines from "../../../components/svg_components/Lines";
import RequestSetting from "../sections/RequestSections/RequestSetting";
import UploadRequest from "../sections/RequestSections/UploadRequest";


export default function Request() {

    
    const [modelData, setModelData] = useState(null);
    const [uploadedFile, setUploadedFile] = useState(null);
  return (
    <div className="w-full">

      {/* HEADER */}
      <div className="mb-8 mt-8">

        <div className="flex items-center gap-3">
         <Lines />
          <h1
            className="
              text-4xl
              tracking-wide
              font-semibold
              uppercase
              Doto
            "
          >
            Request
          </h1>

        </div>

        

      </div>



      <div className="grid grid-cols-[1.4fr_0.8fr] gap-6">

        <UploadRequest setModelData={setModelData} setUploadedFile={setUploadedFile} />
        
        <RequestSetting uploadedFile={uploadedFile} modelData={modelData} />

        

      </div>

    </div>
  );
}