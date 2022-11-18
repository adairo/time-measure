import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, RadioButton } from "../components/common/Button";
import { FormError, FormHelper, FormLabel } from "../components/common/Form";
import { saveTimeRecord, getDeltaTime } from "../lib/time-records";
import type { DayOption } from "../lib/time-records";

export type FormData = {
  startTime: string;
  finishTime: string;
  day: DayOption;
  specificDay: Date;
};

const TimeRegister: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
  } = useForm<FormData>();

  const isOtherDay = watch("day") === "other";
  const router = useRouter();

  const submitForm: SubmitHandler<FormData> = (data) => {
    saveTimeRecord(data);
    router.push("/");
  };

  return (
    <main className="p-4">
      <header className="flex items-baseline justify-between">
        <h1 className="mb-8 text-lg font-bold">Registrar tiempo</h1>
        <Link
          href="/"
          className="flex items-baseline text-xs font-bold uppercase text-slate-400"
        >
          <span className="material-symbols-rounded self-center text-[1.1rem]">
            arrow_back_ios
          </span>
          <span className="tracking-wide">Regresar</span>
        </Link>
      </header>
      <form className="grid gap-14" onSubmit={handleSubmit(submitForm)}>
        <fieldset className="space-y-8">
          <div className="">
            <FormLabel htmlFor="start">Hora de inicio</FormLabel>
            <input
              id="start"
              type="time"
              className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400"
              {...register("startTime", { required: true })}
            />
            {errors.startTime && (
              <FormError>La hora de inicio es requerida</FormError>
            )}
            <FormHelper>Toca arriba para seleccionar una hora</FormHelper>
          </div>
          <div>
            <FormLabel htmlFor="finish">Hora de finalización</FormLabel>
            <input
              id="finish"
              type="time"
              className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400"
              {...register("finishTime", {
                required: true,
                validate: (value) =>
                  getDeltaTime(getValues("startTime"), value) > 0,
              })}
            />
            {errors.finishTime?.type === "required" && (
              <FormError>La hora de finalización es requerida</FormError>
            )}
            {errors.finishTime?.type === "validate" && (
              <FormError>
                La hora de finalización debe ser mayor que la hora de inicio
              </FormError>
            )}
            <FormHelper>Toca arriba para seleccionar una hora</FormHelper>
          </div>
        </fieldset>

        <fieldset className="space-y-8">
          <div className="">
            <FormLabel>Elige un día</FormLabel>
            <div className="flex justify-between">
              <RadioButton
                {...register("day")}
                id="today"
                value="today"
                defaultChecked
              >
                Hoy
              </RadioButton>

              <RadioButton
                {...register("day")}
                id="yesterday"
                value="yesterday"
              >
                Ayer
              </RadioButton>

              <RadioButton {...register("day")} id="other-day" value={"other"}>
                Otro día
              </RadioButton>
            </div>
          </div>
          {isOtherDay && (
            <div>
              <FormLabel htmlFor="specific-day">Cuándo</FormLabel>
              <input
                id="specific-day"
                type="date"
                className="w-full rounded-lg border-none bg-slate-100 py-3 placeholder:text-slate-400 "
                {...register("specificDay", {
                  required: isOtherDay,
                  valueAsDate: true,
                })}
              />
              {errors.specificDay && <FormError>Error aqui</FormError>}
              <FormHelper>Toca arriba para seleccionar una fecha</FormHelper>
            </div>
          )}
        </fieldset>

        <fieldset className="mb-12 grid gap-3">
          <Button variant="primary" type="submit">
            Guardar tiempo
          </Button>

          <Button type="button" variant="secondary">
            Cancelar
          </Button>
        </fieldset>
      </form>
    </main>
  );
};

export default TimeRegister;
