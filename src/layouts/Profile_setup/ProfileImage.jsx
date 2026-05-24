import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import GenerateImage from "../../utils/GenerateImage";

export default function Profile_Image({ user,userProfile, step }) {

  const fileRef = useRef();

  const [editingImage, setEditingImage] = useState(null);
  const [finalImage, setFinalImage] = useState(null);

  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback(
    (croppedArea, croppedPixels) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setEditingImage(imageUrl);

  };


  const getCroppedImg = async () => {

  const imageObj = new Image();

  imageObj.src = editingImage;

  await new Promise((resolve) => {
    imageObj.onload = resolve;
  });

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  ctx.drawImage(
    imageObj,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  return canvas.toDataURL("image/jpeg");

};

  return (

    <section className="w-full max-w-2xl">
      <div>

        <p
          className="text-sm font-normal tracking-tight"
          style={{ fontFamily: "Space Grotesk" }}
        >
          Nice to meet you, 
          
        </p>
          <h1
            className="text-4xl font-semibold tracking-tight"
            style={{ fontFamily: "Space Grotesk" }}
          >
            {user.fullName}
          </h1>

        <p className=" text-black/45 mt-2 text-sm">
          Upload a profile image or skip for now.
        </p>

      </div>
      
        {/* <button className="w-full text-sm  text-black/40 text-right  hover:text-black  transition " >
          Skip for now
        </button> */}

      <div className="mt-14 flex flex-col items-center">
        

        <div className=" relative w-40 h-40 rounded-full overflow-hidden  bg-black/5 " >
          {
            finalImage && !editingImage && (
              <img src={finalImage} alt="Profile" className="w-full h-full object-cover" />
            )
          }
          {
            editingImage && (
              <Cropper image={editingImage} crop={crop} zoom={zoom} aspect={1} cropShape="round" showGrid={false} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
            )
          }
          {
            !editingImage && !finalImage && (

              <div onClick={() => { setFinalImage(null); setEditingImage(null); setZoom(1); setCrop({x:0, y:0 }); fileRef.current.click();  }} 
                    className=" w-full h-full flex flex-col items-center justify-center border-2  border-dashed  border-black/15 rounded-full  hover:border-black transition">
                <span className="text-3xl"> + </span>
                <span className="text-sm text-black/40 mt-3"> Upload Photo </span>
              </div>

            )
          }
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} className="hidden" />

        </div>

        {
          editingImage && (

            <>
              <div className="w-72 mt-8">
                <input type="range" min={1} max={3} step={0.1} value={zoom} onChange={(e) => setZoom(e.target.value)} className="w-full" />
              </div>


              <div className="flex items-center gap-3 mt-6">
                <button onClick={() => { setEditingImage(null); setZoom(1);}}
                        className=" px-5 h-10 rounded-xl border  border-black/10  bg-white text-sm  hover:border-black transition ">
                        Cancel
                </button>

                <button onClick={async () => { const croppedImage = await getCroppedImg(); 
                setFinalImage(croppedImage); 
                console.log("Image", croppedImage);
                userProfile({
                    ...user,
                    profileImgId:{
                        type: "uploaded",
                        image: croppedImage,
                    },
                });
                setEditingImage(null); }}
                        className=" px-5 h-10 rounded-xl  bg-black  text-white text-sm hover:opacity-90 transition">
                        Use Photo
                </button>


              </div>
            </>

          )
        }

        {
          finalImage && !editingImage && (

            <button onClick={() => fileRef.current.click()}
                    className=" mt-6 text-sm  text-black/50  hover:text-black transition">
                     Change Photo
            </button>

          )
        }


      </div>


      <div className="relative flex-col mt-14 flex items-center">

        {/* BUTTONS */}
        <div className="w-full flex items-center justify-between">

          <button
            onClick={() => step(1)}
            className="
              px-6
              h-8
              rounded-lg
              border
              border-black/10
              bg-white
              text-xs
              hover:border-black
              transition
            "
          >
            Back
          </button>

          {
            finalImage ? (
                <button
                    onClick={() => step(3)}
                    className="px-6 h-8 rounded-lg bg-black text-xs text-white hover:opacity-90 transition "
                >
                    Next
                </button>
            ) : (
                <button
                    onClick={() => {
                        const generated = GenerateImage(user.fullName);
                        console.log(generated);
                        
                        userProfile({
                            ...user,
                            profileImgId:generated,
                        });

                        step(3);
                     }}
                    className="
                        text-xs
                        underline
                        underline-offset-4
                        text-black/50
                        hover:text-black
                        transition
                    "
                    >
                    Skip Image
                    </button>

            )
          }

        
        </div>

        {/* DOTS */}
        <div className="flex mt-16 items-center gap-2">

          <div className="w-2 h-2 rounded-full bg-black/15"></div>

          <div className="w-8 h-2 rounded-full bg-black"></div>

          <div className="w-2 h-2 rounded-full bg-black/15"></div>

        </div>

      </div>

    </section>

  );

}