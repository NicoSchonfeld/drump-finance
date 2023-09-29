"use client";

import { Skeleton } from "@nextui-org/react";
import CategoriasPie from "./Victory/CategoriasPie";
import TiposChart from "./Victory/TiposChart";

const Graficos = ({ userIsValid, dataCategorias }) => {
  const renderChartCategorys = () => {
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

  const renderChartTypes = () => {
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
        <TiposChart
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
          className="rounded w-auto mt-2 bg-[#bfd1c0]"
          isLoaded={userIsValid}
        >
          <p className="text-sm text-[#70907A]">
            Aqui se mostrara en un grafico la cantidad de categorias que has
            utilizado en las tablas.
          </p>
        </Skeleton>

        <Skeleton
          className="rounded w-auto mt-5 bg-[#bfd1c0]"
          isLoaded={userIsValid}
        >
          <div className="flex items-center justify-center flex-col md:flex-row">
            <div className="flex items-center justify-center flex-col">
              <>{renderChartCategorys()}</>

              <span className="mb-2 text-[9px] md:text-sm">2023</span>

              <div className="flex items-center flex-wrap justify-center gap-5">
                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-300 rounded md:rounded-md"></div>{" "}
                  <p>Necesidades</p>{" "}
                  {/* <span>{dataCategorias?.necesidades}</span> */}
                </div>

                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400 rounded md:rounded-md"></div>{" "}
                  <p>Deseos</p> {/* <span>{dataCategorias?.deseos}</span> */}
                </div>
                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded md:rounded-md"></div>{" "}
                  <p>Ahorros</p> {/* <span>{dataCategorias?.ahorros}</span> */}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center flex-col">
              <>{renderChartTypes()}</>

              <span className="mb-2 text-[9px] md:text-sm">2023</span>

              <div className="flex items-center flex-wrap justify-center gap-5">
                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-300 rounded md:rounded-md"></div>{" "}
                  <p>Necesidades</p>{" "}
                  {/* <span>{dataCategorias?.necesidades}</span> */}
                </div>

                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400 rounded md:rounded-md"></div>{" "}
                  <p>Deseos</p> {/* <span>{dataCategorias?.deseos}</span> */}
                </div>
                <div className="flex items-center gap-2 text-[9px] md:text-sm">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 rounded md:rounded-md"></div>{" "}
                  <p>Ahorros</p> {/* <span>{dataCategorias?.ahorros}</span> */}
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default Graficos;
