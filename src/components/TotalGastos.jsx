import React from "react";
import { FaMoneyBill1Wave } from "react-icons/fa6";

const TotalGastos = () => {
  return (
    <>
      <div className="col-span-3 text-[#202b21] bg-white px-5 py-10 shadow-md rounded-md">
        <div className="bg-gradient-to-b from-green-600 to-green-400 border border-green-700 shadow-md shadow-green-500/50 p-2 text-white rounded flex items-center justify-center">
          <FaMoneyBill1Wave className="text-3xl" />
        </div>
        <h3>total gastos</h3>
      </div>
    </>
  );
};

export default TotalGastos;
