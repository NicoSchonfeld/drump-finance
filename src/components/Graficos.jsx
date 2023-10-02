"use client";

import {
  CircularProgress,
  Progress,
  Skeleton,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";
import CategoriasPie from "./Victory/CategoriasPie";
import React from "react";

const Graficos = ({
  userIsValid,
  dataCategorias,
  totalAhorros,
  totalFacturas,
  totalGastos,
  tablaFacturas,
  tablaGastos,
  tablaAhorros,
}) => {
  const sumaTotalDeLasTablas = totalAhorros + totalFacturas + totalGastos;

  /* NECESIDADES */
  const cantidadDeNecesidadesFacturas = tablaFacturas.filter(
    (item) => item.categorias == 1
  );

  const cantidadDeNecesidadesGastos = tablaGastos.filter(
    (item) => item.categorias == 1
  );

  const cantidadDeNecesidadesAhorros = tablaAhorros.filter(
    (item) => item.categorias == 1
  );

  const totalDeNecesidadesEnFacturas = cantidadDeNecesidadesFacturas.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeNecesidadesEnGastos = cantidadDeNecesidadesGastos.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeNecesidadesEnAhorros = cantidadDeNecesidadesAhorros.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const sumaTotalDeNecesidades =
    totalDeNecesidadesEnFacturas +
    totalDeNecesidadesEnGastos +
    totalDeNecesidadesEnAhorros;

  /* GASTOS */
  const cantidadDeDeseosFacturas = tablaFacturas.filter(
    (item) => item.categorias == 2
  );

  const cantidadDeDeseosGastos = tablaGastos.filter(
    (item) => item.categorias == 2
  );

  const cantidadDeDeseosAhorros = tablaAhorros.filter(
    (item) => item.categorias == 2
  );

  const totalDeDeseosEnFacturas = cantidadDeDeseosFacturas.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeDeseosEnGastos = cantidadDeDeseosGastos.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeDeseosEnAhorros = cantidadDeDeseosAhorros.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const sumaTotalDeDeseos =
    totalDeDeseosEnFacturas + totalDeDeseosEnGastos + totalDeDeseosEnAhorros;

  /* AHORROS */
  const cantidadDeAhorrosFacturas = tablaFacturas.filter(
    (item) => item.categorias == 3
  );

  const cantidadDeAhorrosGastos = tablaGastos.filter(
    (item) => item.categorias == 3
  );

  const cantidadDeAhorrosAhorros = tablaAhorros.filter(
    (item) => item.categorias == 3
  );

  const totalDeAhorrosEnFacturas = cantidadDeAhorrosFacturas.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeAhorrosEnGastos = cantidadDeAhorrosGastos.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const totalDeAhorrosEnAhorros = cantidadDeAhorrosAhorros.reduce(
    (acc, item) => (acc += item.presupuesto),
    0
  );

  const sumaTotalDeAhorros =
    totalDeAhorrosEnFacturas + totalDeAhorrosEnGastos + totalDeAhorrosEnAhorros;

  const renderDataNecesidades = () => {
    const porsentajeNecesidades =
      (sumaTotalDeNecesidades / sumaTotalDeLasTablas) * 100;

    return porsentajeNecesidades.toFixed(0);
  };

  const renderDataDeseos = () => {
    const porsentajeDeseos = (sumaTotalDeDeseos / sumaTotalDeLasTablas) * 100;

    return porsentajeDeseos.toFixed(0);
  };

  const renderDataAhorros = () => {
    const porsentajeAhorros = (sumaTotalDeAhorros / sumaTotalDeLasTablas) * 100;

    return porsentajeAhorros.toFixed(0);
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
          <div className="flex w-full py-20 items-center flex-wrap justify-center gap-5">
            <div className="flex items-center flex-col gap-2 text-[9px] md:text-sm">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={
                  renderDataNecesidades() === "NaN"
                    ? 0
                    : renderDataNecesidades()
                }
                color="warning"
                showValueLabel={true}
                classNames={{
                  svg: "w-20 h-20 lg:w-40 lg:h-40 drop-shadow-md",
                  indicator: "stroke-yellow-400",
                  track: "stroke-black/10",
                  value: `text-sm lg:text-2xl font-semibold text-black`,
                }}
              />
              <p>Necesidades</p>{" "}
              {/* <span>{dataCategorias?.necesidades}</span> */}{" "}
            </div>

            <div className="flex items-center flex-col gap-2 text-[9px] md:text-sm">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={renderDataDeseos() === "NaN" ? 0 : renderDataDeseos()}
                color="danger"
                showValueLabel={true}
                classNames={{
                  svg: "w-20 h-20 lg:w-40 lg:h-40 drop-shadow-md",
                  indicator: "stroke-red-400",
                  track: "stroke-black/10",
                  value: "text-sm lg:text-2xl font-semibold text-black",
                }}
              />
              <p>Deseos</p> {/* <span>{dataCategorias?.deseos}</span> */}
            </div>

            <div className="flex items-center flex-col gap-2 text-[9px] md:text-sm">
              <CircularProgress
                aria-label="Loading..."
                size="lg"
                value={renderDataAhorros() === "NaN" ? 0 : renderDataAhorros()}
                color="success"
                showValueLabel={true}
                classNames={{
                  svg: "w-20 h-20 lg:w-40 lg:h-40 drop-shadow-md",
                  indicator: "stroke-green-400",
                  track: "stroke-black/10",
                  value: "text-sm lg:text-2xl font-semibold text-black",
                }}
              />
              <p>Ahorros</p> {/* <span>{dataCategorias?.ahorros}</span> */}
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
};

export default Graficos;
