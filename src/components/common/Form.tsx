import { PropsWithChildren } from "react";

function FormHelper({ children }: PropsWithChildren<{}>) {
  return <span className="mt-1 block text-slate-500">{children}</span>;
}

function FormLabel({
  children,
  htmlFor,
}: PropsWithChildren<{ htmlFor?: string }>) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-3 block font-semibold text-slate-600"
    >
      {children}
    </label>
  );
}

function FormError({ children }: PropsWithChildren<{}>) {
  return <span className="mt-1 block text-red-600">{children}</span>;
}

export { FormHelper, FormLabel, FormError };
