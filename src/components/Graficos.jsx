"use client";

import { Skeleton } from "@nextui-org/react";
import CategoriasPie from "./Victory/CategoriasPie";

const Graficos = ({ userIsValid, dataCategorias }) => {
  return (
    <>
      <div className="row-span-1 lg:row-span-3 col-span-1 lg:col-span-9 text-[#202b21] bg-white px-5 py-10 shadow-md rounded-md">
        <Skeleton
          className="rounded w-full bg-[#bfd1c0]"
          isLoaded={userIsValid}
        >
          <h3>Graficos</h3>
          <h1>Necesidades: {dataCategorias?.necesidades}</h1>
          <h1>Deseos: {dataCategorias?.deseos}</h1>
          <h1>Ahorros: {dataCategorias?.ahorros}</h1>
          <CategoriasPie
            n={dataCategorias?.necesidades}
            d={dataCategorias?.deseos}
            a={dataCategorias?.ahorros}
          />
        </Skeleton>
      </div>
    </>
  );
};

export default Graficos;
