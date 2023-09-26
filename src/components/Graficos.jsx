import React from "react";
import { FaMoneyBillWave } from "react-icons/fa6";

const Graficos = () => {
  return (
    <>
      <div className="row-span-1 lg:row-span-3 col-span-1 lg:col-span-9 text-[#202b21] bg-white px-5 py-10 shadow-md rounded-md">
        <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
          <FaMoneyBillWave className="text-3xl" />
        </div>
        <h3>Graficos</h3>
      </div>
    </>
  );
};

export default Graficos;
