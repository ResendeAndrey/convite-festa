import { cn } from "@/lib/utils"; // caso esteja usando uma função de merge de classNames como no Shadcn
import { Control, FieldValues, Path, useController } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps<T extends FieldValues> {
  label?: string;
  infoText?: string;
  error?: boolean;
  mask?: string;
  className?: string;
  placeholder?: string;
  fieldName: Path<T>;
  control: Control<T, unknown>

  type?: React.InputHTMLAttributes<HTMLInputElement>["type"]
}

export const Input = <T extends FieldValues>({
  label,
  infoText,
  error,
  className,
  mask,
  placeholder,
  fieldName,
  control,

  type = "text",
  ...rest
}: InputProps<T>) => {
  const { field } = useController({ control, name: fieldName });

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      {!mask ? (
        <input
          {...field}
          {...rest}
          id={fieldName}
          className={cn(
            "px-3 py-2 border rounded-md outline-none transition-colors",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className
          )}
          placeholder={placeholder}

          type={type}
        />

      ) : (
        <InputMask
          {...field}
          {...rest}
          mask={mask}
          placeholder={placeholder}
          className={cn(
            "px-3 py-2 border rounded-md outline-none transition-colors",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500",
            className
          )}


        />
      )}
      {infoText && (
        <span
          className={cn(
            "text-xs",
            error ? "text-red-500" : "text-gray-500"
          )}
        >
          {infoText}
        </span>
      )}
    </div>
  );
};
