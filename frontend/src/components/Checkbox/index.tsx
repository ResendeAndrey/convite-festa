import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="inline-flex items-center space-x-2 cursor-pointer select-none">
        <input
          type="checkbox"
          ref={ref}
          className={cn(
            "w-4 h-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500",
            className
          )}
          {...props}
        />
        {label && <span className="text-sm text-gray-800">{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";
