import {
  DetailedHTMLProps,
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { forwardRef } from "react";

type ButtonProps = {
  variant?: "secondary" | "primary";
} & NativeButtonProps;
type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

function Button({ children, variant = "secondary", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={` w-full rounded-md px-3 py-3 font-semibold shadow-md ${
        variant === "primary" ? "bg-sky-500 text-white" : ""
      } ${variant === "secondary" ? "bg-slate-100 text-slate-700" : ""}`}
    >
      {children}
    </button>
  );
}

type RadioButtonProps = {
  id: string;
} & NativeRadioButtonProps;

type NativeRadioButtonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const RadioButton = forwardRef<
  HTMLInputElement,
  PropsWithChildren<RadioButtonProps>
>(({ id, children, ...props }, ref) => {
  return (
    <div className="group w-full">
      <input
        type="radio"
        {...props}
        ref={ref}
        id={id}
        className="peer hidden"
      />
      <label
        htmlFor={id}
        className="block bg-slate-100 px-3  py-3 text-center transition group-first:rounded-l-lg group-last:rounded-r-lg peer-checked:bg-slate-400 peer-checked:font-semibold peer-checked:text-white"
      >
        {children}
      </label>
    </div>
  );
});

export { Button, RadioButton };
