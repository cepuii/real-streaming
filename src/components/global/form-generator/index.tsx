import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "select" | "input" | "textarea";
  options?: { value: string; label: string; id: string }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

const FormGenerator = ({
  errors,
  inputType,
  name,
  placeholder,
  register,
  label,
  lines,
  options,
  type,
}: Props) => {
  switch (inputType) {
    case "input":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9d9d9d]"
          htmlFor={`input-${label}`}
        >
          {label && label}
          <Input
            id={`input-${label}`}
            type={type}
            placeholder={placeholder}
            className="bg-transparent border-gray-400 text-[#707070]"
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "select":
      return (
        <Label
          className="flex flex-col gap-2 text-[#9d9d9d]"
          htmlFor={`select-${label}`}
        >
          {label && label}
          <select
            id={`select-${label}`}
            className="w-full bg-transparent border-[1px] p-3 rounded-lg"
            {...register(name)}
          />
          {options?.length &&
            options.map((option) => (
              <option
                key={option.id}
                value={option.value}
                className="dark:bg-muted"
              >
                {option.label}
              </option>
            ))}
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
    case "textarea":
      return (
        <Label className="flex flex-col gap-2 " htmlFor={`input-${label}`}>
          {label && label}
          <Textarea
            id={`input-${label}`}
            placeholder={placeholder}
            className="bg-transparent border-gray-400 text-[#707070]"
            rows={lines}
            {...register(name)}
          />
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className="text-red-400 mt-2">
                {message === "Required" ? "" : message}
              </p>
            )}
          />
        </Label>
      );
  }
};

export default FormGenerator;
