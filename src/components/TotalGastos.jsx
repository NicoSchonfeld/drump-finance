import { formatNumber } from "@/base/formatNumber";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";

const TotalGastos = ({ totalFacturas, totalGastos, userIsValid }) => {
  const suma = totalFacturas + totalGastos;

  return (
    <>
      <div className="col-span-1 lg:col-span-3 text-[#202b21] bg-white shadow-md rounded-md py-10">
        <div className="flex flex-col items-center justify-center gap-2 w-full h-full px-5">
          <div className="flex items-center justify-start w-full gap-3 relative">
            <Skeleton
              className="rounded bg-[#bfd1c0] shadow-md shadow-green-500/50"
              isLoaded={userIsValid}
            >
              <div className="bg-gradient-to-b from-green-500 to-green-400 border border-green-600  p-2 text-white rounded flex items-center justify-center">
                <GiPayMoney className="text-2xl" />
              </div>
            </Skeleton>

            <div className="flex flex-col">
              <Skeleton className="rounded bg-[#bfd1c0]" isLoaded={userIsValid}>
                <p className="text-start text-medium font-bold">
                  Total de Gastos:
                </p>
              </Skeleton>

              <Popover>
                <PopoverTrigger>
                  <Button
                    color="primary"
                    variant="light"
                    isIconOnly
                    className="absolute top-0 right-0"
                  >
                    <AiOutlineInfoCircle />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <span>
                    Aquí se muestra el total de gastos que tienes entre la tabla
                    Facturas y Gastos.
                  </span>
                </PopoverContent>
              </Popover>

              <Skeleton
                className="rounded mt-0.5 w-auto bg-[#bfd1c0]"
                isLoaded={userIsValid}
              >
                <span className="font-normal text-base">
                  ${formatNumber(suma.toFixed(2))}
                </span>
              </Skeleton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalGastos;
