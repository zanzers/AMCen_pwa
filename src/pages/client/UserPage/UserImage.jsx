

export default function UserImage({ profileImgId, img_width, img_height, text_size }) {
  const parseDimension = (value, fallback) => {
    if (value == null || value === "") return fallback;
    if (typeof value === "number") return value;
    if (/^\d+$/.test(value)) return Number(value);
    return value;
  };

  let profileData = null;

  try {
    profileData = typeof profileImgId === "string" ? JSON.parse(profileImgId) : profileImgId;
  } catch (error) {
    console.error("Error parsing profileImgId:", error);
  }

  const widthValue = parseDimension(img_width, 136);
  const heightValue = parseDimension(img_height, 136);
  const textSizeValue = parseDimension(text_size, 40);

  console.log("Parsed profileData:", profileData, widthValue, heightValue, textSizeValue);

  const isGeneratedAvatar = profileData?.initials && profileData?.background;
  const isUploadedAvatar = profileData?.type === "uploaded" && profileData?.image;

  return (
    <div
      className="flex items-center justify-center rounded-full overflow-hidden bg-gray-200 text-4xl font-bold text-white"
      style={{ width: widthValue, height: heightValue }}
    >
      {isGeneratedAvatar ? (
        <div
          className="flex h-full w-full items-center justify-center rounded-full font-bold text-white"
          style={{ backgroundColor: profileData.background, fontSize: textSizeValue }}
        >
          {profileData.initials}
        </div>
      ) : isUploadedAvatar ? (
        <img
          src={profileData.image}
          alt="Profile"
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-full bg-slate-300 text-slate-700"
          style={{ fontSize: textSizeValue }}
        >
          {profileData?.fullName?.charAt(0).toUpperCase() || "?"}
        </div>
      )}
    </div>
  );
}
