import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <main className="px-4 py-2">
      <h1 className="text-xl font-bold">Periodo actual</h1>
      <div className="mt-4 grid grid-flow-col gap-2">
        <Link
          href="/registrar-tiempo"
          className="cursor-pointer rounded-md bg-sky-500 px-4 py-2 text-center text-lg font-bold text-white shadow-sm"
        >
          Registrar tiempo
        </Link>
        <button className="rounded-md bg-slate-200 px-4 py-2 text-lg  font-bold shadow-sm">
          Cerrar periodo
        </button>
      </div>
      <table className="mt-4 w-full rounded-md border-2 text-left ">
        <tr className="divide-x-2 rounded-md bg-slate-100">
          <th className="p-3">Fecha</th>
          <th className="p-3">Tiempo (hrs)</th>
        </tr>
        <tr className="divide-x-2">
          <td className="p-2">Hoy 25/76%23</td>
          <td className="p-2">1.2</td>
        </tr>
      </table>
      <h2 className="mt-8 text-xl font-bold">Anteriores periodos</h2>
      <div className="rounded-md bg-slate-100 p-4 ">
        <h3>25 de octubre al 2 de noviembre</h3>
      </div>
    </main>
  );
};

export default Home;
