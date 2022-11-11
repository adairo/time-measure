import { NextPage } from "next";
import Link from "next/link";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { useForm } from "react-hook-form";

const TimeRegister: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log(data);

  return (
    <main className="p-4">
      <header className="flex items-baseline justify-between">
        <h1 className="mb-8 text-lg font-bold">Registrar tiempo</h1>
        <Link href="/" className="text-xs font-bold uppercase text-slate-400">
          Regresar
        </Link>
      </header>
      <form className="grid gap-14" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="mb-8">
            <label
              htmlFor="start"
              className="mb-3 block font-semibold text-slate-600"
            >
              Hora de inicio
            </label>
            <input
              id="start"
              type="time"
              className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400"
              {...register("start-time")}
            />
            <span className="mt-1 block text-slate-500">
              Toca arriba para seleccionar una hora
            </span>
          </div>
          <div>
            <label
              htmlFor="final"
              className="mb-3 block font-semibold text-slate-600"
            >
              Hora de finalización
            </label>
            <input
              id="start"
              type="time"
              className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400"
              {...register("finish-time")}
            />
            <span className="mt-1 block text-slate-500">
              Toca arriba para seleccionar una hora
            </span>
          </div>
        </fieldset>

        <fieldset>
          <div className="mb-8">
            <label className="mb-3 block font-semibold text-slate-600">
              Elige un día
            </label>
            <div className="flex justify-between">
              <RadioButton {...register("day")} id="today">
                Hoy
              </RadioButton>

              <RadioButton {...register("day")} id="yesterday">
                Ayer
              </RadioButton>

              <RadioButton {...register("day")} id="other-day">
                Otro día
              </RadioButton>
            </div>
          </div>
          <div>
            <label
              htmlFor="specific-day"
              className="mb-3 block font-semibold text-slate-600"
            >
              Cuándo
            </label>
            <input
              id="specific-day"
              type="time"
              className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400"
              {...register("specific-day")}
            />
            <span className="mt-1 block text-slate-500">
              Toca arriba para seleccionar una hora
            </span>
          </div>
        </fieldset>

        <fieldset className="mb-12 grid gap-3">
          <button
            type="submit"
            className="w-full rounded-md bg-sky-500 px-3 py-3 font-semibold text-white"
          >
            Guardar tiempo
          </button>

          <button
            type="button"
            className="w-full rounded-md bg-slate-300 px-2 py-3 font-semibold text-black"
          >
            Cancelar
          </button>
        </fieldset>
      </form>
    </main>
  );
};

type RadioButtonProps = {
  id: string;
} & NativeRadioButtonProps;

type NativeRadioButtonProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

function RadioButton({
  children,
  ...inputProps
}: PropsWithChildren<RadioButtonProps>) {
  return (
    <div className="group w-full">
      <input type="radio" {...inputProps} className="peer hidden" />
      <label
        htmlFor={inputProps.id}
        className="block bg-slate-100 px-3  py-3 text-center transition group-first:rounded-l-lg group-last:rounded-r-lg peer-checked:bg-slate-400 peer-checked:font-semibold peer-checked:text-white"
      >
        {children}
      </label>
    </div>
  );
}

export default TimeRegister;
