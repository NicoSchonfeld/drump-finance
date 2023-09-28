"use client";

import { Skeleton } from "@nextui-org/react";
import CategoriasPie from "./Victory/CategoriasPie";

const Graficos = ({ userIsValid, dataCategorias }) => {
  const renderChart = () => {
    if (
      dataCategorias?.necesidades == 0 &&
      dataCategorias?.deseos == 0 &&
      dataCategorias?.ahorros == 0
    ) {
      return (
        <p className="h-40 w-auto px-5 flex items-center justify-center">
          No hay categorias
        </p>
      );
    } else {
      return (
        <CategoriasPie
          n={dataCategorias?.necesidades}
          d={dataCategorias?.deseos}
          a={dataCategorias?.ahorros}
        />
      );
    }
  };

  return (
    <>
      <div className="row-span-1 lg:row-span-3 col-span-1 lg:col-span-9 text-[#202b21] bg-white px-5 py-10 shadow-md rounded-md">
        <Skeleton className="rounded bg-[#bfd1c0]" isLoaded={userIsValid}>
          <h3 className="font-bold text-xl ">Graficos</h3>
        </Skeleton>

        <Skeleton
          className="rounded w-auto mt-5 bg-[#bfd1c0]"
          isLoaded={userIsValid}
        >
          <div className="flex items-center justify-center flex-col">
            <>{renderChart()}</>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-yellow-300 rounded-md"></div>{" "}
                <p>Necesidades:</p> <span>{dataCategorias?.necesidades}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-red-400 rounded-md"></div>{" "}
                <p>Deseos:</p> <span>{dataCategorias?.deseos}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-4 h-4 bg-green-400 rounded-md"></div>{" "}
                <p>Ahorros:</p> <span>{dataCategorias?.ahorros}</span>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default Graficos;
