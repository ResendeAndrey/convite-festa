import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded  disabled:opacity-50 disabled:cursor-not-allowed transition w-full flex items-center justify-center",
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
