import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from "react";
import { Link } from "react-router";

interface AsideLinkProps extends PropsWithChildren {
  to: string;
  icon: ReactNode;
}

export default function AsideLink({ icon, to, children }: AsideLinkProps) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {isValidElement(icon) &&
          cloneElement(icon as ReactElement<HTMLDivElement>, {
            className:
              "w-6 h-6 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white",
          })}
        <span className="ml-3">{children}</span>
      </Link>
    </li>
  );
}
