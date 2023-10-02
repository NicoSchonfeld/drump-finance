"use client";

import React, { useEffect } from "react";
import moment, { duration } from "moment";
import "moment/locale/es";

import { VictoryBar, VictoryLabel, VictoryPie } from "victory";
import { CircularProgress } from "@nextui-org/react";

const CategoriasPie = ({
  n = 0,
  d = 0,
  a = 0,
  sumaTotalDeLasTablas,
  tablaFacturas,
  tablaGastos,
  tablaAhorros,
}) => {
  const soloMesFormato = "M";
  const hoy = moment();

  const meses = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];

  let mesHoyNumero = hoy.format(soloMesFormato);
  let tresMeses = meses.slice(mesHoyNumero - 3, mesHoyNumero);

  return (
    <div className="w-full h-72 flex items-center">
      {/*    <svg viewBox="0 0 400 400">
        <VictoryPie
          colorScale={["#fde047", "#f87171", "#4ade80"]}
          animate={{ duration: 2000 }}
          standalone={false}
          data={[
            { x: "Necesidades", y: renderDataNecesidades() },
            { x: "Deseos", y: renderDataDeseos() },
            { x: "Ahorros", y: renderDataAhorros() },
          ]}
          labels={[
            `${n <= 0 ? "" : renderDataNecesidades() + "%"}`,
            `${d <= 0 ? "" : renderDataDeseos() + "%"}`,
            `${a <= 0 ? "" : renderDataAhorros() + "%"}`,
          ]}
          innerRadius={70}
          labelRadius={100}
          style={{
            labels: { fontSize: 16, fill: "black", fontWeight: "bold" },
          }}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          style={{ fontSize: 20 }}
          text="Categorias"
        />
      </svg> */}

      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={renderDataNecesidades()}
        color="warning"
        showValueLabel={true}
        classNames={{
          svg: "w-36 h-36 drop-shadow-md",
          indicator: "stroke-black",
          track: "stroke-black/10",
          value: "text-3xl font-semibold text-black",
        }}
      />

      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={renderDataDeseos()}
        color="warning"
        showValueLabel={true}
      />

      <CircularProgress
        aria-label="Loading..."
        size="lg"
        value={renderDataAhorros()}
        color="warning"
        showValueLabel={true}
      />
    </div>
  );
};

export default CategoriasPie;
