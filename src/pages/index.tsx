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
      .replace(/^(\w)/, (c) => c.toUpperCase())
  );
}

const Home: NextPage = () => {
  const [currentRecords, setCurrentRecords] = React.useState<TimeRecord[]>([]);

  console.log({ records: currentRecords });
  React.useEffect(() => {
    const savedRecords = getTimeRecords();
    setCurrentRecords(savedRecords);
  }, []);

  return (
    <main className="px-4 py-2">
      <h2 className="mb-4 text-lg font-bold">Periodo actual</h2>
      <div className="mt-4 grid grid-flow-col gap-2">
        <Link href="/registrar-tiempo">
          <Button variant="primary">Registrar tiempo</Button>
        </Link>
        <Button>Cerrar periodo</Button>
      </div>
      <div className=" mt-4 overflow-hidden rounded-lg border-2 border-slate-200">
        <table className="w-full ">
          <tbody>
            <tr className="rounded-md border-b-2 bg-slate-100 text-left">
              <th className="p-3 font-semibold text-slate-600 ">Fecha</th>
              <th className="p-3 font-semibold text-slate-600 ">
                Tiempo <span className="text-slate-400">(hrs)</span>
              </th>
            </tr>
            {currentRecords.map((record) => (
              <tr>
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
      </div>
      <h2 className="mb-4 text-lg font-bold">Anteriores periodos</h2>
      <div className="rounded-md bg-slate-100 p-4 ">
        <h3>25 de octubre al 2 de noviembre</h3>
      </div>
    </main>
  );
};

export default Home;
