import { cn } from "@/utils/cn";
import { forwardRef, InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, htmlFor, error, className, ...props }, ref) => {
    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          ref={ref}
          name={htmlFor}
          id={htmlFor}
          {...props}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }
);
