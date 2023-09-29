"use client";

import React from "react";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryPie,
  VictoryPortal,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
} from "victory";

const CategoriasPie = ({ n = 100, d = 100, a = 100 }) => {
  const colorFill = (datum) => {
    if (datum.x === "Necesidades") return "#fde047";
    if (datum.x === "Deseos") return "#f87171";
    if (datum.x === "Ahorros") return "#4ade80";
  };

  return (
    <div className="w-full h-72 flex items-center">
      {/* <VictoryPie
        colorScale={["#fde047", "#f87171", "#4ade80"]}
        animate={{ duration: 2000 }}
        standalone={true}
        data={[
          { x: "Necesidades", y: (n / 100) * 100 },
          { x: "Deseos", y: (d / 100) * 100 },
          { x: "Ahorros", y: (a / 100) * 100 },
        ]}
        labels={["", "", ""]}
        innerRadius={70}
        labelRadius={100}
        style={{ labels: { fontSize: 20, fill: "black" } }}
      /> */}

      {/*  <svg viewBox="0 0 400 400">
        <VictoryPie
          standalone={false}
          colorScale={["#fde047", "#f87171", "#4ade80"]}
          width={400}
          height={400}
          data={[
            { x: "N", y: n },
            { x: "D", y: d },
            { x: "A", y: a },
          ]}
          innerRadius={70}
          labelRadius={100}
          style={{ labels: { fontSize: 20, fill: "black" } }}
        />
        <circle
          cx="200"
          cy="200"
          r="65"
          fill="none"
          stroke="transparent"
          strokeWidth={3}
        />
        <circle
          cx="200"
          cy="200"
          r="155"
          fill="none"
          stroke="transparent"
          strokeWidth={3}
        />
        <VictoryLabel
          textAnchor="middle"
          verticalAnchor="middle"
          x={200}
          y={200}
          style={{ fontSize: 30 }}
          text="Label"
        />
      </svg> */}

      {/* <VictoryChart domainPadding={30} animate={{ duration: 500 }}>
        <VictoryBar
          style={{
            data: {
              fill: ({ datum }) => colorFill(datum),
            },
            labels: { fill: "white" },
          }}
          data={[
            { x: "Necesidades", y: (n / 100) * 100 },
            { x: "Deseos", y: (d / 100) * 100 },
            { x: "Ahorros", y: (a / 100) * 100 },
          ]}
        />

        <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
        <VictoryAxis tickFormat={(y) => `${y}`} />
      </VictoryChart> */}

      <VictoryChart domainPadding={40}>
        <VictoryStack
          colorScale={["#fde047", "#f87171", "#4ade80"]}
          style={{
            data: { width: 30 },
            labels: { fill: "#ffffff", padding: -20 },
          }}
          labelComponent={
            <VictoryPortal>
              <VictoryLabel />
            </VictoryPortal>
          }
        >
          <VictoryBar
            data={[
              { x: "jul.", y: n, label: "" },
              { x: "ago.", y: n, label: "" },
              { x: "sept.", y: n, label: "" },
            ]}
          />

          <VictoryBar
            data={[
              { x: "jul.", y: d, label: "" },
              { x: "ago.", y: d, label: "" },
              { x: "sept.", y: d, label: "" },
            ]}
          />

          <VictoryBar
            data={[
              { x: "jul.", y: a, label: "" },
              { x: "ago.", y: a, label: "" },
              { x: "sept.", y: a, label: "" },
            ]}
          />
        </VictoryStack>
        {/* <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} /> */}
        <VictoryAxis tickFormat={(y) => `${y}`} />
      </VictoryChart>
    </div>
  );
};

export default CategoriasPie;
