import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const SVGComponent: React.FC<SVGComponentProps> = (props) => (
  <svg
    fill="#000000"
    height="167px"
    width="167px"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 404.258 404.258"
    xmlSpace="preserve"
    stroke="#000000"
    strokeWidth={12.12774}
    transform="rotate(0)"
    {...props} // Spreading the props for customization
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <polygon points="289.927,18 265.927,0 114.331,202.129 265.927,404.258 289.927,386.258 151.831,202.129 " />
    </g>
  </svg>
);

export default SVGComponent;
