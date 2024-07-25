import * as React from "react";

interface SVGComponentProps extends React.SVGProps<SVGSVGElement> {}

const NavigationIcon: React.FC<SVGComponentProps> = (props) => (
  <svg
    width="20px"
    height="20px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="inline-block"
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#000000"
        fillRule="evenodd"
        d="M14.78 1.22a.75.75 0 01.148.851l-5.921 12.5a.75.75 0 01-1.406-.14L6.395 9.606 1.568 8.4a.75.75 0 01-.14-1.406l12.5-5.92a.75.75 0 01.852.147zM3.965 7.452l3.23.807a.75.75 0 01.546.546l.807 3.23 4.125-8.708-8.708 4.125z"
        clipRule="evenodd"
      />
    </g>
  </svg>
);

export default NavigationIcon;
