import { cn } from "@/utils/cn";
import {
  Children,
  cloneElement,
  createContext,
  HTMLAttributes,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { ButtonGruopItemProps } from "../ButtonGroupItem/ButtonGruopItem";

type ButtonGroupContextType = {
  count: number;
};

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(
  undefined
);

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  error?: string;
}

export default function ButtonGroup({
  children,
  className,
  error,
  ...props
}: ButtonGroupProps) {
  const count = useMemo(() => {
    return Children.count(children);
  }, [children]);
  return (
    <ButtonGroupContext.Provider value={{ count }}>
      <div className="flex flex-col">
        <div
          className={cn("inline-flex rounded-md shadow-xs", className)}
          {...props}
        >
          {children &&
            Children.map(children, (child, index) => {
              const parseChild = child as ReactElement<ButtonGruopItemProps>;
              return cloneElement(parseChild, {
                index: index + 1,
                ...parseChild.props,
              });
            })}
        </div>
        <p className="text-red-500">{error}</p>
      </div>
    </ButtonGroupContext.Provider>
  );
}

export function useButtonGroup() {
  const context = useContext(ButtonGroupContext);
  if (!context) {
    throw new Error("useButtonGroup must be used within a ButtonGroup");
  }
  return context;
}
