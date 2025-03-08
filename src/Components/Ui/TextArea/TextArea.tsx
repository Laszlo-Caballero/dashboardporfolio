import { cn } from "@/utils/cn";
import { forwardRef, TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  htmlFor?: string;
  error?: string;
  className?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ error, label, htmlFor, className, ...props }, ref) => {
    return (
      <div className={cn("w-full", className)}>
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <textarea
          id={htmlFor}
          ref={ref}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          {...props}
        ></textarea>

        <p className="text-red-500 text-sm">{error}</p>
      </div>
    );
  }
);
