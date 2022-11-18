import { type NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Button } from "../components/common/Button";
import { getTimeRecords, TimeRecord } from "../lib/time-records";

const relativeFormatter = new Intl.RelativeTimeFormat("es", {
  numeric: "auto",
});

import dayjs from "dayjs";

function getRelativeTime(date: string) {
  const diff = dayjs(date).diff(dayjs(), "day");
  return (
    relativeFormatter
      .format(diff, "day")
      // Capitalize the first letter
      .replace(/^(\w)/, (_, c) => c.toUpperCase())
  );
}

function aggregateHours(records: TimeRecord[]) {
  return records.reduce(
    (total, current) => ({ hours: total.hours + current.deltaHours }),
    { hours: 0 }
  ).hours;
}

const Home: NextPage = () => {
  const [currentRecords, setCurrentRecords] = React.useState<TimeRecord[]>([]);

  console.log({ records: currentRecords });
  React.useEffect(() => {
    const savedRecords = getTimeRecords();
    setCurrentRecords(savedRecords);
  }, []);

  const totalHours = aggregateHours(currentRecords);

  return (
    <main className="">
      <section className="bg-gradient-to-b from-sky-400 to-sky-200 px-4 py-6 flex justify-center ">
        <div className="grid grid-cols-[1fr,auto] gap-2 items-center">
          <div className="text-[6rem] font-bold text-white drop-shadow-lg">
            {totalHours}
          </div>
          <div className="text-white -space-y-2 tracking-wide">
            <div className="font-extrabold text-xl uppercase drop-shadow-md ">
              Horas
            </div>
            <div className="uppercase text-sky-700 font-extrabold text-xl">
              en 13 días
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 grid grid-flow-col gap-2 px-4">
        <Link href="/registrar-tiempo">
          <Button variant="primary">Registrar tiempo</Button>
        </Link>
        <Button>Cerrar periodo</Button>
      </section>

      <section className=" mt-4 px-4">
        <table className="w-full border-2 border-collapse">
          <caption className="mb-4 text-lg text-left font-bold">
            Periodo actual
          </caption>
          <thead className="text-left bg-slate-100">
            <tr>
              <th scope="column" className="p-3 font-semibold text-slate-600 ">
                Fecha
              </th>
              <th scope="column" className="p-3 font-semibold text-slate-600 ">
                Tiempo <span className="text-slate-400">(hrs)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record) => (
              <tr className="">
                <td className="p-3 text-slate-800">
                  <span className=" mr-2 font-semibold">
                    {getRelativeTime(record.day)}
                  </span>{" "}
                  {new Date(record.day).toLocaleDateString()}
                </td>
                <td className="flex justify-start p-3 text-right">
                  {record.deltaHours}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* <h2 className="mb-4 text-lg font-bold">Anteriores periodos</h2>
      <div className="rounded-md bg-slate-100 p-4 ">
        <h3>25 de octubre al 2 de noviembre</h3>
      </div> */}
    </main>
  );
};

export default Home;
