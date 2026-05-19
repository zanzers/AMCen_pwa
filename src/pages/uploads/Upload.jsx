import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../api/api";

export default function Upload(){

  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const user = JSON.parse(localStorage.getItem("amcen_user"));

  useEffect(() =>{
    if(!user){
      navigate("/")
    }
  }, []);

  const uploadFile = async () =>{

    if(!file){
      alert("Select STL file");
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {

      try{
        const res = await fetch(

          API_URL,
          {
            method: "POST",
            headers:{
              "Content-Type": "text/plain;charset=utf-8",

            },
              body: JSON.stringify({
              action: "uploadFile",
              token: user.token,
              fileName: file.name,
              mimeType: file.type,
              base64: reader.result
            }),
          }
        );

        const data = await res.json();
        console.log(data);
        alert(JSON.stringify(data));
      } catch(err){
        console.error(err);
      }
    }
  }

  return (
      <div className="p-10">

        <h1 className="text-3xl font-bold mb-6">
          Upload STL
        </h1>

        <input
          type="file"
          accept=".stl"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        <button
          onClick={uploadFile}
          className="
            block
            mt-4
            bg-black
            text-white
            px-4
            py-2
            rounded
          "
        >
          Upload
        </button>

      </div>
    );

  }