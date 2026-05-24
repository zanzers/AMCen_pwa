export default function GenerateImage(fullName = "") {

  const colors = [
    "#F87171",
    "#FB923C",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#22C55E",
  ];

  const cleanedName = fullName
    .trim()
    .replace(/\s+/g, " ");

  const parts = cleanedName.split(" ");

  const firstInitial =
    parts[0]?.charAt(0).toUpperCase() || "";

  const lastInitial =
    parts.length > 1
      ? parts[parts.length - 1]
          .charAt(0)
          .toUpperCase()
      : "";

  const initials =
    `${firstInitial}${lastInitial}`;

  const randomColor =
    colors[Math.floor(Math.random() * colors.length)];

  return {
    fullName: cleanedName,
    initials,
    background: randomColor,
  };

}