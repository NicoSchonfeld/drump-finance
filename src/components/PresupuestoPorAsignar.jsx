import { formatNumber } from "@/base/formatNumber";
import { Button, Tooltip } from "@nextui-org/react";
import React from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";

const PresupuestoPorAsignar = ({ presupuestoPorAsignar }) => {
  return (
    <>
      <div className="col-span-3 text-[#202b21] bg-white shadow-md rounded-md">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-5">
          <div className="flex items-center justify-start w-full">
            <p className="text-start text-sm font-bold">
              Presupuesto por asignar:{" "}
              <span className="font-normal">
                ${formatNumber(presupuestoPorAsignar.toFixed(2))}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PresupuestoPorAsignar;
