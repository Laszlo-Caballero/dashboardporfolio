import { cn } from "@/utils/cn";
import {
  ButtonHTMLAttributes,
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import { useButtonGroup } from "../ButtonGroup/ButtonGroup";

export interface ButtonGruopItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  index?: number;
}

export default function ButtonGruopItem({
  icon,
  className,
  children,
  index,
  ...props
}: ButtonGruopItemProps) {
  const { count } = useButtonGroup();

  return (
    <button
      className={cn(
        "inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white",
        index == 1 && "rounded-s-lg",
        index == count && "rounded-e-lg",
        className
      )}
      {...props}
    >
      {isValidElement(icon) &&
        cloneElement(icon as ReactElement<HTMLDivElement>, {
          ...(icon as ReactElement<HTMLDivElement>).props,
          className: cn(
            "w-3 h-3 me-2",
            (icon as ReactElement<HTMLDivElement>).props.className
          ),
        })}
      {children}
    </button>
  );
}
