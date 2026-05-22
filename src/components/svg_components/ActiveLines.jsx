export default function ActiveLines({active}) {
  return (
<svg width="222" height="300" viewBox="0 0 198 294" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
<path d="M0 78.9726H39" stroke={active ? "#FF3B30" : "#D9D9D9"} strokeWidth="6"/>
<path d="M33 78.5H66.5L185 1.5H198" stroke={active ? "#FF3B30" : "#D9D9D9"} strokeWidth="3"/>



<path d="M0 216.027H39" stroke="#D9D9D9" strokeWidth="6"/>
<path d="M33 215.5H66.5L185 292.5H198" stroke="#D9D9D9" strokeWidth="3"/>

</svg>

  );
}

