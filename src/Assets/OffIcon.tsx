import { FC, SVGProps } from "react";
export const OffIcon: FC<SVGProps<SVGSVGElement>> = ({ ...props }) => (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.5 4.742a13 13 0 11-13 0M16 3v10"
    />
  </svg>
);
